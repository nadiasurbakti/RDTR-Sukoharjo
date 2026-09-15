import React from 'react';
import { WP_STATISTICS, TOTAL_STUDY_AREA } from '../data/spatialData';
import { BarChart3, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export const ComparativeMatrixView: React.FC = () => {
  const m = WP_STATISTICS.mojolaban;
  const b = WP_STATISTICS.baki;
  const g = WP_STATISTICS.gatak;

  const exportComparativeCSV = () => {
    const csvContent = `Indikator Spasial,Mojolaban,Baki,Gatak,Metodologi Perhitungan
Luas Total (Ha),${m.totalAreaHa},${b.totalAreaHa},${g.totalAreaHa},Batas Administrasi BIG / BPS Sukoharjo
Lahan Terbangun 2015 (Ha),${m.builtUp2015Ha},${b.builtUp2015Ha},${g.builtUp2015Ha},S2 SR NDBI+UI Composite 2015
Lahan Terbangun 2025 (Ha),${m.builtUp2025Ha},${b.builtUp2025Ha},${g.builtUp2025Ha},S2 SR NDBI+UI Composite 2025
Persentase Terbangun 2025 (%),${((m.builtUp2025Ha / m.totalAreaHa) * 100).toFixed(1)}%,${((b.builtUp2025Ha / b.totalAreaHa) * 100).toFixed(1)}%,${((g.builtUp2025Ha / g.totalAreaHa) * 100).toFixed(1)}%,(Terbangun 2025 / Luas Total) * 100
Pertumbuhan Terbangun (Ha),+${m.builtUpGrowthHa},+${b.builtUpGrowthHa},+${g.builtUpGrowthHa},Terbangun 2025 - Terbangun 2015
Laju Pertumbuhan Relatif (%),+${m.builtUpGrowthPct.toFixed(1)}%,+${b.builtUpGrowthPct.toFixed(1)}%,+${g.builtUpGrowthPct.toFixed(1)}%,(Pertumbuhan Ha / Terbangun 2015) * 100
Pertumbuhan Tahunan (Ha/Tahun),${m.annualizedGrowthHa},${b.annualizedGrowthHa},${g.annualizedGrowthHa},Pertumbuhan Ha / 10 Tahun
Lahan Pertanian/Sawah 2025 (Ha),${m.agri2025Ha},${b.agri2025Ha},${g.agri2025Ha},Sawah Beririgasi Teknis S2 LULC
Persentase Pertanian 2025 (%),${((m.agri2025Ha / m.totalAreaHa) * 100).toFixed(1)}%,${((b.agri2025Ha / b.totalAreaHa) * 100).toFixed(1)}%,${((g.agri2025Ha / g.totalAreaHa) * 100).toFixed(1)}%,(Pertanian 2025 / Luas Total) * 100
Konversi Sawah ke Terbangun (Ha),${m.agriConversionHa},${b.agriConversionHa},${g.agriConversionHa},Matriks Transisi Sawah 2015 -> Terbangun 2025
Tingkat Konversi Sawah (%),${m.agriConversionPct.toFixed(1)}%,${b.agriConversionPct.toFixed(1)}%,${g.agriConversionPct.toFixed(1)}%,(Konversi Ha / Sawah 2015) * 100
Vegetasi Lain & Tegalan (%),${m.vegetationPct.toFixed(1)}%,${b.vegetationPct.toFixed(1)}%,${g.vegetationPct.toFixed(1)}%,NDVI > 0.50 Non-Sawah
Badan Air & Sungai (%),${m.waterPct.toFixed(1)}%,${b.waterPct.toFixed(1)}%,${g.waterPct.toFixed(1)}%,NDWI > 0.10 (Bengawan Solo & Saluran)
Indeks Tekanan Perkembangan (DPI),${m.developmentPressureScore},${b.developmentPressureScore},${g.developmentPressureScore},Multi-Criteria Index (0-100)
Tumbuh di Koridor Jalan <250m (%),${m.builtWithin250mPct}%,${b.builtWithin250mPct}%,${g.builtWithin250mPct}%,Buffer 250m Jaringan Jalan
Fragmentasi Sawah (Jumlah Patch '15->'25),${m.fragmentation.patchCount2015} -> ${m.fragmentation.patchCount2025},${b.fragmentation.patchCount2015} -> ${b.fragmentation.patchCount2025},${g.fragmentation.patchCount2015} -> ${g.fragmentation.patchCount2025},Connected Component Labeling 10m
Ukuran Rata-Rata Patch Sawah (Ha),${m.fragmentation.meanPatchSizeHa2025} Ha,${b.fragmentation.meanPatchSizeHa2025} Ha,${g.fragmentation.meanPatchSizeHa2025} Ha,Luas Total Sawah / Jumlah Patch
Kendala Lingkungan / Banjir (Ha),${m.environmentalConstraintHa} Ha (${m.environmentalConstraintPct}%),${b.environmentalConstraintHa} Ha (${b.environmentalConstraintPct}%),${g.environmentalConstraintHa} Ha (${g.environmentalConstraintPct}%),SRTM DEM <=95m + Sempadan Sungai`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'RDTR_Sukoharjo_Komparasi_3WP.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rows = [
    {
      category: 'Dimensi Administrasi & Total',
      name: 'Luas Total Wilayah',
      mojolaban: `${m.totalAreaHa} Ha`,
      baki: `${b.totalAreaHa} Ha`,
      gatak: `${g.totalAreaHa} Ha`,
      highlight: null,
      unit: 'Ha',
    },
    {
      category: 'Dinamika Lahan Terbangun',
      name: 'Lahan Terbangun 2015',
      mojolaban: `${m.builtUp2015Ha} Ha (28.8%)`,
      baki: `${b.builtUp2015Ha} Ha (44.6%)`,
      gatak: `${g.builtUp2015Ha} Ha (29.5%)`,
      highlight: null,
    },
    {
      category: 'Dinamika Lahan Terbangun',
      name: 'Lahan Terbangun 2025',
      mojolaban: `${m.builtUp2025Ha} Ha (41.1%)`,
      baki: `${b.builtUp2025Ha} Ha (65.0%)`,
      gatak: `${g.builtUp2025Ha} Ha (42.4%)`,
      highlight: 'baki',
    },
    {
      category: 'Dinamika Lahan Terbangun',
      name: 'Pertumbuhan Terbangun (2015-2025)',
      mojolaban: `+${m.builtUpGrowthHa} Ha (+42.8%)`,
      baki: `+${b.builtUpGrowthHa} Ha (+45.7%)`,
      gatak: `+${g.builtUpGrowthHa} Ha (+43.7%)`,
      highlight: 'baki',
    },
    {
      category: 'Dinamika Lahan Terbangun',
      name: 'Laju Ekspansi Tahunan',
      mojolaban: `${m.annualizedGrowthHa} Ha/tahun`,
      baki: `${b.annualizedGrowthHa} Ha/tahun`,
      gatak: `${g.annualizedGrowthHa} Ha/tahun`,
      highlight: null,
    },
    {
      category: 'Aset Pertanian & Ketahanan Pangan',
      name: 'Sisa Lahan Pertanian 2025',
      mojolaban: `${m.agri2025Ha} Ha (48.2%)`,
      baki: `${b.agri2025Ha} Ha (30.4%)`,
      gatak: `${g.agri2025Ha} Ha (51.2%)`,
      highlight: 'gatak',
    },
    {
      category: 'Aset Pertanian & Ketahanan Pangan',
      name: 'Konversi Sawah ke Terbangun',
      mojolaban: `${m.agriConversionHa} Ha (18.8%)`,
      baki: `${b.agriConversionHa} Ha (38.4%)`,
      gatak: `${g.agriConversionHa} Ha (18.4%)`,
      highlight: 'baki_danger',
    },
    {
      category: 'Tekanan & Fragmentasi Lanskap',
      name: 'Fragmentasi Sawah (Patch Count)',
      mojolaban: `${m.fragmentation.patchCount2015} -> ${m.fragmentation.patchCount2025} (+79%)`,
      baki: `${b.fragmentation.patchCount2015} -> ${b.fragmentation.patchCount2025} (+181%)`,
      gatak: `${g.fragmentation.patchCount2015} -> ${g.fragmentation.patchCount2025} (+78%)`,
      highlight: 'baki_danger',
    },
    {
      category: 'Tekanan & Fragmentasi Lanskap',
      name: 'Rata-Rata Ukuran Petak Sawah (MPS)',
      mojolaban: `44.0 Ha -> 19.9 Ha`,
      baki: `25.8 Ha -> 5.66 Ha (-78%)`,
      gatak: `33.9 Ha -> 15.6 Ha`,
      highlight: 'baki_danger',
    },
    {
      category: 'Tekanan & Fragmentasi Lanskap',
      name: 'Skor Tekanan Perkembangan (DPI)',
      mojolaban: `${m.developmentPressureScore} (Tinggi)`,
      baki: `${b.developmentPressureScore} (Sangat Tinggi)`,
      gatak: `${g.developmentPressureScore} (Sedang)`,
      highlight: 'baki_danger',
    },
    {
      category: 'Aksessibilitas & Koridor',
      name: 'Pertumbuhan di Koridor < 250m',
      mojolaban: `${m.builtWithin250mPct}% dari terbangun baru`,
      baki: `${m.builtWithin250mPct}% dari terbangun baru`,
      gatak: `${g.builtWithin250mPct}% dari terbangun baru`,
      highlight: null,
    },
    {
      category: 'Fisik Lingkungan & Kerentanan',
      name: 'Kendala Lingkungan / Banjir',
      mojolaban: `${m.environmentalConstraintHa} Ha (13.0%)`,
      baki: `${b.environmentalConstraintHa} Ha (6.5%)`,
      gatak: `${g.environmentalConstraintHa} Ha (6.1%)`,
      highlight: 'mojolaban_alert',
    },
  ];

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            ANALISIS MODUL 16: STANDARISASI MULTI-WP
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Matriks Komparatif Indikator Spasial (Mojolaban vs Baki vs Gatak)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            Semua parameter diturunkan dari sensor citra yang identik (Sentinel-2 MSI Level-2A) dan metode seragam tanpa manipulasi asumsi.
          </p>
        </div>

        <button
          onClick={exportComparativeCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs self-start md:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Matriks CSV</span>
        </button>
      </div>

      {/* Aggregate Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Luas 3 WP</span>
          <span className="text-2xl font-mono font-bold text-slate-900 mt-1 block">
            {TOTAL_STUDY_AREA.totalAreaHa.toLocaleString()} Ha
          </span>
          <span className="text-[11px] text-slate-500">Kec. Mojolaban, Baki, Gatak</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-rose-700 font-medium block">Total Pertumbuhan Terbangun</span>
          <span className="text-2xl font-mono font-bold text-rose-700 mt-1 block">
            +{TOTAL_STUDY_AREA.builtUpGrowthHa.toLocaleString()} Ha
          </span>
          <span className="text-[11px] text-rose-600">+44.1% ekspansi dalam 10 tahun</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-amber-700 font-medium block">Total Sawah Terkonversi</span>
          <span className="text-2xl font-mono font-bold text-amber-700 mt-1 block">
            {TOTAL_STUDY_AREA.agriConversionHa.toLocaleString()} Ha
          </span>
          <span className="text-[11px] text-amber-600">23.5% sawah awal hilang</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-emerald-700 font-medium block">Kandidat LP2B Terkonservasi</span>
          <span className="text-2xl font-mono font-bold text-emerald-700 mt-1 block">
            {TOTAL_STUDY_AREA.agri2025Ha.toLocaleString()} Ha
          </span>
          <span className="text-[11px] text-emerald-600">43.9% sisa ruang terbuka hijau</span>
        </div>
      </div>

      {/* Full Comparative Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 w-64">Indikator Spasial Terukur</th>
                <th className="p-3.5 w-56 text-sky-900 font-bold border-l border-slate-200">
                  WP Mojolaban (3.554 Ha)
                </th>
                <th className="p-3.5 w-56 text-rose-900 font-bold border-l border-slate-200">
                  WP Baki (2.197 Ha)
                </th>
                <th className="p-3.5 w-56 text-emerald-900 font-bold border-l border-slate-200">
                  WP Gatak (1.947 Ha)
                </th>
                <th className="p-3.5 border-l border-slate-200 text-slate-600">
                  Temuan Analitis & Kesimpulan Perencanaan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{row.category}</span>
                    <span>{row.name}</span>
                  </td>
                  <td
                    className={`p-3.5 border-l border-slate-200 font-mono ${
                      row.highlight === 'mojolaban_alert' ? 'bg-amber-50 text-amber-900 font-bold' : ''
                    }`}
                  >
                    {row.mojolaban}
                  </td>
                  <td
                    className={`p-3.5 border-l border-slate-200 font-mono ${
                      row.highlight === 'baki'
                        ? 'bg-rose-50 text-rose-900 font-bold'
                        : row.highlight === 'baki_danger'
                        ? 'bg-rose-100 text-rose-900 font-bold'
                        : ''
                    }`}
                  >
                    {row.baki}
                  </td>
                  <td
                    className={`p-3.5 border-l border-slate-200 font-mono ${
                      row.highlight === 'gatak' ? 'bg-emerald-50 text-emerald-900 font-bold' : ''
                    }`}
                  >
                    {row.gatak}
                  </td>
                  <td className="p-3.5 border-l border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                    {row.name.includes('Terbangun 2025') &&
                      'Baki mendominasi intensitas kekotaan (65.0%) sebagai suburban spillover Surakarta, sedangkan Mojolaban & Gatak masih mempertahankan karakter agro-urban (41-42%).'}
                    {row.name.includes('Konversi Sawah') &&
                      'Tingkat konversi sawah di Baki sangat masif (38.4%), lebih dari dua kali lipat intensitas konversi di Mojolaban (18.8%) dan Gatak (18.4%).'}
                    {row.name.includes('Fragmentasi') &&
                      'Jumlah petak sawah Baki melonjak dari 42 menjadi 118 petak mikro; ukuran petak rata-rata anjlok 78% menjadi 5.66 ha, mengancam efisiensi traktor & irigasi.'}
                    {row.name.includes('Kendala Lingkungan') &&
                      'Mojolaban memiliki kerentanan fisik banjir tertinggi (13.0% luas wilayah) karena dilintasi langsung oleh dataran banjir Sungai Bengawan Solo.'}
                    {!row.name.includes('Terbangun 2025') &&
                      !row.name.includes('Konversi Sawah') &&
                      !row.name.includes('Fragmentasi') &&
                      !row.name.includes('Kendala Lingkungan') &&
                      'Metodologi konsisten menggunakan resolusi spasial 10m Sentinel-2 SR Harmonized.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
