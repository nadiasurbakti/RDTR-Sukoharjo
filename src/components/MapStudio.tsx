import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { WPId, TemporalYear, LayerMode } from '../types';
import { WP_STATISTICS, WP_GEOJSON_BOUNDARIES } from '../data/spatialData';
import {
  REAL_ROADS,
  REAL_RAILWAYS,
  REAL_STATIONS,
  REAL_RIVERS,
  REAL_SEMPADAN_ZONES,
  RoadFeature,
  RailwayFeature,
  RailwayStation,
  RiverFeature,
  SempadanFeature,
} from '../data/infrastructureLayers';
import {
  RDTR_DISTRICTS_SUKOHARJO,
  DELINEATION_SCENARIOS,
  DESA_3WP_DETAILS,
  DesaDelineationInfo,
} from '../data/delineationData';
import sukoharjoKecamatanGeo from '../data/sukoharjo_kecamatan.json';
import sukoharjoDesaGeo from '../data/sukoharjo_desa_3wp.json';
import {
  VILLAGE_LULC_DATABASE,
  LAND_CHANGE_HOTSPOTS,
  GEE_MODULES_MAP_METADATA,
  LandChangeHotspot,
  GeeModuleMapMeta,
} from '../data/landUseChangeData';
import { LandChangeHotspotModal } from './LandChangeHotspotModal';
import { GeeModulesSelectorModal } from './GeeModulesSelectorModal';
import {
  Layers,
  Compass,
  Calendar,
  Eye,
  Info,
  ExternalLink,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Globe,
  Sliders,
  Maximize2,
  FileCheck,
  Train,
  Waves,
  ShieldAlert,
  Navigation,
  Route,
  ChevronDown,
  ChevronUp,
  Satellite,
  Sparkles,
  TrendingDown,
  Building,
  Grid,
} from 'lucide-react';

interface MapStudioProps {
  selectedWp: WPId;
  onSelectWp: (wp: WPId) => void;
}

