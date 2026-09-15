import React, { useState } from 'react';
import { ANALYSIS_MODULES } from '../data/planningInterpretation';
import { WP_STATISTICS } from '../data/spatialData';
import { AnalysisModule } from '../types';
import { BookOpen, CheckCircle, Code, Layers, Activity, Filter } from 'lucide-react';

export const AnalysisModulesView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Baseline', 'Biophysical', 'Urban Dynamics', 'Spatial Planning'];

  const filteredModules = filterCategory === 'All'
    ? ANALYSIS_MODULES
    : ANALYSIS_MODULES.filter((m) => m.category === filterCategory);

  const currentMod = ANALYSIS_MODULES.find((m) => m.number === selectedModule) || ANALYSIS_MODULES[0];

  return (
    <div className="space-y-6 text-slate-800">
      {/* Category Tabs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/90 p-4 rounded-2xl shadow-xs">
        <div>
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            ARSITEKTUR ANALITIS 16 MODUL
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">16 Modul Analisis Spasial Berbasis Pembuktian (GEE)</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Setiap modul dirancang independen, dapat diaudit, dan menghasilkan parameter teknis terukur untuk penyusunan RDTR.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <Filter className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterCategory === cat
                  ? 'bg-white text-blue-950 font-bold shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Sidebar List */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredModules.map((mod) => {
            const isSelected = mod.number === selectedModule;
            return (
              <button
                key={mod.number}
                onClick={() => setSelectedModule(mod.number)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isSelected
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {mod.number.toString().padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-blue-800 uppercase">{mod.code}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{mod.category}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 truncate mt-0.5">{mod.title}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{mod.titleId}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Deep-Dive Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {currentMod.code}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {currentMod.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1.5">{currentMod.title}</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{currentMod.titleId}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Fungsi GEE</span>
              <code className="text-xs font-mono text-blue-900 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 block mt-0.5 font-semibold">
                {currentMod.geeFunction}
              </code>
            </div>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentMod.keyMetrics.map((metric, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">{metric.label}</span>
                <span className="text-sm font-mono font-bold text-blue-900 mt-0.5 block">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Description & Methodology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-900 flex items-center space-x-1.5 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Deskripsi & Tujuan Analisis</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">{currentMod.description}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-800 flex items-center space-x-1.5 uppercase tracking-wider">
                <Code className="w-3.5 h-3.5" />
                <span>Formulasi & Metodologi Sensor</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">{currentMod.methodology}</p>
            </div>
          </div>

          {/* Dataset Specifications */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Primary Earth Engine Asset</span>
              <span className="text-xs font-mono text-slate-800 mt-0.5 block font-semibold">{currentMod.primaryDataset}</span>
            </div>
            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Resolusi Spasial Grid</span>
              <span className="text-xs font-mono text-blue-900 mt-0.5 block font-bold">{currentMod.resolution}</span>
            </div>
          </div>

          {/* Planning Utility Card */}
          <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-xl space-y-2">
            <span className="text-xs font-bold text-blue-900 flex items-center space-x-1.5 uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-blue-700" />
              <span>Relevansi & Utilitas Teknis Bagi Dokumen RDTR Sukoharjo</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">{currentMod.planningRelevance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
