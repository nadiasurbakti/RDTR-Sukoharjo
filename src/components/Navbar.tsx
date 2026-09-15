import React from 'react';
import { Layers, Map, Code2, FileCheck, BarChart2, Download, Scale, Landmark } from 'lucide-react';

export type ActiveNavView = 'map' | 'regulatory' | 'delineation' | 'deliverables' | 'modules' | 'matrix' | 'gee';

interface NavbarProps {
  activeView: ActiveNavView;
  onSelectView: (view: ActiveNavView) => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onSelectView, onOpenExport }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Formal Government Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center shadow-md border border-blue-800/20">
            <Landmark className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                PEMKAB SUKOHARJO
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 hidden sm:inline">
                Sistem Informasi RDTR 3 WP
              </span>
              <span className="text-[10px] text-amber-800 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 hidden md:inline">
                SK Bupati 600.3/342/2026 (Grogol Eksisting)
              </span>
            </div>
            <h1 className="text-sm md:text-base font-bold text-slate-900 tracking-tight mt-0.5">
              Preliminary Analysis (Desk Study) RDTR Sukoharjo (Mojolaban, Baki, dan Gatak)
            </h1>
          </div>
        </div>

        {/* View Switcher Navigation (Formal Light Mode) */}
        <nav className="hidden xl:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => onSelectView('map')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'map'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            <span>Peta Tematik & Jaringan Riil</span>
          </button>

          <button
            onClick={() => onSelectView('regulatory')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'regulatory'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-blue-700" />
            <span>KAK & 15 Regulasi RDTR</span>
          </button>

          <button
            onClick={() => onSelectView('delineation')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'delineation'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-amber-600" />
            <span>Katalog Skenario WP</span>
          </button>

          <button
            onClick={() => onSelectView('deliverables')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'deliverables'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>8 Sasaran KAK & Output 2-4</span>
          </button>

          <button
            onClick={() => onSelectView('modules')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'modules'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>16 Modul Analisis</span>
          </button>

          <button
            onClick={() => onSelectView('matrix')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'matrix'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Matriks Komparasi</span>
          </button>

          <button
            onClick={() => onSelectView('gee')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'gee'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Script GEE (Output 1)</span>
          </button>
        </nav>

        {/* Action button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>Pusat Unduhan Data</span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Scroll Nav */}
      <div className="xl:hidden flex items-center space-x-1 border-t border-slate-200 py-2 px-3 bg-slate-50 text-xs overflow-x-auto">
        <button
          onClick={() => onSelectView('map')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'map' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          Peta Tematik
        </button>
        <button
          onClick={() => onSelectView('regulatory')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'regulatory' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          KAK & 15 Regulasi
        </button>
        <button
          onClick={() => onSelectView('delineation')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'delineation' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          Skenario WP
        </button>
        <button
          onClick={() => onSelectView('deliverables')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'deliverables' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          8 Sasaran KAK
        </button>
        <button
          onClick={() => onSelectView('modules')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'modules' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          16 Modul
        </button>
        <button
          onClick={() => onSelectView('matrix')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'matrix' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          Matriks
        </button>
        <button
          onClick={() => onSelectView('gee')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${activeView === 'gee' ? 'bg-white text-blue-900 font-bold border border-slate-200 shadow-xs' : 'text-slate-600'}`}
        >
          Script GEE
        </button>
      </div>
    </header>
  );
};