export const MapStudio: React.FC<MapStudioProps> = ({ selectedWp, onSelectWp }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTilesRef = useRef<L.TileLayer | null>(null);
  const labelTilesRef = useRef<L.TileLayer | null>(null);

  // Layer groups
  const mainLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const desaOverlayGroupRef = useRef<L.LayerGroup | null>(null);
  const infrastructureOverlayGroupRef = useRef<L.LayerGroup | null>(null);

  // State
  const [activeLayer, setActiveLayer] = useState<LayerMode>('delineation_status');
  const [selectedScenario, setSelectedScenario] = useState<'skenario1' | 'skenario2' | 'skenario3'>('skenario2');
  const [temporalYear, setTemporalYear] = useState<TemporalYear>('2025');
  const [baseMapType, setBaseMapType] = useState<'voyager' | 'positron' | 'satellite' | 'osm' | 'topo'>('voyager');
  const [opacity, setOpacity] = useState<number>(85);
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Overlays toggle
  const [overlayDesa, setOverlayDesa] = useState<boolean>(true);
  const [overlayInfra, setOverlayInfra] = useState<boolean>(true);

  // Granular Infrastructure Sub-layer Filters (Garis Riil & Sempadan)
  const [infraFilters, setInfraFilters] = useState<{
    arteri: boolean;
    kolektor: boolean;
    lingkungan: boolean;
    krl: boolean;
    sungai: boolean;
    sempadan: boolean;
  }>({
    arteri: true,
    kolektor: true,
    lingkungan: true,
    krl: true,
    sungai: true,
    sempadan: true,
  });
  const [showInfraFilterMenu, setShowInfraFilterMenu] = useState<boolean>(false);

  // Interactive Inspector state
  const [selectedDesa, setSelectedDesa] = useState<DesaDelineationInfo | null>(null);
  const [selectedKecamatanId, setSelectedKecamatanId] = useState<string | null>(null);
  const [selectedInfra, setSelectedInfra] = useState<{
    type: 'road' | 'railway' | 'station' | 'river' | 'sempadan';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  } | null>(null);

  // GEE Hotspot & Catalog state
  const [selectedHotspot, setSelectedHotspot] = useState<LandChangeHotspot | null>(null);
  const [isGeeCatalogOpen, setIsGeeCatalogOpen] = useState<boolean>(false);
  const [activeGeeMeta, setActiveGeeMeta] = useState<GeeModuleMapMeta | null>(null);

  // Portal Iframe Modal state
  const [isPortalModalOpen, setIsPortalModalOpen] = useState<boolean>(false);

  // Sync active GEE module metadata
  useEffect(() => {
    let meta: GeeModuleMapMeta | undefined;
    if (activeLayer === 'lulc') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 7);
    else if (activeLayer === 'change_detection') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 8);
    else if (activeLayer === 'development_pressure') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 9);
    else if (activeLayer === 'built_up') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 4);
    else if (activeLayer === 'ndvi') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 2);
    else if (activeLayer === 'ndwi') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 3);
    else if (activeLayer === 'road_buffers') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 10);
    else if (activeLayer === 'environmental') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 15);
    else if (activeLayer === 'typology') meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === 16);
    else if (activeLayer.startsWith('gee_m')) {
      const num = parseInt(activeLayer.replace('gee_m', ''), 10);
      meta = GEE_MODULES_MAP_METADATA.find((m) => m.number === num);
    }
    setActiveGeeMeta(meta || null);
  }, [activeLayer]);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-7.605, 110.835],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Base Tile Layers (Default: CartoDB Voyager with adjusted Carto key)
    const baseTiles = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
      {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; CartoDB &copy; OpenStreetMap',
      }
    );
    baseTiles.addTo(map);
    baseTilesRef.current = baseTiles;
    labelTilesRef.current = null;

    // Layer groups for vectors and analytical overlays
    const mainGroup = L.layerGroup().addTo(map);
    const desaGroup = L.layerGroup().addTo(map);
    const infraGroup = L.layerGroup().addTo(map);

    mainLayerGroupRef.current = mainGroup;
    desaOverlayGroupRef.current = desaGroup;
    infrastructureOverlayGroupRef.current = infraGroup;

    // Mouse movement HUD
    map.on('mousemove', (e) => {
      setMouseCoords({ lat: Number(e.latlng.lat.toFixed(5)), lng: Number(e.latlng.lng.toFixed(5)) });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Base Map Switching (Voyager - Positron - Citra Satelit - OSM - Topografi)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (baseTilesRef.current) map.removeLayer(baseTilesRef.current);
    if (labelTilesRef.current) map.removeLayer(labelTilesRef.current);

    if (baseMapType === 'satellite') {
      baseTilesRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19, attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye' }
      ).addTo(map);
      labelTilesRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
        { maxZoom: 19, opacity: 0.9, subdomains: 'abcd' }
      ).addTo(map);
    } else if (baseMapType === 'osm') {
      baseTilesRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{y}/{x}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
      labelTilesRef.current = null;
    } else if (baseMapType === 'topo') {
      baseTilesRef.current = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; OpenTopoMap (CC-BY-SA)',
      }).addTo(map);
      labelTilesRef.current = null;
    } else if (baseMapType === 'positron') {
      baseTilesRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
        {
          maxZoom: 19,
          subdomains: 'abcd',
          attribution: '&copy; CartoDB &copy; OpenStreetMap',
        }
      ).addTo(map);
      labelTilesRef.current = null;
    } else {
      // 'voyager' (Default CartoDB Voyager Basemap)
      baseTilesRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
        {
          maxZoom: 19,
          subdomains: 'abcd',
          attribution: '&copy; CartoDB &copy; OpenStreetMap',
        }
      ).addTo(map);
      labelTilesRef.current = null;
    }
  }, [baseMapType]);

  // 3. Render Vector Features & Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const mainGroup = mainLayerGroupRef.current;
    const desaGroup = desaOverlayGroupRef.current;
    const infraGroup = infrastructureOverlayGroupRef.current;
    if (!map || !mainGroup || !desaGroup || !infraGroup) return;

    mainGroup.clearLayers();
    desaGroup.clearLayers();
    infraGroup.clearLayers();

    const layerOpacity = opacity / 100;

    // Helper: is WP matching selection
    const isWpMatching = (wpName: string) => {
      if (selectedWp === 'all') return true;
      const lower = wpName.toLowerCase();
      return lower.includes(selectedWp);
    };

    // A. RENDER MAIN LAYER
    if (activeLayer === 'delineation_status') {
      // 12 Kecamatan of Sukoharjo colored by RDTR Legal Status
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const kecLayer = L.geoJSON(sukoharjoKecamatanGeo as any, {
        style: (feature) => {
          const name = feature?.properties?.WADMKC || '';
          const statusObj = RDTR_DISTRICTS_SUKOHARJO[name];
          const isCandidate = ['Mojolaban', 'Baki', 'Gatak'].includes(name);
          const isGrogol = name === 'Grogol';
          const isFocused = isWpMatching(name);

          let fillColor = '#94a3b8'; // default slate
          let borderColor = '#64748b';
          let weight = 1.5;
          let dashArray: string | undefined = undefined;

          if (isGrogol) {
            fillColor = '#38bdf8'; // Sky blue tint
            borderColor = '#d97706'; // Amber golden border
            weight = 3;
            dashArray = '6, 4';
          } else if (statusObj?.status === 'DITETAPKAN') {
            fillColor = '#10b981'; // emerald
            borderColor = '#047857';
            weight = 2;
          } else if (isCandidate) {
            if (name === 'Mojolaban') {
              fillColor = '#0284c7'; // Sky
              borderColor = '#0369a1';
            } else if (name === 'Baki') {
              fillColor = '#e11d48'; // Rose
              borderColor = '#be123c';
            } else if (name === 'Gatak') {
              fillColor = '#059669'; // Emerald
              borderColor = '#047857';
            }
            weight = isFocused ? 3.5 : 2.5;
            dashArray = isFocused ? undefined : '5, 5';
          }

          return {
            color: borderColor,
            weight: weight,
            opacity: isFocused ? 0.98 : (isGrogol ? 0.9 : 0.7),
            fillColor: fillColor,
            fillOpacity: isGrogol
              ? 0.22 * layerOpacity
              : isCandidate
              ? (isFocused ? 0.35 * layerOpacity : 0.18 * layerOpacity)
              : 0.12 * layerOpacity,
            dashArray: dashArray,
          };
        },
        onEachFeature: (feature, layer) => {
          const name = feature?.properties?.WADMKC || '';
          const statusObj = RDTR_DISTRICTS_SUKOHARJO[name];
          const isCandidate = ['Mojolaban', 'Baki', 'Gatak'].includes(name);
          const isGrogol = name === 'Grogol';

          let statusBadge = '';
          if (isGrogol) {
            statusBadge = '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">RDTR EKSISTING (SK 2026)</span>';
          } else if (statusObj?.status === 'DITETAPKAN') {
            statusBadge = '<span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">PERDA DITETAPKAN</span>';
          } else if (isCandidate) {
            statusBadge = '<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold">WILAYAH PEKERJAAN 2026</span>';
          } else {
            statusBadge = '<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px]">BELUM DISUSUN</span>';
          }

          const grogolNotice = isGrogol ? `
            <div class="mt-1 pt-1 border-t border-slate-200 text-[10px] text-amber-800 font-semibold">
              Keputusan Bupati Sukoharjo No. 600.3/342 Tahun 2026
            </div>
            <div class="text-[9.5px] text-slate-500 italic">
              Status Eksisting: TIDAK MASUK wilayah pekerjaan RDTR baru (batas acuan eksternal).
            </div>
          ` : '';

          layer.bindTooltip(
            `<div class="font-sans text-xs p-1 space-y-1 text-slate-900">
              <div class="font-bold flex items-center justify-between gap-2 border-b border-slate-200 pb-1">
                <span class="text-sm font-bold text-slate-900">Kecamatan ${name}</span>
                ${statusBadge}
              </div>
              <div class="text-slate-700 font-medium text-[11px]">${statusObj?.wpName || 'Kecamatan Sukoharjo'}</div>
              <div class="text-blue-900 text-[10px] font-mono">${statusObj?.delineationStatus || ''}</div>
              ${statusObj?.perdaNumber && !isGrogol ? `<div class="text-emerald-700 text-[10px] font-medium">${statusObj.perdaNumber}</div>` : ''}
              ${grogolNotice}
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          layer.on('click', () => {
            setSelectedKecamatanId(name);
            setSelectedDesa(null);
            setSelectedInfra(null);
            if (isCandidate) {
              onSelectWp(name.toLowerCase() as WPId);
            }
          });
        },
      });
      kecLayer.addTo(mainGroup);
    } else if (
      activeLayer === 'desa_boundaries' ||
      activeLayer === 'delineation_scenario_1' ||
      activeLayer === 'delineation_scenario_2' ||
      activeLayer === 'delineation_scenario_3'
    ) {
      // 43 Desa/Kelurahan polygons from official portal
      const scenarioMode =
        activeLayer === 'delineation_scenario_1'
          ? 'skenario1'
          : activeLayer === 'delineation_scenario_2'
          ? 'skenario2'
          : activeLayer === 'delineation_scenario_3'
          ? 'skenario3'
          : selectedScenario;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const desaLayer = L.geoJSON(sukoharjoDesaGeo as any, {
        style: (feature) => {
          const desaName = feature?.properties?.WADMKD || '';
          const kecName = feature?.properties?.WADMKC || '';
          const desaInfo = DESA_3WP_DETAILS[desaName];

          const isIncluded =
            scenarioMode === 'skenario1'
              ? desaInfo?.delineationRecommendation?.skenario1_administratif ?? true
              : scenarioMode === 'skenario2'
              ? desaInfo?.delineationRecommendation?.skenario2_fungsional_perkotaan ?? false
              : desaInfo?.delineationRecommendation?.skenario3_aglomerasi_lintas ?? false;

          let color = '#38bdf8'; // Mojolaban Sky
          if (kecName === 'Baki') color = '#f43f5e'; // Rose
          if (kecName === 'Gatak') color = '#10b981'; // Emerald

          const isMatchingWp = isWpMatching(kecName);

          if (activeLayer !== 'desa_boundaries' && !isIncluded) {
            // Not included in scenario -> dim
            return {
              color: '#475569',
              weight: 1,
              opacity: 0.4,
              fillColor: '#1e293b',
              fillOpacity: 0.15 * layerOpacity,
              dashArray: '4, 4',
            };
          }

          return {
            color: color,
            weight: isMatchingWp ? 2 : 1,
            opacity: isMatchingWp ? 0.9 : 0.4,
            fillColor: color,
            fillOpacity: (isIncluded ? 0.35 : 0.15) * layerOpacity,
          };
        },
        onEachFeature: (feature, layer) => {
          const desaName = feature?.properties?.WADMKD || '';
          const kecName = feature?.properties?.WADMKC || '';
          const desaInfo = DESA_3WP_DETAILS[desaName];

          const isIncluded =
            scenarioMode === 'skenario1'
              ? desaInfo?.delineationRecommendation?.skenario1_administratif ?? true
              : scenarioMode === 'skenario2'
              ? desaInfo?.delineationRecommendation?.skenario2_fungsional_perkotaan ?? false
              : desaInfo?.delineationRecommendation?.skenario3_aglomerasi_lintas ?? false;

          const badge = isIncluded
            ? '<span class="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-600 font-bold text-[10px]">MASUK DELINEASI</span>'
            : '<span class="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[10px]">NON-DELINEASI (PERDESAAN)</span>';

          layer.bindTooltip(
            `<div class="font-sans text-xs p-1 space-y-1">
              <div class="font-bold text-white flex items-center justify-between gap-2">
                <span>Desa ${desaName}</span>
                ${activeLayer !== 'desa_boundaries' ? badge : ''}
              </div>
              <div class="text-slate-300 text-[11px]">Kecamatan ${kecName} | ${desaInfo?.areaHa || 200} Ha</div>
              <div class="text-amber-300 text-[10px]">${desaInfo?.karakterSpasial || 'Kawasan permukiman & pertanian'}</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          layer.on('click', () => {
            if (desaInfo) {
              setSelectedDesa(desaInfo);
              setSelectedKecamatanId(null);
            }
          });
        },
      });
      desaLayer.addTo(mainGroup);
    } else {
      // GEE Analytical Layers (LULC, Change Detection, DPI, NDVI, Built-Up, Hotspots, etc.)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geeLayer = L.geoJSON(sukoharjoDesaGeo as any, {
        style: (feature) => {
          const desaName = feature?.properties?.name || '';
          const lulcData = VILLAGE_LULC_DATABASE[desaName];
          const desaInfo = DESA_3WP_DETAILS[desaName];
          const wpMatches = selectedWp === 'all' || lulcData?.wpId === selectedWp || desaInfo?.wpId === selectedWp;

          let fillColor = '#64748b';
          let fillOpacity = (wpMatches ? 0.65 : 0.15) * layerOpacity;

          if (activeLayer === 'lulc' || activeLayer === 'gee_m07') {
            const yrData =
              temporalYear === '2015'
                ? lulcData?.lulc2015
                : temporalYear === '2020'
                ? lulcData?.lulc2020
                : lulcData?.lulc2025;

            const terbangun = (yrData?.terbangunHa || 0) + (yrData?.industriHa || 0);
            const sawah = yrData?.sawahHa || 0;

            if ((yrData?.industriHa || 0) > 8) {
              fillColor = '#7c3aed'; // Industri Sentra Rotan Trangsan
            } else if (terbangun > sawah) {
              fillColor = '#e11d48'; // Permukiman / Terbangun Urban Dominan
            } else if (sawah / (lulcData?.luasTotalHa || 1) > 0.55) {
              fillColor = '#16a34a'; // Sawah Irigasi Utama / LP2B
            } else {
              fillColor = '#eab308'; // Transisi Pertanian-Permukiman
            }
          } else if (activeLayer === 'change_detection' || activeLayer === 'gee_m08') {
            const vuln = lulcData?.conversionMetrics?.vulnerabilityLevel;
            if (vuln === 'Kritis') fillColor = '#991b1b';
            else if (vuln === 'Tinggi') fillColor = '#dc2626';
            else if (vuln === 'Sedang') fillColor = '#f59e0b';
            else fillColor = '#059669';
          } else if (activeLayer === 'development_pressure' || activeLayer === 'gee_m09') {
            const dpi = lulcData?.geeIndicators?.dpiScore || 50;
            if (dpi >= 80) fillColor = '#991b1b';
            else if (dpi >= 65) fillColor = '#ea580c';
            else if (dpi >= 50) fillColor = '#eab308';
            else fillColor = '#16a34a';
          } else if (activeLayer === 'ndvi' || activeLayer === 'gee_m02') {
            const ndvi = lulcData?.geeIndicators?.meanNdvi2025 || 0.35;
            if (ndvi >= 0.45) fillColor = '#15803d';
            else if (ndvi >= 0.35) fillColor = '#65a30d';
            else if (ndvi >= 0.25) fillColor = '#eab308';
            else fillColor = '#e11d48';
          } else if (activeLayer === 'ndwi' || activeLayer === 'gee_m03') {
            const ndwi = lulcData?.geeIndicators?.meanNdwi2025 || -0.05;
            if (ndwi >= 0.05) fillColor = '#0284c7';
            else if (ndwi >= -0.05) fillColor = '#06b6d4';
            else fillColor = '#94a3b8';
          } else if (activeLayer === 'built_up' || activeLayer === 'gee_m04' || activeLayer === 'gee_m05') {
            const ndbi = lulcData?.geeIndicators?.meanNdbi2025 || 0.15;
            if (ndbi >= 0.25) fillColor = '#991b1b';
            else if (ndbi >= 0.15) fillColor = '#dc2626';
            else if (ndbi >= 0.1) fillColor = '#f97316';
            else fillColor = '#fef08a';
          } else if (activeLayer === 'gee_m06') {
            const vuln = lulcData?.conversionMetrics?.vulnerabilityLevel;
            if (vuln === 'Terkendali / Lestari') fillColor = '#059669';
            else if (vuln === 'Sedang') fillColor = '#ca8a04';
            else fillColor = '#94a3b8';
          } else if (activeLayer === 'gee_m13') {
            const lst = lulcData?.geeIndicators?.lstCelsius || 31;
            if (lst >= 33.5) fillColor = '#7f1d1d';
            else if (lst >= 31.5) fillColor = '#ea580c';
            else if (lst >= 29.5) fillColor = '#facc15';
            else fillColor = '#059669';
          } else if (activeLayer === 'road_buffers' || activeLayer === 'gee_m10') {
            const isCorridor = ['Palur', 'Bekonang', 'Gentan', 'Kadilangu', 'Trangsan', 'Triyagan', 'Purbayan'].includes(desaName);
            fillColor = isCorridor ? '#e11d48' : '#cbd5e1';
          } else if (activeLayer === 'environmental' || activeLayer === 'gee_m15') {
            const isRiverine = ['Gadingan', 'Klumprit', 'Laban', 'Tegalmade', 'Demakan', 'Plumbon'].includes(desaName);
            fillColor = isRiverine ? '#0284c7' : '#cbd5e1';
          } else if (activeLayer === 'typology' || activeLayer === 'gee_m16') {
            if (['Gentan', 'Palur', 'Kadilangu', 'Triyagan'].includes(desaName)) fillColor = '#e11d48';
            else if (['Trangsan'].includes(desaName)) fillColor = '#7c3aed';
            else if (['Cangkol', 'Demakan', 'Sapen', 'Blimbing'].includes(desaName)) fillColor = '#16a34a';
            else if (['Gawok', 'Blimbing'].includes(desaName)) fillColor = '#f59e0b';
            else fillColor = '#0284c7';
          } else {
            fillColor = lulcData?.wpId === 'baki' ? '#e11d48' : lulcData?.wpId === 'gatak' ? '#059669' : '#0284c7';
          }

          return {
            color: '#ffffff',
            weight: wpMatches ? 1.5 : 0.5,
            opacity: wpMatches ? 0.9 : 0.3,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
          };
        },
        onEachFeature: (feature, layer) => {
          const desaName = feature?.properties?.name || '';
          const kecName = feature?.properties?.kecamatan || '';
          const lulcData = VILLAGE_LULC_DATABASE[desaName];
          const desaInfo = DESA_3WP_DETAILS[desaName];

          const yrData =
            temporalYear === '2015'
              ? lulcData?.lulc2015
              : temporalYear === '2020'
              ? lulcData?.lulc2020
              : lulcData?.lulc2025;

          layer.bindTooltip(
            `<div class="font-sans text-xs p-1.5 space-y-1">
              <div class="font-bold text-white flex items-center justify-between gap-2 border-b border-slate-700 pb-1">
                <span>Desa ${desaName}</span>
                <span class="px-1.5 py-0.2 rounded bg-blue-900 text-cyan-300 text-[10px] font-mono">${kecName}</span>
              </div>
              <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
                <div class="text-slate-300">Luas: <strong class="text-white">${lulcData?.luasTotalHa || desaInfo?.areaHa || 200} Ha</strong></div>
                <div class="text-amber-400">DPI: <strong class="text-white">${lulcData?.geeIndicators?.dpiScore || 50}</strong></div>
                <div class="text-emerald-400">Sawah: <strong class="text-white">${yrData?.sawahHa || 0} Ha</strong></div>
                <div class="text-rose-400">Terbangun: <strong class="text-white">${yrData?.terbangunHa || 0} Ha</strong></div>
              </div>
              ${
                lulcData?.conversionMetrics
                  ? `<div class="text-[10px] text-rose-300 pt-0.5 border-t border-slate-700 font-mono">
                      Alih Fungsi Sawah: -${lulcData.conversionMetrics.pctSawahLost}% (${lulcData.conversionMetrics.totalLossHa} Ha)
                    </div>`
                  : ''
              }
              <div class="text-sky-300 text-[9px] italic">Klik desa untuk telaah data detail & matriks RDTR</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          layer.on('click', () => {
            if (desaInfo) {
              setSelectedDesa(desaInfo);
              setSelectedKecamatanId(null);
              setSelectedInfra(null);
            }
          });
        },
      });

      geeLayer.addTo(mainGroup);

      // Render Spatial Land Change Hotspots if in Change Detection or M-08
      if (activeLayer === 'change_detection' || activeLayer === 'gee_m08') {
        LAND_CHANGE_HOTSPOTS.forEach((hotspot) => {
          if (selectedWp !== 'all' && hotspot.wpId !== selectedWp) return;

          const latlngs = hotspot.polygonCoordinates.map(([lat, lng]) => L.latLng(lat, lng));
          const poly = L.polygon(latlngs, {
            color: hotspot.color,
            weight: 3,
            dashArray: '5, 5',
            fillColor: hotspot.fillColor,
            fillOpacity: 0.5 * layerOpacity,
          });

          poly.bindTooltip(
            `<div class="font-sans text-xs p-1.5 space-y-1">
              <div class="flex items-center space-x-1.5 border-b border-slate-700 pb-1">
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${hotspot.color}"></span>
                <span class="font-bold text-white uppercase text-[11px]">${hotspot.name}</span>
              </div>
              <div class="text-amber-300 font-semibold text-[10px]">${hotspot.labelTransisi}</div>
              <div class="text-slate-300 text-[10px]">Luas: <strong class="text-white">${hotspot.areaHa} Ha</strong> | ${hotspot.kecamatan}</div>
              <div class="text-cyan-300 text-[9px] font-mono">🔍 Klik untuk telaah citra Sentinel-2 & regulasi RDTR</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          poly.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedHotspot(hotspot);
            setSelectedDesa(null);
            setSelectedInfra(null);
          });

          poly.addTo(mainGroup);

          // Center Marker
          const marker = L.circleMarker(hotspot.centerCoordinates, {
            radius: 7,
            color: '#ffffff',
            weight: 2,
            fillColor: hotspot.color,
            fillOpacity: 0.95,
          });

          marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedHotspot(hotspot);
            setSelectedDesa(null);
            setSelectedInfra(null);
          });

          marker.addTo(mainGroup);
        });
      }

      // Outer WP Boundaries for regional context
      const wps: ('mojolaban' | 'baki' | 'gatak')[] = ['mojolaban', 'baki', 'gatak'];
      wps.forEach((id) => {
        const isSelected = selectedWp === 'all' || selectedWp === id;
        const geoFeature = WP_GEOJSON_BOUNDARIES[id];
        let boundaryColor = '#0284c7';
        if (id === 'baki') boundaryColor = '#e11d48';
        if (id === 'gatak') boundaryColor = '#059669';

        const poly = L.geoJSON(geoFeature, {
          style: {
            color: boundaryColor,
            weight: isSelected ? 2.5 : 1,
            opacity: isSelected ? 0.9 : 0.3,
            fill: false,
            dashArray: '6, 4',
          },
        });
        poly.addTo(mainGroup);
      });
    }

    // B. OPTIONAL OVERLAY: 43 Desa Boundaries (can be superimposed on ANY layer)
    if (overlayDesa && activeLayer !== 'desa_boundaries' && !activeLayer.startsWith('delineation_scenario')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const overlayDesaLayer = L.geoJSON(sukoharjoDesaGeo as any, {
        style: {
          color: '#e2e8f0',
          weight: 1,
          opacity: 0.6,
          fillOpacity: 0,
          dashArray: '2, 3',
        },
        onEachFeature: (feature, layer) => {
          const desaName = feature?.properties?.WADMKD || '';
          const kecName = feature?.properties?.WADMKC || '';
          const desaInfo = DESA_3WP_DETAILS[desaName];

          layer.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <span class="font-bold text-white">Desa ${desaName}</span> (${kecName})
              <div class="text-slate-300 text-[10px]">${desaInfo?.areaHa || 200} Ha</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          layer.on('click', () => {
            if (desaInfo) {
              setSelectedDesa(desaInfo);
              setSelectedKecamatanId(null);
            }
          });
        },
      });
      overlayDesaLayer.addTo(desaGroup);
    }

    // C. OPTIONAL OVERLAY: Real Infrastructure, KRL Commuter Line & Sempadan Sungai Riil
    if (overlayInfra) {
      // 1. ZONA SEMPADAN SUNGAI RIIL (Permen PUPR No. 28/PRT/M/2015)
      if (infraFilters.sempadan) {
        REAL_SEMPADAN_ZONES.forEach((smp) => {
          const polygon = L.polygon(smp.polygonCoordinates, {
            color: '#06b6d4', // cyan-500
            weight: 1.5,
            dashArray: '5, 4',
            fillColor: '#0891b2', // cyan-600
            fillOpacity: 0.25,
          });

          polygon.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-cyan-300 flex items-center gap-1">
                <span>🛡️ Sempadan ${smp.riverName}</span>
              </div>
              <div class="text-white text-[11px] mt-0.5">Lebar Sempadan: <b class="text-cyan-200">${smp.bufferWidthMeters} Meter</b></div>
              <div class="text-amber-300 text-[10px] mt-0.5">${smp.legalBasis}</div>
              <div class="text-slate-300 text-[10px] italic mt-0.5">Zona Lindung Setempat (KDB 0% - Dilarang Bangunan Permanen)</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          polygon.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'sempadan', data: smp });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          polygon.addTo(infraGroup);
        });
      }

      // 2. ALIRAN SUNGAI RIIL (Centerline Meander)
      if (infraFilters.sungai) {
        REAL_RIVERS.forEach((river) => {
          const latlngs = river.coordinates.map(([lat, lng]) => L.latLng(lat, lng));
          const isMain = river.type === 'Sungai Utama';

          // Water body casing
          const casing = L.polyline(latlngs, {
            color: '#0369a1',
            weight: isMain ? 6 : 4,
            opacity: 0.6,
          });
          casing.addTo(infraGroup);

          const riverLine = L.polyline(latlngs, {
            color: '#38bdf8', // sky-400
            weight: isMain ? 3.5 : 2,
            opacity: 0.95,
          });

          riverLine.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-sky-400">🌊 ${river.name}</div>
              <div class="text-white text-[11px]">${river.type} | Panjang ~${river.lengthKm} Km</div>
              <div class="text-slate-300 text-[10px]">${river.wp}</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          riverLine.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'river', data: river });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          riverLine.addTo(infraGroup);
        });
      }

      // 3. JALAN LINGKUNGAN / POROS DESA (Real Village Connectors)
      if (infraFilters.lingkungan) {
        REAL_ROADS.filter((r) => r.category === 'lingkungan').forEach((road) => {
          const latlngs = road.coordinates.map(([lat, lng]) => L.latLng(lat, lng));
          const line = L.polyline(latlngs, {
            color: '#cbd5e1', // slate-300
            weight: 2,
            opacity: 0.8,
            dashArray: '3, 4',
          });

          line.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-white">🏘️ ${road.name}</div>
              <div class="text-slate-300 text-[11px]">${road.categoryLabel} | ROW: ${road.widthMeters}m</div>
              <div class="text-amber-300 text-[10px]">${road.wp}</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          line.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'road', data: road });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          line.addTo(infraGroup);
        });
      }

      // 4. JALAN KOLEKTOR & LOKAL PRIMER
      if (infraFilters.kolektor) {
        REAL_ROADS.filter((r) => r.category === 'kolektor').forEach((road) => {
          const latlngs = road.coordinates.map(([lat, lng]) => L.latLng(lat, lng));

          // Dark road casing for clarity
          const casing = L.polyline(latlngs, {
            color: '#0f172a',
            weight: 5,
            opacity: 0.85,
          });
          casing.addTo(infraGroup);

          const line = L.polyline(latlngs, {
            color: '#f59e0b', // amber-500
            weight: 3,
            opacity: 0.95,
          });

          line.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-amber-400">🛣️ ${road.name}</div>
              <div class="text-white text-[11px]">${road.categoryLabel} | ROW: ${road.widthMeters}m</div>
              <div class="text-slate-300 text-[10px]">${road.wp}</div>
              <div class="text-emerald-400 text-[10px]">V-rencana: ${road.speedKmh} km/jam | ${road.surface}</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          line.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'road', data: road });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          line.addTo(infraGroup);
        });
      }

      // 5. JALAN ARTERI PRIMER & SEKUNDER
      if (infraFilters.arteri) {
        REAL_ROADS.filter((r) => r.category === 'arteri').forEach((road) => {
          const latlngs = road.coordinates.map(([lat, lng]) => L.latLng(lat, lng));

          // Thick casing
          const casing = L.polyline(latlngs, {
            color: '#020617',
            weight: 7,
            opacity: 0.9,
          });
          casing.addTo(infraGroup);

          const line = L.polyline(latlngs, {
            color: '#f43f5e', // rose-500
            weight: 4.5,
            opacity: 1,
          });

          line.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-rose-400">🚦 ${road.name}</div>
              <div class="text-white text-[11px]">${road.categoryLabel} | ROW: ${road.widthMeters}m</div>
              <div class="text-slate-300 text-[10px]">${road.wp}</div>
              <div class="text-amber-300 text-[10px]">V-rencana: ${road.speedKmh} km/jam (${road.surface})</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          line.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'road', data: road });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          line.addTo(infraGroup);
        });
      }

      // 6. JALUR KRL COMMUTER LINE SOLO - YOGYAKARTA & KERETA API
      if (infraFilters.krl) {
        REAL_RAILWAYS.forEach((rw) => {
          const latlngs = rw.coordinates.map(([lat, lng]) => L.latLng(lat, lng));

          // Base railroad ballast bed
          const railBed = L.polyline(latlngs, {
            color: '#09090b',
            weight: 5.5,
            opacity: 0.95,
          });
          railBed.addTo(infraGroup);

          // Alternating rail ties (dashed double line)
          const railTies = L.polyline(latlngs, {
            color: rw.electrified ? '#f59e0b' : '#f8fafc',
            weight: 3,
            opacity: 1,
            dashArray: '6, 6',
          });

          railTies.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-amber-400">🚆 ${rw.name}</div>
              <div class="text-white text-[11px]">${rw.tracks} | ${rw.voltage}</div>
              <div class="text-slate-300 text-[10px]">${rw.operator} | ${rw.corridor}</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          railTies.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'railway', data: rw });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          railTies.addTo(infraGroup);
        });

        // Railway Stations (TOD Nodes)
        REAL_STATIONS.forEach((st) => {
          const stationMarker = L.circleMarker(st.coordinates, {
            radius: st.isTOD ? 8 : 6,
            color: '#ffffff',
            weight: 2,
            fillColor: st.isTOD ? '#f59e0b' : '#38bdf8',
            fillOpacity: 1,
          });

          stationMarker.bindTooltip(
            `<div class="font-sans text-xs p-1">
              <div class="font-bold text-amber-400">🚉 ${st.name}</div>
              <div class="text-white text-[11px]">Kode: <b>${st.code}</b> | Elevasi: ${st.elevation}</div>
              <div class="text-slate-300 text-[10px]">${st.wp}</div>
              ${st.isTOD ? '<div class="text-emerald-400 text-[10px] font-semibold mt-0.5">🌟 Simpul Prioritas TOD Gatak (Skenario 3 RDTR)</div>' : ''}
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          stationMarker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedInfra({ type: 'station', data: st });
            setSelectedDesa(null);
            setSelectedKecamatanId(null);
          });

          stationMarker.addTo(infraGroup);
        });
      }
    }

    // Pan / Zoom smoothly if WP selected
    if (selectedWp !== 'all') {
      const geom = WP_GEOJSON_BOUNDARIES[selectedWp];
      if (geom) {
        const leafletGeo = L.geoJSON(geom);
        map.flyToBounds(leafletGeo.getBounds(), { padding: [40, 40], duration: 0.8 });
      }
    }
  }, [activeLayer, selectedScenario, selectedWp, onSelectWp, opacity, overlayDesa, overlayInfra, infraFilters]);

  return (
    <div className="space-y-4">
      {/* INLINE NOTICE: Official Delineation Status & Webportal Connection */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow-sm">
                STATUS RESMI: DELINEASI BELUM DITENTUKAN
              </span>
              <span className="text-xs text-amber-300/90 font-medium">
                Pembagian Wilayah Perencanaan Berbasis Per-Kecamatan (WP Mojolaban, WP Baki, WP Gatak)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Berdasarkan materi teknis resmi Webportal RDTR Sukoharjo (
              <span className="font-mono text-emerald-400">petainteraktif.github.io/rdtrsukoharjo</span>),
              garis batas delineasi definitif saat ini <span className="text-amber-300 font-semibold">belum ditetapkan</span> (masih dalam tahap pengkajian teknis, analisis fungsional, dan penjaringan aspirasi publik). 
              Aplikasi ini mengintegrasikan seluruh basis data spasial 12 Kecamatan dan 43 Desa/Kelurahan dengan analisis multi-temporal Sentinel-2 GEE.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-start md:self-center">
          <button
            onClick={() => setIsPortalModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Lihat Portal Asli (Iframe)</span>
          </button>
          <a
            href="https://petainteraktif.github.io/rdtrsukoharjo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-all"
          >
            <span>Tab Baru</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Main Interactive Map Card */}
      <div className="relative w-full h-[820px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        {/* Map Header Toolbar */}
        <div className="min-h-16 px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 z-20 shadow-xs">
          <div className="flex items-center flex-wrap gap-2">
            {/* Unified Layer Selector */}
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              <Layers className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-slate-800">Layer Tematik:</span>
              <select
                value={activeLayer}
                onChange={(e) => setActiveLayer(e.target.value as LayerMode)}
                className="bg-white text-xs text-slate-900 rounded-lg px-2.5 py-1 border border-slate-300 focus:outline-none focus:border-blue-600 font-semibold shadow-xs"
              >
                <optgroup label="📋 DELINEASI & STATUS RDTR PORTAL">
                  <option value="delineation_status">Status RDTR 12 Kecamatan Sukoharjo (Resmi Portal)</option>
                  <option value="desa_boundaries">43 Batas Desa / Kelurahan 3 WP (Mojolaban, Baki, Gatak)</option>
                  <option value="delineation_scenario_1">Skenario 1: Administratif Penuh (7.698 Ha)</option>
                  <option value="delineation_scenario_2">Skenario 2: Fungsional Perkotaan (4.525 Ha)</option>
                  <option value="delineation_scenario_3">Skenario 3: Aglomerasi Koridor & Transit (5.480 Ha)</option>
                </optgroup>
                <optgroup label="🛰️ GEE: 16 MODUL ANALISIS SPASIAL & ALIH FUNGSI">
                  <option value="gee_m01">M-01: Komposit Citra Alami Sentinel-2</option>
                  <option value="ndvi">M-02: Indeks Vegetasi (NDVI & Kerapatan)</option>
                  <option value="ndwi">M-03: Indeks Air & Kelembaban (NDWI)</option>
                  <option value="built_up">M-04: Kepadatan Bangunan (NDBI Proxy)</option>
                  <option value="gee_m05">M-05: Rekam Jejak Ekspansi Urban Multi-Temporal</option>
                  <option value="gee_m06">M-06: Sawah Irigasi Teknis & LP2B Abadi</option>
                  <option value="lulc">M-07: Tutupan Lahan LULC 6 Kelas (2015-2025)</option>
                  <option value="change_detection">M-08: Dinamika Alih Fungsi Lahan (Hotspot & Matriks)</option>
                  <option value="development_pressure">M-09: Indeks Tekanan Pembangunan (DPI Score)</option>
                  <option value="road_buffers">M-10: Sprawl Koridor Jalan (Buffer 100-250-500m)</option>
                  <option value="gee_m11">M-11: Morfologi Urban (Infill, Edge, Leapfrog)</option>
                  <option value="gee_m12">M-12: Metrik Fragmentasi Petak Sawah</option>
                  <option value="gee_m13">M-13: Suhu Permukaan & Urban Heat Island (LST)</option>
                  <option value="gee_m14">M-14: Kelerengan & Elevasi Dataran Aluvial (DEM)</option>
                  <option value="environmental">M-15: Kerentanan Banjir Bengawan Solo</option>
                  <option value="typology">M-16: Sintesis & Arahan Pola Ruang RDTR</option>
                </optgroup>
              </select>
            </div>

            {/* GEE 16 Modules Catalog Trigger */}
            <button
              onClick={() => setIsGeeCatalogOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Buka Katalog Interaktif 16 Modul Analisis GEE"
            >
              <Satellite className="w-3.5 h-3.5 text-cyan-300" />
              <span>Katalog 16 Modul GEE</span>
              <span className="bg-blue-800 text-cyan-200 text-[10px] px-1.5 py-0.2 rounded-full border border-blue-700 font-mono">
                16
              </span>
            </button>

            {/* Hotspots Indicator in Change Detection mode */}
            {(activeLayer === 'change_detection' || activeLayer === 'gee_m08') && (
              <div className="flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl text-xs font-bold text-rose-900 shadow-xs animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>6 Klaster Hotspot Alih Fungsi Aktif di Peta</span>
              </div>
            )}

            {/* Scenario Quick Switcher */}
            {(activeLayer.startsWith('delineation_scenario') || activeLayer === 'desa_boundaries') && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <span className="px-2 text-[11px] text-slate-600 font-semibold hidden sm:inline">Skenario:</span>
                {(
                  [
                    { id: 'skenario1', label: '1: Admin Penuh' },
                    { id: 'skenario2', label: '2: Urban Core' },
                    { id: 'skenario3', label: '3: Koridor TOD' },
                  ] as const
                ).map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc.id);
                      setActiveLayer(`delineation_${sc.id}` as LayerMode);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                      (activeLayer === `delineation_${sc.id}` || selectedScenario === sc.id)
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            )}

            {/* Temporal Year Selector (For GEE layers) */}
            {activeLayer !== 'delineation_status' && !activeLayer.startsWith('delineation_') && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <div className="px-2 py-1 text-xs text-slate-600 flex items-center space-x-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <span>Tahun:</span>
                </div>
                {(['2015', '2020', '2025'] as TemporalYear[]).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setTemporalYear(yr)}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                      temporalYear === yr
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}

            {/* WP Filter Switcher */}
            <div className="hidden xl:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              {(
                [
                  { id: 'all', label: 'Semua WP' },
                  { id: 'mojolaban', label: 'Mojolaban' },
                  { id: 'baki', label: 'Baki' },
                  { id: 'gatak', label: 'Gatak' },
                ] as const
              ).map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => onSelectWp(wp.id)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                    selectedWp === wp.id
                      ? 'bg-blue-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white font-medium'
                  }`}
                >
                  {wp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overlays & Map Style controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Superimposed Toggles */}
            <div className="relative flex items-center bg-slate-100 px-2 py-1 rounded-xl border border-slate-200 text-xs shadow-xs">
              <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 hover:text-slate-900 px-1 font-medium">
                <input
                  type="checkbox"
                  checked={overlayDesa}
                  onChange={(e) => setOverlayDesa(e.target.checked)}
                  className="rounded border-slate-300 text-blue-900 focus:ring-blue-600"
                />
                <span className="text-[11px] hidden sm:inline">Batas Desa</span>
                <span className="text-[11px] sm:hidden">Desa</span>
              </label>

              <span className="text-slate-300 mx-1">|</span>

              <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 hover:text-slate-900 px-1 font-medium">
                <input
                  type="checkbox"
                  checked={overlayInfra}
                  onChange={(e) => setOverlayInfra(e.target.checked)}
                  className="rounded border-slate-300 text-blue-900 focus:ring-blue-600"
                />
                <span className="text-[11px] font-bold text-blue-900">Infrastruktur Riil</span>
              </label>

              {overlayInfra && (
                <button
                  onClick={() => setShowInfraFilterMenu(!showInfraFilterMenu)}
                  className="ml-1 p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200 transition-colors"
                  title="Filter Sub-Layer Infrastruktur & Sempadan"
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-700" />
                </button>
              )}

              {/* Popover Filter Sub-layer Menu */}
              {overlayInfra && showInfraFilterMenu && (
                <div className="absolute top-10 right-0 z-50 w-72 bg-white rounded-xl border border-slate-200 p-3 shadow-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-150 text-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      Layer Infrastruktur Riil
                    </span>
                    <button
                      onClick={() => setShowInfraFilterMenu(false)}
                      className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-1 rounded bg-[#e11d48]"></span>
                        <span className="text-slate-800 font-medium">Jalan Arteri</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={infraFilters.arteri}
                        onChange={(e) => setInfraFilters((prev) => ({ ...prev, arteri: e.target.checked }))}
                        className="rounded border-slate-300 text-rose-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-1 rounded bg-[#d97706]"></span>
                        <span className="text-slate-800 font-medium">Jalan Kolektor & Lokal</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={infraFilters.kolektor}
                        onChange={(e) => setInfraFilters((prev) => ({ ...prev, kolektor: e.target.checked }))}
                        className="rounded border-slate-300 text-amber-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-0.5 border-t border-dashed border-slate-400"></span>
                        <span className="text-slate-800 font-medium">Jalan Lingkungan / Poros Desa</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={infraFilters.lingkungan}
                        onChange={(e) => setInfraFilters((prev) => ({ ...prev, lingkungan: e.target.checked }))}
                        className="rounded border-slate-300 text-slate-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-1 bg-[#f59e0b] border-t border-b border-black"></span>
                        <span className="text-slate-800 font-bold">KRL Solo-Yogya & TOD Gawok</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={infraFilters.krl}
                        onChange={(e) => setInfraFilters((prev) => ({ ...prev, krl: e.target.checked }))}
                        className="rounded border-slate-300 text-amber-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-1 rounded bg-[#0284c7]"></span>
                        <span className="text-slate-800 font-medium">Aliran Sungai (Bengawan Solo)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={infraFilters.sungai}
                        onChange={(e) => setInfraFilters((prev) => ({ ...prev, sungai: e.target.checked }))}
                        className="rounded border-slate-300 text-sky-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-2 rounded bg-cyan-100 border border-dashed border-cyan-600"></span>
                        <span className="text-cyan-800 font-bold">Sempadan Sungai (100m)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={infraFilters.sempadan}
                        onChange={(e) => setInfraFilters((prev) => ({ ...prev, sempadan: e.target.checked }))}
                        className="rounded border-slate-300 text-cyan-600"
                      />
                    </label>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-semibold">
                    <button
                      onClick={() =>
                        setInfraFilters({
                          arteri: true,
                          kolektor: true,
                          lingkungan: true,
                          krl: true,
                          sungai: true,
                          sempadan: true,
                        })
                      }
                      className="text-blue-700 hover:underline"
                    >
                      Aktifkan Semua
                    </button>
                    <button
                      onClick={() =>
                        setInfraFilters({
                          arteri: false,
                          kolektor: false,
                          lingkungan: false,
                          krl: false,
                          sungai: false,
                          sempadan: false,
                        })
                      }
                      className="text-slate-500 hover:underline"
                    >
                      Nonaktifkan Semua
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Base Tile switch: Carto Voyager, Positron, Citra Satelit, OSM, Topografi */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setBaseMapType('voyager')}
                title="CartoDB Voyager (Jalan & Bangunan Rinci)"
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  baseMapType === 'voyager' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Voyager
              </button>
              <button
                onClick={() => setBaseMapType('positron')}
                title="Peta Terang Positron (Rekomendasi Formal)"
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  baseMapType === 'positron' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Positron
              </button>
              <button
                onClick={() => setBaseMapType('satellite')}
                title="Citra Satelit Beresolusi Tinggi (Esri)"
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  baseMapType === 'satellite' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Satelit
              </button>
              <button
                onClick={() => setBaseMapType('osm')}
                title="OpenStreetMap Standard"
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  baseMapType === 'osm' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                OSM
              </button>
              <button
                onClick={() => setBaseMapType('topo')}
                title="Topografi & Kontur Elevasi (OpenTopoMap)"
                className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
                  baseMapType === 'topo' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Topografi
              </button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative flex-1 w-full h-full">
          <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-100" />

          {/* Dynamic Floating Legend (Top Left) */}
          <div className="absolute top-4 left-4 z-10 w-76 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-slate-200 shadow-lg text-xs space-y-3 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Compass className="w-4 h-4 text-blue-700" />
                <span>LEGENDA SPASIAL TERPADU</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {activeLayer.startsWith('delineation') ? 'PORTAL RDTR' : temporalYear}
              </span>
            </div>

            {/* Delineation Status Legend */}
            {activeLayer === 'delineation_status' && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-700">Status RDTR 12 Kecamatan Sukoharjo:</div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#10b981] shrink-0 border border-emerald-600"></span>
                  <span className="text-slate-800 font-medium">RDTR Ditetapkan (Perda 4/5/6 2020 & 7/2021)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#38bdf8] shrink-0 border border-amber-500"></span>
                  <div className="text-slate-800">
                    <span className="font-bold text-amber-800">Kec. Grogol: </span>
                    <span className="text-[10px] font-semibold text-slate-600">RDTR Eksisting (SK 600.3/342/2026)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#0284c7] shrink-0 border border-blue-600"></span>
                  <span className="text-blue-950 font-bold">Wilayah Pekerjaan RDTR Baru (3 WP):</span>
                </div>
                <div className="pl-5 space-y-1 text-[11px] text-slate-700 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>
                    <span>WP Mojolaban (15 Desa - 3.554 Ha)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]"></span>
                    <span>WP Baki (14 Desa - 2.197 Ha)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
                    <span>WP Gatak (14 Desa - 1.947 Ha)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-1.5 border-t border-slate-200">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#94a3b8] shrink-0"></span>
                  <span className="text-slate-600">Kecamatan Non-RDTR (Polokarto, Tawangsari, dll)</span>
                </div>
              </div>
            )}

            {/* Scenario Legend */}
            {(activeLayer.startsWith('delineation_scenario') || activeLayer === 'desa_boundaries') && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-700">
                  {activeLayer === 'desa_boundaries'
                    ? '43 Desa / Kelurahan di 3 WP Kandidat:'
                    : `Simulasi ${DELINEATION_SCENARIOS[selectedScenario].shortName}:`}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-blue-700 shrink-0 border border-blue-900"></span>
                  <span className="text-slate-900 font-bold">Masuk Delineasi RDTR</span>
                </div>
                {activeLayer !== 'desa_boundaries' && (
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-sm bg-slate-200 border border-dashed border-slate-400 shrink-0"></span>
                    <span className="text-slate-600">Di Luar Delineasi (Perdesaan/LP2B Murni)</span>
                  </div>
                )}
                <div className="bg-slate-50 p-2 rounded-lg text-[10px] text-slate-700 space-y-0.5 mt-1 border border-slate-200">
                  <div className="font-bold text-blue-900">
                    Total Luas: {DELINEATION_SCENARIOS[selectedScenario].totalAreaHa.total.toLocaleString()} Ha
                  </div>
                  <div>Mojolaban: {DELINEATION_SCENARIOS[selectedScenario].totalAreaHa.mojolaban} Ha</div>
                  <div>Baki: {DELINEATION_SCENARIOS[selectedScenario].totalAreaHa.baki} Ha</div>
                  <div>Gatak: {DELINEATION_SCENARIOS[selectedScenario].totalAreaHa.gatak} Ha</div>
                </div>
              </div>
            )}

            {/* GEE LULC Legend */}
            {(activeLayer === 'lulc' || activeLayer === 'gee_m07') && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700">Klasifikasi Tutupan Lahan (6 Kelas):</div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#e11d48] shrink-0"></span>
                  <span className="text-slate-800">1. Lahan Terbangun / Permukiman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#eab308] shrink-0"></span>
                  <span className="text-slate-800">2. Transisi Pertanian-Permukiman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#16a34a] shrink-0"></span>
                  <span className="text-slate-800">3. Sawah Irigasi Utama (LP2B Dominan)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#7c3aed] shrink-0"></span>
                  <span className="text-slate-800">4. Sentra Industri Rotan Trangsan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#0284c7] shrink-0"></span>
                  <span className="text-slate-800">5. Badan Air (Bengawan Solo)</span>
                </div>
                <div className="text-[10px] text-slate-500 pt-1 font-mono">
                  Multi-temporal: {temporalYear} (10m Sentinel-2 SR)
                </div>
              </div>
            )}

            {/* GEE Change Detection & Hotspots Legend */}
            {(activeLayer === 'change_detection' || activeLayer === 'gee_m08') && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-700">Alih Fungsi Lahan 10 Tahun (2015-2025):</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-sm bg-[#991b1b] shrink-0"></span>
                    <span className="text-rose-950 font-bold">Kritis (&gt; 50% Sawah Hilang)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-sm bg-[#dc2626] shrink-0"></span>
                    <span className="text-slate-800">Tinggi (40% - 50% Sawah Hilang)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-sm bg-[#f59e0b] shrink-0"></span>
                    <span className="text-slate-800">Sedang (25% - 40% Sawah Hilang)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-sm bg-[#059669] shrink-0"></span>
                    <span className="text-emerald-900 font-bold">Terkendali / Sawah Abadi LP2B (&lt; 25%)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>6 Klaster Hotspot Spasial:</span>
                    <span className="text-rose-600 font-bold font-mono">6 KLIK</span>
                  </div>
                  <div className="space-y-1 text-[10.5px]">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] border border-white shrink-0"></span>
                      <span className="text-slate-800">Gentan-Purbayan (Urban Sprawl -145 Ha)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] border border-white shrink-0"></span>
                      <span className="text-slate-800">Trangsan (Sentra Industri Rotan 85 Ha)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] border border-white shrink-0"></span>
                      <span className="text-slate-800">Palur-Bekonang (Ribbon Koridor 110 Ha)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#059669] border border-white shrink-0"></span>
                      <span className="text-slate-800">Cangkol-Demakan (LP2B Abadi 240 Ha)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] border border-white shrink-0"></span>
                      <span className="text-slate-800">Sempadan Bengawan Solo (Buffer 65 Ha)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5] border border-white shrink-0"></span>
                      <span className="text-slate-800">Stasiun Gawok (TOD Transit 40 Ha)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Dynamic GEE Module Legend */}
            {activeGeeMeta &&
              activeLayer !== 'lulc' &&
              activeLayer !== 'gee_m07' &&
              activeLayer !== 'change_detection' &&
              activeLayer !== 'gee_m08' && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-800 flex items-center justify-between">
                    <span>{activeGeeMeta.titleId}:</span>
                  </div>
                  <div className="space-y-1">
                    {activeGeeMeta.legendItems.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="w-3.5 h-3.5 rounded-sm shrink-0 border border-slate-200" style={{ backgroundColor: item.color }}></span>
                        <span className="text-slate-800 text-[11px]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>Dataset: {activeGeeMeta.primaryDataset.split(' ')[0]}</span>
                    <span className="text-emerald-700 font-bold">{activeGeeMeta.accuracyMetric}</span>
                  </div>
                </div>
              )}

            {/* Transport & Hydro symbols (Garis Riil & Sempadan) */}
            {overlayInfra && (
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                  <span>Jaringan & Sempadan Riil:</span>
                </div>

                {infraFilters.arteri && (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-1 rounded bg-[#e11d48] shadow-xs"></span>
                    <span className="text-[11px] text-slate-800 font-medium">Jalan Arteri (Solo-Wonogiri, Solo-Yogya)</span>
                  </div>
                )}

                {infraFilters.kolektor && (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-0.5 rounded bg-[#d97706]"></span>
                    <span className="text-[11px] text-slate-800">Jalan Kolektor & Lokal (Gentan, Gawok, Bekonang)</span>
                  </div>
                )}

                {infraFilters.lingkungan && (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-0.5 border-t border-dashed border-slate-400"></span>
                    <span className="text-[11px] text-slate-600">Jalan Lingkungan / Poros Desa (43 Desa)</span>
                  </div>
                )}

                {infraFilters.krl && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <span className="w-4 h-0.5 bg-black border-t border-dashed border-amber-500"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-500 ml-1 border border-white"></span>
                    </div>
                    <span className="text-[11px] text-amber-900 font-bold">KRL Solo-Yogya & Stasiun TOD Gawok</span>
                  </div>
                )}

                {infraFilters.sungai && (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-1 rounded bg-[#0284c7]"></span>
                    <span className="text-[11px] text-slate-800">Aliran Bengawan Solo, Kali Jenes, Dengkeng</span>
                  </div>
                )}

                {infraFilters.sempadan && (
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-2 rounded bg-cyan-100 border border-dashed border-cyan-600"></span>
                    <span className="text-[11px] text-cyan-900 font-bold">Sempadan Sungai (100m Permen PUPR 28/2015)</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Compass & North Arrow (Top Right) */}
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-slate-200 shadow-md flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center relative bg-slate-50">
              <span className="text-[10px] font-bold text-rose-600 absolute -top-1">U</span>
              <div className="w-0.5 h-5 bg-gradient-to-t from-slate-400 via-slate-600 to-rose-600"></div>
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-600 mt-1">UTARA</span>
          </div>

          {/* Telemetry Bar (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 border border-slate-200 shadow-md flex items-center space-x-4 text-xs text-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">SISTEM KOORDINAT:</span>
              <span className="font-mono text-slate-800 text-[11px] font-bold">WGS 84 (EPSG:4326) / UTM 49S</span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-[10px] text-slate-400 font-semibold block">KURSOR KOORDINAT:</span>
              <span className="font-mono text-blue-900 text-[11px] font-bold">
                {mouseCoords ? `${mouseCoords.lat}°, ${mouseCoords.lng}°` : '-7.60500°, 110.83500°'}
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3 hidden md:block">
              <span className="text-[10px] text-slate-400 font-semibold block">SUMBER DATA:</span>
              <span className="font-mono text-slate-700 text-[11px]">petainteraktif.github.io/rdtrsukoharjo</span>
            </div>
          </div>

          {/* REAL INFRASTRUCTURE & RIVER BUFFER INSPECTOR PANEL (Bottom Right) */}
          {selectedInfra && (
            <div className="absolute bottom-4 right-4 z-20 w-96 bg-white/98 backdrop-blur-md rounded-2xl p-4 border border-blue-200 shadow-xl space-y-3 max-h-[440px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <div className="text-[10px] text-blue-800 uppercase font-bold tracking-wider flex items-center gap-1.5">
                    {selectedInfra.type === 'road' && <Navigation className="w-3 h-3 text-rose-600" />}
                    {selectedInfra.type === 'railway' && <Train className="w-3 h-3 text-amber-600" />}
                    {selectedInfra.type === 'station' && <Train className="w-3 h-3 text-amber-600" />}
                    {selectedInfra.type === 'river' && <Waves className="w-3 h-3 text-sky-600" />}
                    {selectedInfra.type === 'sempadan' && <ShieldAlert className="w-3 h-3 text-cyan-600" />}
                    <span>
                      {selectedInfra.type === 'road'
                        ? selectedInfra.data.categoryLabel
                        : selectedInfra.type === 'railway'
                        ? 'JALUR KERETA API & KRL'
                        : selectedInfra.type === 'station'
                        ? 'SIMPUL TRANSIT (TOD)'
                        : selectedInfra.type === 'river'
                        ? 'ALIRAN SUNGAI RIIL'
                        : 'SEMPADAN SUNGAI (ZLS)'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    {selectedInfra.type === 'station'
                      ? selectedInfra.data.name
                      : selectedInfra.type === 'sempadan'
                      ? `Zona Sempadan ${selectedInfra.data.riverName}`
                      : selectedInfra.data.name}
                  </h4>
                  <div className="text-xs text-slate-600">
                    {selectedInfra.type === 'station'
                      ? selectedInfra.data.wp
                      : selectedInfra.type === 'sempadan'
                      ? `Lebar Buffer Sempadan: ${selectedInfra.data.bufferWidthMeters} Meter`
                      : selectedInfra.data.wp}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInfra(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ROAD INSPECTOR DETAILS */}
              {selectedInfra.type === 'road' && (
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Klasifikasi RDTR:</span>
                      <span className="font-bold text-rose-700 text-right max-w-[200px]">
                        {selectedInfra.data.rdtrClassification}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Lebar Rumija (ROW):</span>
                      <span className="font-mono font-bold text-slate-900">{selectedInfra.data.widthMeters} Meter</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Kecepatan Rencana:</span>
                      <span className="font-mono text-emerald-700 font-semibold">{selectedInfra.data.speedKmh} km/jam</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tipe Perkerasan:</span>
                      <span className="text-slate-800">{selectedInfra.data.surface}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Status Pengembangan:</span>
                      <span className="font-bold text-amber-700">{selectedInfra.data.status}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-2 rounded-lg text-[11px] text-blue-900 border border-blue-200">
                    <span className="font-bold text-blue-950">Koridor Perencanaan:</span> Garis riil mengikuti alinyemen horizontal nyata di Wilayah Perencanaan RDTR Sukoharjo.
                  </div>
                </div>
              )}

              {/* RAILWAY INSPECTOR DETAILS */}
              {selectedInfra.type === 'railway' && (
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tipe Jalur:</span>
                      <span className="font-bold text-amber-700">{selectedInfra.data.tracks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Elektrifikasi:</span>
                      <span className="font-mono text-emerald-700 font-semibold">
                        {selectedInfra.data.electrified ? selectedInfra.data.voltage : 'Non-Elektrifikasi'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Operator Pelayanan:</span>
                      <span className="text-slate-800">{selectedInfra.data.operator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Rute Lintas:</span>
                      <span className="text-slate-700 text-[11px]">{selectedInfra.data.corridor}</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-2 rounded-lg text-[11px] text-amber-900 leading-relaxed border border-amber-200">
                    <span className="font-bold text-amber-950">Fungsi RDTR:</span> {selectedInfra.data.description}
                  </div>
                </div>
              )}

              {/* STATION TOD INSPECTOR DETAILS */}
              {selectedInfra.type === 'station' && (
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Kode Stasiun:</span>
                      <span className="font-mono font-bold text-amber-700">{selectedInfra.data.code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Elevasi Ketinggian:</span>
                      <span className="font-mono text-slate-800 font-semibold">{selectedInfra.data.elevation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Status Transit:</span>
                      <span className="font-bold text-emerald-700">Simpul TOD Prioritas</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-blue-900 text-xs leading-relaxed">
                    <span className="font-bold text-blue-950 block mb-1">Rekomendasi Tata Ruang RDTR (Skenario 3):</span>
                    {selectedInfra.data.todConcept}
                  </div>
                </div>
              )}

              {/* RIVER INSPECTOR DETAILS */}
              {selectedInfra.type === 'river' && (
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tipe Hidrologi:</span>
                      <span className="font-bold text-sky-700">{selectedInfra.data.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Panjang di Wilayah WP:</span>
                      <span className="font-mono font-bold text-slate-900">~{selectedInfra.data.lengthKm} Km</span>
                    </div>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-sky-900 text-xs leading-relaxed">
                    <span className="font-bold text-sky-950 block mb-1">Morfologi & Karakteristik:</span>
                    {selectedInfra.data.description}
                  </div>
                </div>
              )}

              {/* RIVER BUFFER / SEMPADAN SUNGAI INSPECTOR DETAILS */}
              {selectedInfra.type === 'sempadan' && (
                <div className="space-y-2.5 text-xs">
                  <div className="bg-cyan-50 border border-cyan-200 p-2.5 rounded-xl text-cyan-900 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">
                      Dasar Hukum & Ketentuan Zonasi
                    </div>
                    <div className="text-[11px] font-bold text-slate-900">{selectedInfra.data.legalBasis}</div>
                    <div className="text-[11px] text-amber-800 mt-1 font-semibold">{selectedInfra.data.zoningRule}</div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-[11px]">
                      <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pemanfaatan yang Diperbolehkan:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                        {selectedInfra.data.allowedUses.map((use: string, idx: number) => (
                          <li key={idx}>{use}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-[11px]">
                      <div className="font-bold text-rose-900 mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Pemanfaatan yang Dilarang (Restriksi Ketat):</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                        {selectedInfra.data.prohibitedUses.map((use: string, idx: number) => (
                          <li key={idx}>{use}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* INTEGRATED INSPECTOR PANEL (Bottom Right) */}
          {!selectedInfra && selectedDesa && (
            <div className="absolute bottom-4 right-4 z-20 w-96 bg-white/98 backdrop-blur-md rounded-2xl p-4 border border-blue-200 shadow-xl space-y-3 max-h-[420px] overflow-y-auto text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <div className="text-[10px] text-blue-800 uppercase font-bold tracking-wider">
                    INSPEKTUR DESA / KELURAHAN
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Desa {selectedDesa.name}</h4>
                  <div className="text-xs text-slate-600">Kecamatan {selectedDesa.kecamatan} | {selectedDesa.areaHa} Ha</div>
                </div>
                <button
                  onClick={() => setSelectedDesa(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">Karakteristik Lapangan:</div>
                  <p className="text-xs text-slate-800">{selectedDesa.karakterSpasial}</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">Rekomendasi Delineasi Skenario:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Skenario 1 (Admin Penuh):</span>
                      <span className="text-emerald-700 font-bold">Masuk (100%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Skenario 2 (Fungsional Urban):</span>
                      <span
                        className={`font-bold ${
                          selectedDesa.delineationRecommendation.skenario2_fungsional_perkotaan
                            ? 'text-emerald-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {selectedDesa.delineationRecommendation.skenario2_fungsional_perkotaan ? 'Direkomendasikan' : 'Non-Delineasi'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Skenario 3 (Koridor & Transit):</span>
                      <span
                        className={`font-bold ${
                          selectedDesa.delineationRecommendation.skenario3_aglomerasi_lintas
                            ? 'text-emerald-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {selectedDesa.delineationRecommendation.skenario3_aglomerasi_lintas ? 'Direkomendasikan' : 'Non-Delineasi'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-2 rounded-lg text-[11px] text-amber-900 border border-amber-200">
                  <span className="font-bold text-amber-950">Catatan Teknis RDTR:</span> {selectedDesa.catatanTeknis}
                </div>
              </div>
            </div>
          )}

          {/* DISTRICT INSPECTOR (when clicking a Kecamatan) */}
          {!selectedInfra && !selectedDesa && selectedKecamatanId && (
            <div className="absolute bottom-4 right-4 z-20 w-88 bg-white/98 backdrop-blur-md rounded-2xl p-4 border border-blue-200 shadow-xl space-y-3 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <div className="text-[10px] text-blue-800 uppercase font-bold tracking-wider">
                    PROFIL KECAMATAN / WP
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Kecamatan {selectedKecamatanId}</h4>
                </div>
                <button
                  onClick={() => setSelectedKecamatanId(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Special Exclusion Notice for Grogol */}
              {selectedKecamatanId === 'Grogol' ? (
                <div className="space-y-2 text-xs">
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-300 space-y-1.5">
                    <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-bold block w-fit">
                      RDTR EKSISTING TELAH DITETAPKAN
                    </span>
                    <div className="font-bold text-amber-950 text-[11px]">
                      Keputusan Bupati Sukoharjo No. 600.3/342 Tahun 2026
                    </div>
                    <div className="text-[10.5px] text-amber-900 font-medium leading-relaxed">
                      "Penetapan Delineasi Wilayah Perencanaan Rencana Detail Tata Ruang Kawasan Perkotaan Kecamatan Grogol Kabupaten Sukoharjo"
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-blue-950 text-xs leading-relaxed">
                    <span className="font-bold block mb-1">Status Batas Acuan Eksternal:</span>
                    Kecamatan Grogol (Kawasan Solo Baru) telah memiliki ketetapan RDTR tersendiri dan <strong>TIDAK TERMASUK</strong> dalam wilayah pekerjaan RDTR baru (Mojolaban, Baki, Gatak). Digunakan sebagai acuan harmonisasi batas jaringan jalan dan drainase lintas batas.
                  </div>
                </div>
              ) : RDTR_DISTRICTS_SUKOHARJO[selectedKecamatanId] && (
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-semibold block">Status Regulasi RDTR:</span>
                    <span className="font-bold text-slate-900">
                      {RDTR_DISTRICTS_SUKOHARJO[selectedKecamatanId].statusLabel}
                    </span>
                    {RDTR_DISTRICTS_SUKOHARJO[selectedKecamatanId].perdaNumber && (
                      <span className="text-emerald-700 block text-[11px] font-mono mt-0.5 font-bold">
                        {RDTR_DISTRICTS_SUKOHARJO[selectedKecamatanId].perdaNumber}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    {RDTR_DISTRICTS_SUKOHARJO[selectedKecamatanId].description}
                  </p>
                  {['Mojolaban', 'Baki', 'Gatak'].includes(selectedKecamatanId) && (
                    <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg text-blue-900 text-[11px]">
                      📋 Delineasi definitif masih dalam penyusunan (wilayah pekerjaan 2026).
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* DEFAULT WP STATS CARD (When no infra, desa, or kecamatan clicked) */}
          {!selectedInfra && !selectedDesa && !selectedKecamatanId && selectedWp !== 'all' && (
            <div className="absolute bottom-4 right-4 z-10 w-84 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-blue-200 shadow-xl space-y-2.5 text-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {WP_STATISTICS[selectedWp].name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  DPI: {WP_STATISTICS[selectedWp].developmentPressureScore}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                {WP_STATISTICS[selectedWp].confirmedCharacter}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 text-center">
                <div className="bg-slate-50 rounded p-1.5 border border-slate-200">
                  <span className="text-[9px] text-slate-500 font-semibold block">Total Luas</span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {WP_STATISTICS[selectedWp].totalAreaHa} Ha
                  </span>
                </div>
                <div className="bg-slate-50 rounded p-1.5 border border-slate-200">
                  <span className="text-[9px] text-rose-600 font-semibold block">Terbangun '25</span>
                  <span className="text-xs font-mono font-bold text-rose-700">
                    {WP_STATISTICS[selectedWp].builtUp2025Ha} Ha
                  </span>
                </div>
                <div className="bg-slate-50 rounded p-1.5 border border-slate-200">
                  <span className="text-[9px] text-amber-600 font-semibold block">Konversi LP2B</span>
                  <span className="text-xs font-mono font-bold text-amber-700">
                    {WP_STATISTICS[selectedWp].agriConversionHa} Ha
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EMBEDDED MODAL: WEBPORTAL ASLI (IFRAME) */}
      {isPortalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-6xl h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Webportal Resmi Penyusunan RDTR Kabupaten Sukoharjo
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    https://petainteraktif.github.io/rdtrsukoharjo/
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="https://petainteraktif.github.io/rdtrsukoharjo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors shadow-xs"
                >
                  <span>Buka di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <button
                  onClick={() => setIsPortalModalOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Iframe Content */}
            <div className="flex-1 w-full h-full bg-white relative">
              <iframe
                src="https://petainteraktif.github.io/rdtrsukoharjo/"
                title="Portal Resmi RDTR Sukoharjo"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
