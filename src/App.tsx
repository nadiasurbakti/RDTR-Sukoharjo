import React, { useState } from 'react';
import { WPId } from './types';
import { Navbar, ActiveNavView } from './components/Navbar';
import { DelineationMapStudio } from './components/DelineationMapStudio';
import { MapStudio } from './components/MapStudio';
import { RegulatoryThematicView } from './components/RegulatoryThematicView';
import { DeliverablesView } from './components/DeliverablesView';
import { GeeCodeViewer } from './components/GeeCodeViewer';
import { AnalysisModulesView } from './components/AnalysisModulesView';
import { ComparativeMatrixView } from './components/ComparativeMatrixView';
import { ExportModal } from './components/ExportModal';
import { Landmark, Scale, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveNavView>('map');
  const [selectedWp, setSelectedWp] = useState<WPId>('all');
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Formal Navigation */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Core View Router */}
        {activeView === 'map' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Context Headline (Formal Light Theme) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    PETA TEMATIK KARTOGRAFIS RDTR RESMI
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Kabupaten Sukoharjo • Multi-Temporal 2015 → 2020 → 2025
                  </span>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Batas Perbatasan: RDTR Eksisting Grogol (SK Bupati 600.3/342/2026)
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1.5 tracking-tight">
                  Eksplorasi Spasial Multi-Temporal & Infrastruktur Riil: WP Mojolaban, WP Baki, dan WP Gatak
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Prinsip utama: <strong className="text-blue-900 font-semibold">Evidence Before Interpretation</strong>. 
                  Seluruh jaringan jalan arteri, kolektor, lokal, rel KRL Solo-Yogyakarta, serta garis sempadan sungai Bengawan Solo (100m) dipetakan berdasarkan koordinat kondisi riil dan didasari hierarki 15 regulasi tata ruang yang berlaku.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setActiveView('regulatory')}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-300" />
                  <span>15 Dasar Regulasi</span>
                </button>
                <button
                  onClick={() => setActiveView('deliverables')}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition-all"
                >
                  <span>Output 2 - 4</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Interactive Leaflet & Cartography Studio */}
            <MapStudio
              selectedWp={selectedWp}
              onSelectWp={setSelectedWp}
            />
          </div>
        )}

        {/* 15 Legal Regulations & WP Thematic Determination View */}
        {activeView === 'regulatory' && (
          <div className="animate-in fade-in duration-300">
            <RegulatoryThematicView />
          </div>
        )}

        {/* Delineation Map View (Official Portal Baseline) */}
        {activeView === 'delineation' && (
          <div className="animate-in fade-in duration-300">
            <DelineationMapStudio />
          </div>
        )}

        {activeView === 'deliverables' && (
          <div className="animate-in fade-in duration-300">
            <DeliverablesView />
          </div>
        )}

        {activeView === 'gee' && (
          <div className="animate-in fade-in duration-300">
            <GeeCodeViewer />
          </div>
        )}

        {activeView === 'modules' && (
          <div className="animate-in fade-in duration-300">
            <AnalysisModulesView />
          </div>
        )}

        {activeView === 'matrix' && (
          <div className="animate-in fade-in duration-300">
            <ComparativeMatrixView />
          </div>
        )}
      </main>

      {/* Formal Government Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <div className="flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-blue-900" />
            <span className="font-medium text-slate-800">
              Pemerintah Kabupaten Sukoharjo — Dokumen Perencanaan Rencana Detail Tata Ruang (RDTR)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-500">
            <span>SRGI2013 / UTM 49S</span>
            <span>•</span>
            <span>Sentinel-2 L2A & SRTM DEM</span>
            <span>•</span>
            <span className="text-blue-900 font-semibold">SK Bupati 600.3/342/2026</span>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
