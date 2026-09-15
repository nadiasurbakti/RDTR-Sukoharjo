import React, { useState } from 'react';
import { GEE_SCRIPT_CODE } from '../data/geeScript';
import { Copy, Check, Download, ExternalLink, Code2, Terminal, BookOpen, Layers } from 'lucide-react';

export const GeeCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GEE_SCRIPT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([GEE_SCRIPT_CODE], { type: 'text/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'RDTR_Sukoharjo_GEE_Analysis_Mojolaban_Baki_Gatak.js');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    { id: 'all', title: 'Full Script (All 14 Sections)' },
    { id: '01. INPUTS', title: '01. Inputs & Global Config' },
    { id: '02. STUDY AREA', title: '02. Study Area (Mojolaban, Baki, Gatak)' },
    { id: '03. SATELLITE PREPROCESSING', title: '03. Sentinel-2 SR Preprocessing' },
    { id: '04. BASELINE COMPOSITES', title: '04. Multi-Temporal Composites' },
    { id: '05. SPECTRAL INDICES', title: '05. Spectral Indices (NDVI, NDWI, NDBI)' },
    { id: '06. BUILT-UP PROXY', title: '06. Built-Up Detection & Expansion' },
    { id: '07. PLANNING-ORIENTED LAND-COVER', title: '07. Supervised LULC (6 Classes)' },
    { id: '08. LAND-COVER CHANGE MATRIX', title: '08. Change Matrix & Agri Conversion' },
    { id: '09. DEVELOPMENT PRESSURE INDEX', title: '09. Development Pressure Index (DPI)' },
    { id: '10. ENVIRONMENTAL CONSTRAINTS', title: '10. Environmental & Flood Constraints' },
    { id: '11. SPATIAL CHARACTERISATION TYPOLOGY', title: '11. Spatial Planning Typology (8 Types)' },
    { id: '12. COMPREHENSIVE STATISTICAL CALCULATOR', title: '12. Area Reducers & Statistics (Ha)' },
    { id: '13. MAP DISPLAY', title: '13. Map Layers & Cartography' },
    { id: '14. EXPORT TASKS', title: '14. GeoTIFF & CSV Export Tasks' },
  ];

  return (
    <div className="space-y-6 text-slate-800">
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200">
                OUTPUT 1: GEE SCRIPT
              </span>
              <span className="text-xs text-slate-500 font-medium">Google Earth Engine Code Editor (JavaScript)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1.5 flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-blue-800" />
              <span>Modular & Executable GEE JavaScript Architecture</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Strictly adheres to all 14 structured modules. Integrates <code className="text-blue-900 bg-blue-50 px-1 py-0.5 rounded font-mono text-xs">COPERNICUS/S2_SR_HARMONIZED</code> with QA60 and SCL cloud masking, Random Forest supervised classification, multi-temporal transition reducers (2015-2020-2025), and batch GeoTIFF exports for Bappeda Sukoharjo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Script GEE'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-700" />
              <span>Unduh .js</span>
            </button>

            <a
              href="https://code.earthengine.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-slate-500" />
              <span>Buka GEE Editor</span>
            </a>
          </div>
        </div>

        {/* Quick Navigation Filter */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
            <Terminal className="w-3.5 h-3.5 text-blue-700" />
            <span>Loncat ke Bagian:</span>
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-white text-xs text-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-blue-700 max-w-xs shadow-2xs"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Cari fungsi / variabel dalam script..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white text-xs text-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-blue-700 w-64 placeholder:text-slate-400 shadow-2xs"
          />
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xs">
        <div className="h-10 px-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="font-mono text-xs text-slate-300 ml-2 font-medium">RDTR_Sukoharjo_GEE_Workflow.js</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
            <span>JavaScript (GEE API)</span>
            <span>435 Baris</span>
            <span>UTF-8</span>
          </div>
        </div>

        <div className="p-4 overflow-x-auto max-h-[640px] overflow-y-auto font-mono text-xs leading-relaxed text-slate-200 select-text bg-slate-900">
          <pre className="text-slate-200">
            {GEE_SCRIPT_CODE}
          </pre>
        </div>
      </div>

      {/* Execution Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center space-x-2 text-blue-900 font-semibold text-xs">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>1. Salin & Tempel di GEE</span>
          </div>
          <p className="text-xs text-slate-600">
            Buka <span className="text-slate-900 font-mono font-semibold">code.earthengine.google.com</span>, buat Script baru, lalu tempelkan seluruh kode di atas.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center space-x-2 text-sky-900 font-semibold text-xs">
            <Layers className="w-4 h-4 text-sky-700" />
            <span>2. Verifikasi Batas Administrasi</span>
          </div>
          <p className="text-xs text-slate-600">
            Script telah menyertakan koordinat boundary resmi Mojolaban, Baki, dan Gatak. Anda juga dapat menautkan Shapefile dari Ina-Geoportal BIG.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs">
            <Download className="w-4 h-4 text-amber-700" />
            <span>3. Eksekusi Tasks di GEE</span>
          </div>
          <p className="text-xs text-slate-600">
            Buka tab <span className="text-slate-900 font-semibold">Tasks</span> di panel kanan GEE dan klik <span className="text-amber-700 font-semibold">Run</span> untuk mengekspor GeoTIFF (10m) dan CSV ke Google Drive Anda.
          </p>
        </div>
      </div>
    </div>
  );
};
