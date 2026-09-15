import React from 'react';
import { LandChangeHotspot } from '../data/landUseChangeData';
import { X, AlertTriangle, ShieldCheck, MapPin, Satellite, TrendingDown, Building, ExternalLink } from 'lucide-react';

interface LandChangeHotspotModalProps {
  hotspot: LandChangeHotspot | null;
  onClose: () => void;
  onJumpToView?: (wpId: 'mojolaban' | 'baki' | 'gatak') => void;
}

export const LandChangeHotspotModal: React.FC<LandChangeHotspotModalProps> = ({
  hotspot,
  onClose,
  onJumpToView,
}) => {
  if (!hotspot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-xs"
              style={{ backgroundColor: hotspot.color }}
            >
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  HOTSPOT ALIH FUNGSI LAHAN GEE
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase"
                  style={{ backgroundColor: hotspot.color }}
                >
                  {hotspot.wpId.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{hotspot.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-slate-800 text-xs">
          {/* Transition Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">
                Kategori Transisi Spasial (2015 → 2025)
              </span>
              <span className="text-sm font-bold text-blue-950 mt-0.5 block">{hotspot.labelTransisi}</span>
            </div>
            <div className="text-right pl-4 border-l border-blue-200">
              <span className="text-[10px] text-blue-700 font-bold uppercase block">Luas Klaster</span>
              <span className="text-lg font-extrabold text-blue-900 font-mono">{hotspot.areaHa} Ha</span>
            </div>
          </div>

          {/* Sentinel-2 GEE Evidence Box */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <Satellite className="w-4 h-4 text-indigo-600" />
              <span className="text-xs uppercase tracking-wider">Bukti Penginderaan Jauh (Sentinel-2 Harmonized)</span>
            </div>
            <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 shadow-inner">
              {hotspot.geeEvidence}
            </div>
          </div>

          {/* Impact Analysis */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-rose-700 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span className="text-xs uppercase tracking-wider">Dampak Lingkungan, Infrastruktur & Kedaulatan Pangan</span>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-rose-950 leading-relaxed text-[11px]">
              {hotspot.impactAnalysis}
            </div>
          </div>

          {/* RDTR Zoning Direction */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs uppercase tracking-wider">Arahan Regulasi & Materi Teknis RDTR</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-emerald-950 leading-relaxed text-[11px]">
              {hotspot.zoningRecommendation}
            </div>
          </div>

          {/* Location details */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-200">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Titik Pusat: {hotspot.centerCoordinates[0]}°, {hotspot.centerCoordinates[1]}°</span>
            </div>
            <span className="font-semibold text-slate-700">{hotspot.kecamatan}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Terverifikasi melalui komputasi cloud Google Earth Engine 2015-2025
          </span>
          <div className="flex items-center space-x-2">
            {onJumpToView && (
              <button
                onClick={() => {
                  onJumpToView(hotspot.wpId);
                  onClose();
                }}
                className="px-3 py-1.5 bg-blue-900 text-white rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors"
              >
                Fokus Wilayah WP ({hotspot.wpId.toUpperCase()})
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg font-semibold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
