import React, { useState } from 'react';
import { GEE_MODULES_MAP_METADATA, GeeModuleMapMeta } from '../data/landUseChangeData';
import { LayerMode } from '../types';
import { X, Layers, Satellite, Check, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface GeeModulesSelectorModalProps {
  isOpen: boolean;
  activeLayer: LayerMode;
  onClose: () => void;
  onSelectModule: (layerMode: LayerMode, moduleMeta: GeeModuleMapMeta) => void;
}

export const GeeModulesSelectorModal: React.FC<GeeModulesSelectorModalProps> = ({
  isOpen,
  activeLayer,
  onClose,
  onSelectModule,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Baseline', 'Biophysical', 'Urban Dynamics', 'Spatial Planning'];

  const filteredModules =
    selectedCategory === 'All'
      ? GEE_MODULES_MAP_METADATA
      : GEE_MODULES_MAP_METADATA.filter((m) => m.category === selectedCategory);

  const getLayerModeForModule = (m: GeeModuleMapMeta): LayerMode => {
    if (m.number === 7) return 'lulc';
    if (m.number === 8) return 'change_detection';
    if (m.number === 9) return 'development_pressure';
    if (m.number === 4) return 'built_up';
    if (m.number === 2) return 'ndvi';
    if (m.number === 3) return 'ndwi';
    if (m.number === 10) return 'road_buffers';
    if (m.number === 15) return 'environmental';
    if (m.number === 16) return 'typology';
    
    // Generic fallback mapping to specific gee mode
    const numStr = m.number < 10 ? `0${m.number}` : `${m.number}`;
    return `gee_m${numStr}` as LayerMode;
  };

  const isModuleActive = (m: GeeModuleMapMeta) => {
    const mode = getLayerModeForModule(m);
    return activeLayer === mode || activeLayer === `gee_m${m.number < 10 ? `0${m.number}` : m.number}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                GOOGLE EARTH ENGINE (GEE) INTELLIGENCE
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Katalog 16 Modul Analisis Spasial & Alih Fungsi Lahan
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center space-x-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'All' ? 'Semua (16 Modul)' : cat}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Resolusi: 10m Sentinel-2 SR | Periode: 2015-2025
          </div>
        </div>

        {/* Modules Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5 text-slate-800">
          {filteredModules.map((m) => {
            const active = isModuleActive(m);
            const targetMode = getLayerModeForModule(m);

            return (
              <div
                key={m.code}
                onClick={() => {
                  onSelectModule(targetMode, m);
                  onClose();
                }}
                className={`group relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/30 shadow-md'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                        {m.code}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-700 uppercase">{m.category}</span>
                    </div>
                    {active ? (
                      <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        <span>Sedang Aktif di Peta</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 group-hover:text-blue-600 flex items-center space-x-0.5 font-medium">
                        <span>Aktifkan</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {m.number}. {m.titleId}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono italic mt-0.5 mb-2">{m.title}</p>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{m.planningUtility}</p>
                </div>

                {/* Metadata tags */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                    {m.spatialResolution} • {m.primaryDataset.split(' ')[0]}
                  </span>
                  <span className="font-semibold text-emerald-700">{m.accuracyMetric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="text-slate-500 text-[11px]">
            Klik pada salah satu kartu modul untuk memvisualisasikan overlay spasial langsung di atas 43 batas desa 3 WP.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
