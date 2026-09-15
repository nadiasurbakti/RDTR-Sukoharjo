import React, { useState } from 'react';
import { GEE_SCRIPT_CODE } from '../data/geeScript';
import { WP_GEOJSON_BOUNDARIES } from '../data/spatialData';
import { Download, FileCode, FileSpreadsheet, Map, X, Check, Copy } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedCli, setCopiedCli] = useState(false);

  if (!isOpen) return null;

  const downloadJs = () => {
    const blob = new Blob([GEE_SCRIPT_CODE], { type: 'text/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'RDTR_Sukoharjo_GEE_Workflow.js');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadGeoJSON = (wp: 'mojolaban' | 'baki' | 'gatak' | 'all') => {
    let dataToExport: unknown;
    let filename = '';

    if (wp === 'all') {
      dataToExport = {
        type: 'FeatureCollection',
        features: [
          WP_GEOJSON_BOUNDARIES.mojolaban,
          WP_GEOJSON_BOUNDARIES.baki,
          WP_GEOJSON_BOUNDARIES.gatak,
        ],
      };
      filename = 'Batas_Administrasi_3WP_Sukoharjo.geojson';
    } else {
      dataToExport = WP_GEOJSON_BOUNDARIES[wp];
      filename = `Batas_Administrasi_${wp}_Sukoharjo.geojson`;
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const geeCliCommand = `earthengine upload table --asset_id=users/sukoharjo_rdtr/batas_wp_mojolaban_baki_gatak Batas_Administrasi_3WP_Sukoharjo.geojson`;

  const copyCli = async () => {
    await navigator.clipboard.writeText(geeCliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-6 relative text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              PUSAT EKSPOR SPASIAL & SCRIPT
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Ekspor Dataset & Script RDTR Sukoharjo</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Unduh file dalam format GIS standar (JavaScript GEE, GeoJSON WGS84, CSV Tabular).
          </p>
        </div>

        {/* Export Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: GEE Script */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
              <FileCode className="w-4 h-4 text-blue-700" />
              <span>Script Google Earth Engine (.js)</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Script lengkap 14 modul analitis siap eksekusi di Google Earth Engine Code Editor.
            </p>
            <button
              onClick={downloadJs}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Script GEE (.js)</span>
            </button>
          </div>

          {/* Card 2: GeoJSON Boundaries */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-sky-900 font-bold text-xs">
              <Map className="w-4 h-4 text-sky-700" />
              <span>Batas Vektor Administrasi (GeoJSON)</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Poligon batas resmi Mojolaban, Baki, dan Gatak dengan proyeksi EPSG:4326 (WGS84).
            </p>
            <button
              onClick={() => downloadGeoJSON('all')}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Unduh GeoJSON (3 WP)</span>
            </button>
          </div>
        </div>

        {/* GEE CLI Helper */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Perintah CLI GEE Upload Asset (Opsional):</span>
            <button
              onClick={copyCli}
              className="flex items-center space-x-1 text-blue-700 hover:text-blue-900 text-[11px] font-mono font-medium cursor-pointer"
            >
              {copiedCli ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCli ? 'Tersalin' : 'Salin Perintah'}</span>
            </button>
          </div>
          <code className="block font-mono text-[11px] text-slate-800 bg-white p-2 rounded border border-slate-200 overflow-x-auto">
            {geeCliCommand}
          </code>
        </div>
      </div>
    </div>
  );
};
