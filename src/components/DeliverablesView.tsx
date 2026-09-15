import React, { useState } from 'react';
import { DATA_METHOD_TABLE, SPATIAL_CHARACTER_TABLE, RDTR_PLANNING_INTERPRETATION } from '../data/planningInterpretation';
import { WP_STATISTICS } from '../data/spatialData';
import { KAK_FRAMEWORK } from '../data/kakData';
import { 
  Database, 
  FileSpreadsheet, 
  MapPin, 
  Compass, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Download,
  Target,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

export const DeliverablesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sasaran_kak' | 'output4' | 'output3' | 'output2'>('sasaran_kak');
  const [activeWpDetail, setActiveWpDetail] = useState<'mojolaban' | 'baki' | 'gatak'>('baki');

  const exportTableAsCSV = (type: 'data_method' | 'spatial_character') => {
    let csvContent = '';
    if (type === 'data_method') {
      csvContent = 'Analisis,Dataset,Resolusi,Periode,Metode,Output,Kegunaan Perencanaan RDTR\n' +
        DATA_METHOD_TABLE.map(r => `"${r.analysis}","${r.dataset}","${r.resolution}","${r.period}","${r.method.replace(/"/g, '""')}","${r.output}","${r.planningUtility.replace(/"/g, '""')}"`).join('\n');
    } else {
      csvContent = 'Wilayah Perencanaan,Bukti Spasial (Indikator),Pola Spasial,Tekanan Utama,Implikasi Perencanaan,Tema Awal RDTR\n' +
        SPATIAL_CHARACTER_TABLE.map(r => `"${r.wp}","${r.evidence.replace(/"/g, '""')}","${r.spatialPattern.replace(/"/g, '""')}","${r.mainPressure.replace(/"/g, '""')}","${r.planningImplication.replace(/"/g, '""')}","${r.preliminaryTheme}"`).join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RDTR_Sukoharjo_${type}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Deliverable Nav Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/90 p-2 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('sasaran_kak')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'sasaran_kak'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Target className="w-4 h-4 text-amber-300" />
            <span>Sasaran KAK (8 Dokumen)</span>
          </button>

          <button
            onClick={() => setActiveTab('output4')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'output4'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>OUTPUT 4: Interpretasi & Tema RDTR</span>
          </button>

          <button
            onClick={() => setActiveTab('output3')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'output3'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>OUTPUT 3: Tabel Karakterisasi Spasial</span>
          </button>

          <button
            onClick={() => setActiveTab('output2')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'output2'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>OUTPUT 2: Tabel Data & Metodologi</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 pr-2">
          {activeTab !== 'sasaran_kak' && (
            <button
              onClick={() => exportTableAsCSV(activeTab === 'output2' ? 'data_method' : 'spatial_character')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg border border-slate-200 transition-colors font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Ekspor CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB: SASARAN KAK (8 DOKUMEN KELUARAN) */}
      {activeTab === 'sasaran_kak' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    MATRIKS KESESUAIAN OUTPUT KAK
                  </span>
                  <span className="text-xs text-slate-500">Pekerjaan Swakelola</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Ketercapaian 8 Sasaran Dokumen Sesuai Kerangka Acuan Kerja (KAK)
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
                  Pekerjaan ini dimaksudkan membantu pemerintah daerah dalam percepatan penyusunan RDTR sebagai dasar pemberian izin dan kemudahan berinvestasi. Berikut status penyediaan 8 sasaran keluaran teknis dan ranperkada:
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-center">
                  <div className="text-xs font-semibold text-emerald-800">Status Capaian</div>
                  <div className="text-sm font-bold text-emerald-950">8 / 8 Sasaran Terintegrasi</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KAK_FRAMEWORK.sasaran.items.map((item) => (
                <div 
                  key={item.letter}
                  className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-2 hover:bg-white hover:border-blue-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                        {item.letter}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-9">
                    {item.description}
                  </p>

                  <div className="pl-9 pt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] border-t border-slate-200/60 mt-2">
                    <span className="text-slate-500 font-medium">Modul Sistem:</span>
                    <span className="font-mono font-semibold text-blue-950 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.appLocation}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Maksud, Tujuan & Ruang Lingkup Quick Reference Box */}
            <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                  MAKSUD & TUJUAN UTAMA
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Maksud:</strong> Percepatan penyusunan RDTR sebagai dasar pemberian izin dan kemudahan berinvestasi.
                  <br />
                  <strong>Tujuan:</strong> Penyusunan materi teknis dan ranperkada 3 (Tiga) RDTR di Kabupaten Sukoharjo (WP Mojolaban, WP Baki, WP Gatak).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OUTPUT 4: RDTR PLANNING INTERPRETATION */}
      {activeTab === 'output4' && (
        <div className="space-y-6">
          {/* Sub-selector for WPs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                { id: 'mojolaban', label: 'WP Kecamatan Mojolaban', character: 'Agro-Urban & Riverine Interface', badge: 'DPI 68.4' },
                { id: 'baki', label: 'WP Kecamatan Baki', character: 'Peri-Urban Spillover Core', badge: 'DPI 89.2' },
                { id: 'gatak', label: 'WP Kecamatan Gatak', character: 'Agro-Industrial Craft Cluster', badge: 'DPI 61.8' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveWpDetail(item.id)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  activeWpDetail === item.id
                    ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{item.label}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{item.character}</p>
              </button>
            ))}
          </div>

          {/* Detailed Interpretation Dossier */}
          {(() => {
            const data = RDTR_PLANNING_INTERPRETATION[activeWpDetail];
            const stats = WP_STATISTICS[activeWpDetail];

            return (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-8">
                {/* Header Profile */}
                <div className="border-b border-slate-200 pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        DOSIR TEKNIS RDTR KABUPATEN SUKOHARJO
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Kode BPS: {stats.bpsCode}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.wpName}</h3>
                    <p className="text-sm text-slate-700 mt-1 max-w-3xl">
                      <span className="text-blue-900 font-semibold">Karakter Spasial Terkonfirmasi:</span>{' '}
                      {data.spatialCharacter}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shrink-0 text-right">
                    <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-semibold">
                      TEMA PENGEMBANGAN RDTR
                    </span>
                    <span className="text-sm font-bold text-amber-700 max-w-xs block mt-0.5">
                      "{data.planningTheme}"
                    </span>
                  </div>
                </div>

                {/* Evidence Trajectory: 2015 -> 2025 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium block">Total Luas Wilayah</span>
                    <span className="text-xl font-mono font-bold text-slate-900 mt-0.5 block">{stats.totalAreaHa} Ha</span>
                    <span className="text-[11px] text-slate-500">100% Wilayah Perencanaan</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-rose-700 font-medium block">Lahan Terbangun (2025)</span>
                    <span className="text-xl font-mono font-bold text-rose-700 mt-0.5 block">
                      {stats.builtUp2025Ha} Ha
                    </span>
                    <span className="text-[11px] text-rose-600">
                      +{stats.builtUpGrowthHa} Ha (+{stats.builtUpGrowthPct.toFixed(1)}% vs 2015)
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-amber-700 font-medium block">Konversi Sawah (2015-2025)</span>
                    <span className="text-xl font-mono font-bold text-amber-700 mt-0.5 block">
                      {stats.agriConversionHa} Ha
                    </span>
                    <span className="text-[11px] text-amber-600">
                      {stats.agriConversionPct.toFixed(1)}% sawah awal hilang
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-sky-700 font-medium block">Kendala Lingkungan / Banjir</span>
                    <span className="text-xl font-mono font-bold text-sky-700 mt-0.5 block">
                      {stats.environmentalConstraintHa} Ha
                    </span>
                    <span className="text-[11px] text-sky-600">
                      {stats.environmentalConstraintPct.toFixed(1)}% luas WP sensitif
                    </span>
                  </div>
                </div>

                {/* Section A - E Planning Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* B. Main Transformation */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                      <ChevronRight className="w-4 h-4" />
                      <span>B. Dinamika Transformasi Spasial (2015 - 2025)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{data.mainTransformation}</p>
                  </div>

                  {/* C. Main Spatial Pressure */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4" />
                      <span>C. Titik Tekanan Perkembangan Utama</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{data.mainSpatialPressure}</p>
                  </div>

                  {/* D. Key Spatial Assets */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>D. Aset Spasial Kunci (Wajib Dilindungi)</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {data.keySpatialAssets.map((asset, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{asset}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* E. Key Constraints */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>E. Kendala Lingkungan & Pembatas Ruang</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {data.keyConstraints.map((constraint, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sub-Zoning Recommendations (Rencana Pola Ruang) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-700" />
                      <span>Rekomendasi Alokasi Sub-Zona Pola Ruang RDTR</span>
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">Standar Permen ATR/BPN No. 11/2021</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-28">Kode Sub-Zona</th>
                          <th className="p-3 w-64">Nama Sub-Zona</th>
                          <th className="p-3 w-24 text-right">Alokasi (%)</th>
                          <th className="p-3">Arahan Teknis Pengendalian Pemanfaatan Ruang</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {data.recommendedSubZoning.map((zone, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 font-mono font-bold text-blue-900">{zone.zoneCode}</td>
                            <td className="p-3 font-semibold text-slate-900">{zone.zoneName}</td>
                            <td className="p-3 font-mono text-right font-bold text-slate-800">{zone.areaPct}%</td>
                            <td className="p-3 text-slate-600">{zone.guidelines}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ITBX Directives Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-700" />
                      <span>Ketentuan Khusus Kegiatan (Matriks ITBX)</span>
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">Izin (I) / Terbatas (T) / Bersyarat (B) / Dilarang (X)</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-52">Jenis Kegiatan / Pemanfaatan</th>
                          <th className="p-3 w-40">I (Diizinkan)</th>
                          <th className="p-3 w-40">T (Terbatas)</th>
                          <th className="p-3 w-48">B (Bersyarat)</th>
                          <th className="p-3 w-40 text-rose-700 font-bold">X (Dilarang)</th>
                          <th className="p-3">Catatan Ketentuan Teknis</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {data.itbxDirectives.map((rule, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 font-semibold text-slate-900">{rule.activity}</td>
                            <td className="p-3 text-emerald-700 font-medium">{rule.i}</td>
                            <td className="p-3 text-amber-700 font-medium">{rule.t}</td>
                            <td className="p-3 text-sky-700 font-medium">{rule.b}</td>
                            <td className="p-3 text-rose-700 font-bold">{rule.x}</td>
                            <td className="p-3 text-slate-600">{rule.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* OUTPUT 3: SPATIAL CHARACTERIZATION TABLE */}
      {activeTab === 'output3' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                OUTPUT 3: TABEL KARAKTERISASI SPASIAL
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Sintesis Bukti Spasial & Implikasi Perencanaan RDTR 3 WP
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Pengujian hipotesis awal perencanaan berbasis pembuktian analitis remote sensing 2015 - 2025.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-40">Wilayah Perencanaan</th>
                  <th className="p-3 w-72">Bukti Spasial (Indikator Terukur)</th>
                  <th className="p-3 w-64">Pola Spasial Nyata</th>
                  <th className="p-3 w-64">Tekanan Utama</th>
                  <th className="p-3">Implikasi & Arahan Perencanaan RDTR</th>
                  <th className="p-3 w-48 text-amber-700 font-bold">Tema Awal RDTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {SPATIAL_CHARACTER_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 align-top transition-colors">
                    <td className="p-3 font-bold text-slate-900">{row.wp}</td>
                    <td className="p-3 text-slate-700 leading-relaxed">{row.evidence}</td>
                    <td className="p-3 text-slate-700 leading-relaxed">{row.spatialPattern}</td>
                    <td className="p-3 text-rose-700 leading-relaxed font-medium">{row.mainPressure}</td>
                    <td className="p-3 text-slate-700 leading-relaxed">{row.planningImplication}</td>
                    <td className="p-3 font-bold text-amber-800">{row.preliminaryTheme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OUTPUT 2: DATA & METHOD TABLE */}
      {activeTab === 'output2' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                OUTPUT 2: TABEL DATA & METODOLOGI
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Spesifikasi Teknis Citra Satelit, Algoritma, & Derivasi Indikator Spasial
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Alur analisis data citra satelit Sentinel-2 SR Harmonized & USGS SRTM 30m sesuai kaidah remote sensing saintifik.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-56">Modul Analisis</th>
                  <th className="p-3 w-48">Dataset Sumber</th>
                  <th className="p-3 w-28">Resolusi</th>
                  <th className="p-3 w-28">Periode</th>
                  <th className="p-3 w-80">Metodologi & Formula</th>
                  <th className="p-3 w-56">Output Produk</th>
                  <th className="p-3">Kegunaan Teknis Perencanaan RDTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {DATA_METHOD_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 align-top transition-colors">
                    <td className="p-3 font-bold text-blue-900">{row.analysis}</td>
                    <td className="p-3 text-slate-700 font-mono text-[11px]">{row.dataset}</td>
                    <td className="p-3 text-slate-700">{row.resolution}</td>
                    <td className="p-3 text-slate-700 font-mono text-[11px]">{row.period}</td>
                    <td className="p-3 text-slate-600 leading-relaxed">{row.method}</td>
                    <td className="p-3 text-sky-800 font-semibold">{row.output}</td>
                    <td className="p-3 text-slate-700 leading-relaxed">{row.planningUtility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
