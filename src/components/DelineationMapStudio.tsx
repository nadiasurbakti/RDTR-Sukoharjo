import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  RDTR_DISTRICTS_SUKOHARJO,
  DELINEATION_SCENARIOS,
  DESA_3WP_DETAILS,
  DesaDelineationInfo,
  DelineationScenario,
} from '../data/delineationData';
import sukoharjoKecamatanGeo from '../data/sukoharjo_kecamatan.json';
import sukoharjoDesaGeo from '../data/sukoharjo_desa_3wp.json';
import {
  Layers,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
  Maximize2,
  Eye,
  Sliders,
  FileCheck,
  Building2,
  Trees,
} from 'lucide-react';

interface DelineationMapStudioProps {
  onOpenPortalModal?: () => void;
}

export const DelineationMapStudio: React.FC<DelineationMapStudioProps> = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const kecamatanLayerRef = useRef<L.LayerGroup | null>(null);
  const desaLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeScenarioId, setActiveScenarioId] = useState<'skenario1' | 'skenario2' | 'skenario3'>('skenario1');
  const [selectedKecFilter, setSelectedKecFilter] = useState<'ALL' | 'Mojolaban' | 'Baki' | 'Gatak'>('ALL');
  const [selectedDesa, setSelectedDesa] = useState<DesaDelineationInfo | null>(null);
  const [showDesaBoundaries, setShowDesaBoundaries] = useState<boolean>(true);
  const [showKecamatanLabels, setShowKecamatanLabels] = useState<boolean>(true);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState<boolean>(false);
  const [mapBaseType, setMapBaseType] = useState<'voyager' | 'satellite' | 'dark' | 'osm'>('voyager');

  const activeScenario: DelineationScenario =
    DELINEATION_SCENARIOS.find((s) => s.id === activeScenarioId) || DELINEATION_SCENARIOS[0];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-7.615, 110.835],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Base Tile (Default: CartoDB Voyager with adjusted Carto key)
    const baseTile = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
      { maxZoom: 19, subdomains: 'abcd', attribution: '&copy; CartoDB &copy; OpenStreetMap' }
    ).addTo(map);

    const labelsTile = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
      { maxZoom: 19, opacity: 0.85, subdomains: 'abcd' }
    );

    const kecGroup = L.layerGroup().addTo(map);
    const desaGroup = L.layerGroup().addTo(map);

    kecamatanLayerRef.current = kecGroup;
    desaLayerRef.current = desaGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Map Switching
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapBaseType === 'voyager') {
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445',
        { maxZoom: 19, subdomains: 'abcd', attribution: '&copy; CartoDB &copy; OpenStreetMap' }
      ).addTo(map);
    } else if (mapBaseType === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }).addTo(map);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445', { maxZoom: 19, opacity: 0.85, subdomains: 'abcd' }).addTo(map);
    } else if (mapBaseType === 'dark') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png?key=cb1_3k54_1_ad93b04bed8b1f4181283445', { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{y}/{x}.png', { maxZoom: 19 }).addTo(map);
    }
  }, [mapBaseType]);

  // Update Kecamatan & Desa Vector Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const kecGroup = kecamatanLayerRef.current;
    const desaGroup = desaLayerRef.current;
    if (!map || !kecGroup || !desaGroup) return;

    kecGroup.clearLayers();
    desaGroup.clearLayers();

    // 1. Draw 12 Kecamatan of Sukoharjo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kecGeoJSON = L.geoJSON(sukoharjoKecamatanGeo as any, {
      style: (feature) => {
        const kecName = feature?.properties?.WADMKC;
        const info = RDTR_DISTRICTS_SUKOHARJO[kecName];
        const isCandidate = ['Mojolaban', 'Baki', 'Gatak'].includes(kecName);
        const isSelectedKec = selectedKecFilter === 'ALL' || selectedKecFilter === kecName;

        let strokeColor = '#64748b';
        let fillColor = '#334155';
        let fillOpacity = 0.15;
        let weight = 1.5;

        if (info?.status === 'DITETAPKAN') {
          strokeColor = '#10b981';
          fillColor = '#10b981';
          fillOpacity = isSelectedKec ? 0.25 : 0.08;
        } else if (isCandidate) {
          strokeColor = kecName === 'Mojolaban' ? '#f59e0b' : kecName === 'Baki' ? '#f43f5e' : '#06b6d4';
          fillColor = strokeColor;
          fillOpacity = isSelectedKec ? 0.15 : 0.05;
          weight = isSelectedKec ? 3 : 1.5;
        }

        return {
          color: strokeColor,
          weight: weight,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          dashArray: isCandidate ? '5, 5' : undefined,
        };
      },
      onEachFeature: (feature, layer) => {
        const kecName = feature?.properties?.WADMKC;
        const info = RDTR_DISTRICTS_SUKOHARJO[kecName];

        layer.bindTooltip(
          `<div class="p-1 font-sans text-xs">
            <div class="font-bold text-white">${info?.name || kecName}</div>
            <div class="text-[11px] font-medium ${
              info?.status === 'DITETAPKAN' ? 'text-emerald-400' : info?.status === 'SEDANG_DISUSUN' ? 'text-amber-400' : 'text-slate-400'
            }">
              ${info?.statusLabel || 'Non-RDTR'}
            </div>
            <div class="text-[10px] text-slate-300 mt-0.5">${info?.delineationStatus}</div>
          </div>`,
          { sticky: true, className: 'leaflet-custom-tooltip' }
        );

        layer.on('click', () => {
          if (['Mojolaban', 'Baki', 'Gatak'].includes(kecName)) {
            setSelectedKecFilter(kecName as 'Mojolaban' | 'Baki' | 'Gatak');
          }
        });
      },
    });

    kecGroup.addLayer(kecGeoJSON);

    // 2. Draw 43 Desa Polygons for Mojolaban, Baki, Gatak
    if (showDesaBoundaries) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const desaGeoJSON = L.geoJSON(sukoharjoDesaGeo as any, {
        filter: (feature) => {
          const kc = feature?.properties?.WADMKC;
          return selectedKecFilter === 'ALL' || selectedKecFilter === kc;
        },
        style: (feature) => {
          const desaName = feature?.properties?.NAMOBJ || feature?.properties?.WADMKD;
          const desaInfo = DESA_3WP_DETAILS.find((d) => d.name.toLowerCase() === desaName?.toLowerCase());

          let isIncluded = true;
          if (activeScenarioId === 'skenario2') {
            isIncluded = desaInfo?.delineationRecommendation.skenario2_fungsional_perkotaan ?? true;
          } else if (activeScenarioId === 'skenario3') {
            isIncluded = desaInfo?.delineationRecommendation.skenario3_aglomerasi_lintas ?? true;
          }

          const isSelected = selectedDesa?.name.toLowerCase() === desaName?.toLowerCase();

          return {
            color: isSelected ? '#38bdf8' : isIncluded ? '#22c55e' : '#e11d48',
            weight: isSelected ? 3 : 1.5,
            fillColor: isIncluded ? '#16a34a' : '#be123c',
            fillOpacity: isSelected ? 0.5 : isIncluded ? 0.25 : 0.1,
            dashArray: !isIncluded ? '4, 4' : undefined,
          };
        },
        onEachFeature: (feature, layer) => {
          const desaName = feature?.properties?.NAMOBJ || feature?.properties?.WADMKD;
          const kc = feature?.properties?.WADMKC;
          const desaInfo = DESA_3WP_DETAILS.find((d) => d.name.toLowerCase() === desaName?.toLowerCase());

          layer.bindTooltip(
            `<div class="p-1 font-sans text-xs">
              <div class="font-bold text-white">Desa ${desaName} (${kc})</div>
              <div class="text-[11px] text-slate-300">Luas: ${feature?.properties?.LUASWH ? Number(feature.properties.LUASWH).toFixed(1) : '-'} Ha</div>
              <div class="text-amber-400 text-[10px] font-semibold mt-0.5">Status: Belum Ditetapkan Delineasi</div>
            </div>`,
            { sticky: true, className: 'leaflet-custom-tooltip' }
          );

          layer.on('click', () => {
            if (desaInfo) {
              setSelectedDesa(desaInfo);
            }
          });
        },
      });

      desaGroup.addLayer(desaGeoJSON);
    }

    // Adjust Bounds when filter changes
    if (selectedKecFilter !== 'ALL') {
      // Find and zoom
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const singleKecGeo = (sukoharjoKecamatanGeo as any).features.find(
        (f: { properties: { WADMKC: string } }) => f.properties.WADMKC === selectedKecFilter
      );
      if (singleKecGeo) {
        const bounds = L.geoJSON(singleKecGeo).getBounds();
        map.flyToBounds(bounds, { padding: [30, 30], duration: 0.8 });
      }
    } else {
      map.flyTo([-7.615, 110.835], 11, { duration: 0.8 });
    }
  }, [selectedKecFilter, activeScenarioId, showDesaBoundaries, selectedDesa]);

  return (
    <div className="space-y-6">
      {/* Official Portal Reference Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700/60 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>STATUS: PEMBAGIAN PER WP (DELINEASI BELUM DITENTUKAN)</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Berdasarkan Portal Resmi: petainteraktif.github.io/rdtrsukoharjo
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>Peta Delineasi & Status RDTR Kabupaten Sukoharjo</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-4xl">
              Sesuai dengan basis data <strong>Webportal Penyusunan RDTR Kec. Mojolaban, Baki, dan Gatak Sukoharjo</strong>, wilayah perencanaan dibagi per kecamatan (per WP). Batas delineasi definitif <strong>belum ditetapkan secara legal</strong> dan saat ini sedang dalam proses analisis teknis, telaah kesesuaian fungsional, dan penjaringan aspirasi publik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsPortalModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>Lihat Webportal Asli (Iframe)</span>
            </button>

            <a
              href="https://petainteraktif.github.io/rdtrsukoharjo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all"
            >
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>Buka Tautan Eksternal</span>
            </a>
          </div>
        </div>

        {/* 3 WP Highlighting Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950 p-3 rounded-xl border border-amber-900/40 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-800/50">
              1
            </div>
            <div>
              <span className="text-xs font-bold text-white block">WP Kecamatan Mojolaban</span>
              <span className="text-[11px] text-slate-400 block">15 Desa | 3.554 Ha | Agro-Urban & Bengawan Solo</span>
              <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">Status: Delineasi Belum Ditentukan</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/40 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 border border-rose-800/50">
              2
            </div>
            <div>
              <span className="text-xs font-bold text-white block">WP Kecamatan Baki</span>
              <span className="text-[11px] text-slate-400 block">14 Desa | 2.197 Ha | Peri-Urban Spillover Surakarta</span>
              <span className="text-[10px] text-rose-400 font-semibold block mt-0.5">Status: Delineasi Belum Ditentukan</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-cyan-900/40 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 border border-cyan-800/50">
              3
            </div>
            <div>
              <span className="text-xs font-bold text-white block">WP Kecamatan Gatak</span>
              <span className="text-[11px] text-slate-400 block">14 Desa | 1.947 Ha | Agro-Industri Rotan & TOD Gawok</span>
              <span className="text-[10px] text-cyan-400 font-semibold block mt-0.5">Status: Delineasi Belum Ditentukan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delineation Scenario Simulator Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Simulasi Opsi Skenario Delineasi WP (Permen ATR/BPN No. 11/2021):
            </span>
          </div>

          {/* Kecamatan Quick Zoom Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 px-2">Fokus WP:</span>
            {(
              [
                { id: 'ALL', label: 'Seluruh Sukoharjo' },
                { id: 'Mojolaban', label: 'WP Mojolaban' },
                { id: 'Baki', label: 'WP Baki' },
                { id: 'Gatak', label: 'WP Gatak' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedKecFilter(filter.id)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  selectedKecFilter === filter.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Scenarios Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DELINEATION_SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{scenario.shortName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    {scenario.totalAreaHa.total.toLocaleString()} Ha Total
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{scenario.description}</p>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>M: {scenario.totalAreaHa.mojolaban} Ha</span>
                  <span>B: {scenario.totalAreaHa.baki} Ha</span>
                  <span>G: {scenario.totalAreaHa.gatak} Ha</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map & Interactive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative h-[620px] flex flex-col">
          {/* Map Toolbar */}
          <div className="h-12 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-10 text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-slate-300">Peta Delineasi Interaktif</span>
              <label className="flex items-center space-x-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showDesaBoundaries}
                  onChange={(e) => setShowDesaBoundaries(e.target.checked)}
                  className="rounded border-slate-700 accent-emerald-500 cursor-pointer"
                />
                <span className="text-[11px]">Batas Desa/Kelurahan (43 Desa)</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => setMapBaseType('voyager')}
                  className={`px-2 py-0.5 text-[11px] rounded cursor-pointer ${
                    mapBaseType === 'voyager' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  Voyager
                </button>
                <button
                  onClick={() => setMapBaseType('satellite')}
                  className={`px-2 py-0.5 text-[11px] rounded cursor-pointer ${
                    mapBaseType === 'satellite' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  Citra
                </button>
                <button
                  onClick={() => setMapBaseType('dark')}
                  className={`px-2 py-0.5 text-[11px] rounded cursor-pointer ${
                    mapBaseType === 'dark' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setMapBaseType('osm')}
                  className={`px-2 py-0.5 text-[11px] rounded cursor-pointer ${
                    mapBaseType === 'osm' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  OSM
                </button>
              </div>
            </div>
          </div>

          {/* Map Leaflet Canvas */}
          <div ref={mapContainerRef} className="flex-1 w-full h-full z-0 bg-slate-950" />

          {/* Legend Overlay on Map */}
          <div className="absolute top-16 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs shadow-xl space-y-2 max-w-xs">
            <span className="font-bold text-white block text-[11px]">LEGENDA STATUS DELINEASI RDTR</span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#10b981] shrink-0 border border-white/20"></span>
                <span className="text-slate-200">RDTR Telah Ditetapkan (5 Kec)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#f59e0b] shrink-0 border border-white/20"></span>
                <span className="text-slate-200">WP Mojolaban (Delineasi Belum Ditentukan)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#f43f5e] shrink-0 border border-white/20"></span>
                <span className="text-slate-200">WP Baki (Delineasi Belum Ditentukan)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#06b6d4] shrink-0 border border-white/20"></span>
                <span className="text-slate-200">WP Gatak (Delineasi Belum Ditentukan)</span>
              </div>
              <div className="flex items-center space-x-2 pt-1 border-t border-slate-800">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#22c55e] shrink-0"></span>
                <span className="text-slate-300">Desa Masuk Delineasi ({activeScenario.shortName})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#e11d48] shrink-0"></span>
                <span className="text-slate-300">Desa Di Luar Delineasi Khusus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Village / Delineation Inspector Panel */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">
                  INSPEKTUR DESA & DELINEASI
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {selectedDesa ? `Desa ${selectedDesa.name}` : 'Pilih Desa pada Peta'}
                </h3>
              </div>
              {selectedDesa && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Kec. {selectedDesa.kecamatan}
                </span>
              )}
            </div>

            {selectedDesa ? (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Karakter Dominan Desa</span>
                  <p className="text-white font-medium">{selectedDesa.karakterSpasial}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Luas Wilayah</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {selectedDesa.areaHa} Ha
                    </span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Calon WP</span>
                    <span className="text-sm font-bold text-white">
                      WP {selectedDesa.kecamatan}
                    </span>
                  </div>
                </div>

                {/* Scenario Inclusion Status */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">
                    Status Masuk Delineasi:
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Skenario 1 (Administratif Penuh):</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-semibold">
                        MASUK (100%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Skenario 2 (Fungsional Perkotaan):</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          selectedDesa.delineationRecommendation.skenario2_fungsional_perkotaan
                            ? 'bg-emerald-950 text-emerald-300'
                            : 'bg-rose-950 text-rose-300'
                        }`}
                      >
                        {selectedDesa.delineationRecommendation.skenario2_fungsional_perkotaan
                          ? 'MASUK INTI'
                          : 'DI LUAR RDTR'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Skenario 3 (Aglomerasi Koridor):</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          selectedDesa.delineationRecommendation.skenario3_aglomerasi_lintas
                            ? 'bg-emerald-950 text-emerald-300'
                            : 'bg-rose-950 text-rose-300'
                        }`}
                      >
                        {selectedDesa.delineationRecommendation.skenario3_aglomerasi_lintas
                          ? 'MASUK KORIDOR'
                          : 'DI LUAR KORIDOR'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-sky-400 font-bold block uppercase tracking-wider">
                    Catatan Teknis Perencanaan RDTR:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {selectedDesa.catatanTeknis}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs">
                  Klik salah satu poligon desa di Kecamatan Mojolaban, Baki, atau Gatak pada peta untuk melihat profil teknis dan kesesuaian delineasi.
                </p>
              </div>
            )}
          </div>

          {/* Quick Scenario Notes */}
          <div className="bg-emerald-950/20 border border-emerald-800/40 p-3 rounded-xl text-[11px] text-slate-300 space-y-1">
            <span className="font-bold text-emerald-400 block text-xs">Dasar Hukum Penentuan Delineasi:</span>
            <p className="text-slate-400 leading-relaxed text-[10px]">
              {activeScenario.legalBasis}
            </p>
          </div>
        </div>
      </div>

      {/* Official Portal Web Modal (Iframe) */}
      {isPortalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="h-14 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">
                  Webportal Resmi Penyusunan RDTR Kec. Mojolaban, Baki, dan Gatak
                </span>
                <span className="text-xs text-slate-400 ml-2 font-mono">
                  (https://petainteraktif.github.io/rdtrsukoharjo/)
                </span>
              </div>
              <button
                onClick={() => setIsPortalModalOpen(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

            {/* Iframe */}
            <div className="flex-1 w-full h-full bg-slate-950">
              <iframe
                src="https://petainteraktif.github.io/rdtrsukoharjo/"
                title="Webportal RDTR Sukoharjo"
                className="w-full h-full border-none"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
