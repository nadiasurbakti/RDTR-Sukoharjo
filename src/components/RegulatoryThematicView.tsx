import React, { useState } from 'react';
import { 
  REGULATORY_DOCUMENTS, 
  WP_THEMATIC_PROFILES, 
  RegulationDocument 
} from '../data/regulatoryBasis';
import { KAK_FRAMEWORK } from '../data/kakData';
import { 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Layers, 
  AlertTriangle, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Landmark,
  Building2,
  Wheat,
  Train,
  Droplets,
  Info,
  Briefcase,
  Target,
  FileCheck2,
  Compass,
  ArrowRight,
  Sparkles,
  ListOrdered
} from 'lucide-react';

export const RegulatoryThematicView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kak' | 'thematic' | 'regulations' | 'matrix'>('kak');
  const [selectedWp, setSelectedWp] = useState<'mojolaban' | 'baki' | 'gatak'>('mojolaban');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<RegulationDocument | null>(REGULATORY_DOCUMENTS[0]);

  const wpProfile = WP_THEMATIC_PROFILES[selectedWp];

  const filteredDocs = REGULATORY_DOCUMENTS.filter(doc => {
    const matchesTier = selectedTier === 'all' || doc.tier === selectedTier;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.formalNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.scope.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6 text-slate-800">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
              <Landmark className="w-3.5 h-3.5 text-blue-700" />
              <span>KERANGKA KERJA & REGULASI TATA RUANG</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>KAK Swakelola RDTR 3 WP</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>15 Regulasi Berlaku</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Kec. Grogol: RDTR Eksisting (SK Bupati 600.3/342/2026)</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Maksud, Tujuan, Sasaran KAK & Dasar Penentuan Tematik RDTR Sukoharjo
          </h2>
          <p className="text-xs text-slate-600 max-w-4xl leading-relaxed">
            Penyusunan Materi Teknis dan Ranperkada 3 (Tiga) RDTR di Kabupaten Sukoharjo (WP Mojolaban, WP Baki, WP Gatak) dilaksanakan secara swakelola berdasarkan Kerangka Acuan Kerja (KAK) dan sintesis 15 peraturan perundang-undangan nasional, provinsi, dan kabupaten.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center p-1.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start lg:self-center gap-1">
          <button
            onClick={() => setActiveTab('kak')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'kak'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Maksud, Tujuan & Sasaran KAK</span>
          </button>
          <button
            onClick={() => setActiveTab('thematic')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'thematic'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tematik 3 WP</span>
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'regulations'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>15 Dokumen Regulasi</span>
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Matriks Keterkaitan</span>
          </button>
        </div>
      </div>

      {/* TAB 0: KAK (MAKSUD, TUJUAN, SASARAN & RUANG LINGKUP) */}
      {activeTab === 'kak' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Official KAK Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  KERANGKA ACUAN KERJA (KAK) • METODE SWAKELOLA
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  MAKSUD, TUJUAN DAN SASARAN PENYUSUNAN RDTR
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start md:self-center">
                Status: Sesuai Ketentuan KAK
              </span>
            </div>

            {/* Grid 1: Maksud & Tujuan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* 1. Maksud */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Maksud</h4>
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-lg text-xs leading-relaxed text-slate-800 font-medium shadow-2xs">
                  "{KAK_FRAMEWORK.maksud.summary}"
                </div>
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Peran Strategis:</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {KAK_FRAMEWORK.maksud.keyBenefits.map((b, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. Tujuan */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Tujuan</h4>
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-lg text-xs leading-relaxed text-slate-800 font-medium shadow-2xs">
                  "{KAK_FRAMEWORK.tujuan.summary}"
                </div>
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Cakupan 3 Wilayah Perencanaan (3 WP):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {KAK_FRAMEWORK.tujuan.targetWps.map((wp) => (
                      <div key={wp.code} className="bg-white border border-slate-200 p-2.5 rounded-lg text-xs">
                        <div className="font-bold text-blue-950">{wp.name}</div>
                        <div className="text-[11px] text-slate-500 font-semibold">{wp.desaCount} Desa/Kelurahan</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Sasaran */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Sasaran</h4>
                    <p className="text-xs text-slate-600">
                      Sasaran yang dicapai dalam pelaksanaan pekerjaan ini adalah tersedianya:
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  8 Dokumen Sasaran (a s.d. h)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {KAK_FRAMEWORK.sasaran.items.map((item) => (
                  <div 
                    key={item.letter}
                    className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-start space-x-3 shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {item.letter}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-900">
                          {item.title}
                        </h5>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-1.5 pt-1 text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-700">Implementasi:</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                          {item.appLocation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RUANG LINGKUP */}
            <div className="border-t border-slate-200 pt-5 space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                  RUANG LINGKUP PEKERJAAN & WILAYAH
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  RUANG LINGKUP PELAKSANAAN SWAKELOLA
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* 1) Lingkup Pekerjaan */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">1) Lingkup Pekerjaan</h4>
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Swakelola
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    {KAK_FRAMEWORK.ruangLingkup.lingkupPekerjaan.nature}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {KAK_FRAMEWORK.ruangLingkup.lingkupPekerjaan.activities.map((act) => (
                      <div key={act.code} className="bg-white border border-slate-200 p-3 rounded-lg space-y-1.5 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-900 uppercase">
                            {act.code}.
                          </span>
                          <span className="font-semibold text-slate-800">{act.title}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed pl-5">
                          {act.description}
                        </p>
                        {act.subList && (
                          <div className="pl-5 pt-1 grid grid-cols-2 gap-1 text-[11px] text-slate-700">
                            {act.subList.map((s, i) => (
                              <div key={i} className="flex items-center space-x-1.5">
                                <span className="w-1 h-1 rounded-full bg-blue-600" />
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2) Lingkup Wilayah */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">2) Lingkup Wilayah</h4>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Kab. Sukoharjo (3 WP)
                    </span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3.5 rounded-lg text-xs leading-relaxed text-slate-800 font-medium shadow-2xs">
                    "{KAK_FRAMEWORK.ruangLingkup.lingkupWilayah.summary}"
                  </div>

                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Wilayah Kajian Delineasi:</p>
                    <div className="space-y-2">
                      {KAK_FRAMEWORK.ruangLingkup.lingkupWilayah.geographicContext.map((geo, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 p-2.5 rounded-lg text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{geo.entity}</span>
                            <span className="text-[10px] font-semibold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded">
                              {geo.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{geo.keterangan}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start space-x-2 text-[11px] text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Ketentuan Khusus Batas:</strong> {KAK_FRAMEWORK.ruangLingkup.lingkupWilayah.boundaryConstraint}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: THEMATIC PER WP */}
      {activeTab === 'thematic' && (
        <div className="space-y-6">
          {/* WP Selector Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedWp('mojolaban')}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedWp === 'mojolaban'
                  ? 'bg-sky-50/80 border-sky-400 shadow-sm ring-2 ring-sky-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">WP MOJOLABAN</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-medium text-slate-600 border border-slate-200">15 Desa • 3.554 Ha</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">Agro-Urban & Koridor Bengawan Solo</h3>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                Penyangga lumbung pangan DI Colo, konservasi sempadan sungai 100m, dan revitalisasi sentra jamu Bekonang & gamelan Wirun.
              </p>
            </button>

            <button
              onClick={() => setSelectedWp('baki')}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedWp === 'baki'
                  ? 'bg-rose-50/80 border-rose-400 shadow-sm ring-2 ring-rose-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">WP BAKI</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-medium text-slate-600 border border-slate-200">14 Desa • 2.197 Ha</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">Urban Growth Containment & Infill</h3>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                Pengendalian sprawl peri-urban, densifikasi hunian kompak di Gentan, konsolidasi sawah abadi LP2B, dan pembatasan konversi.
              </p>
            </button>

            <button
              onClick={() => setSelectedWp('gatak')}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedWp === 'gatak'
                  ? 'bg-emerald-50/80 border-emerald-400 shadow-sm ring-2 ring-emerald-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">WP GATAK</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-medium text-slate-600 border border-slate-200">14 Desa • 1.947 Ha</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">Agro-Industri Rotan & Gawok TOD</h3>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                Pelestarian 51,2% sawah inti (996 Ha), penguatan ekspor kerajinan rotan Trangsan, dan simpul transit KRL Stasiun Gawok.
              </p>
            </button>
          </div>

          {/* Active WP Detail Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Header WP */}
            <div className="border-b border-slate-200 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    TEMA RDTR DEFINITIF
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {wpProfile.wpName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Delineasi Perencanaan</span>
                  <div className="text-sm font-bold text-slate-800">
                    {wpProfile.delineasiLuasHa.toLocaleString()} Ha • {wpProfile.jumlahDesa} Desa/Kelurahan
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 leading-relaxed">
                <span className="font-bold text-blue-900">Tema Penataan Ruang: </span>
                {wpProfile.temaRDTR}
              </div>
              <p className="text-xs text-slate-600 mt-2">
                <strong className="text-slate-800">Karakter Spasial: </strong>{wpProfile.karakterSpasialUtama}
              </p>
            </div>

            {/* Grid 2 Columns: Dasar Regulasi & Alokasi Pola Ruang */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kolom 1: Dasar Hukum Penentuan Tematik */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-blue-700" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Dasar Regulasi Penentuan Tematik {selectedWp.toUpperCase()}
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {wpProfile.dasarHukumPenetapan.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.regulasi}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 pl-5 leading-relaxed">
                        {item.mandatUtama}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolom 2: Fokus Alokasi Pola Ruang & Persentase */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-blue-700" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Fokus Alokasi Pola Ruang (Sub-Zonasi RDTR)
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {wpProfile.fokusAlokasiPolaRuang.map((zone, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-mono font-bold text-xs border border-blue-200">
                            {zone.kode}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{zone.nama}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {zone.persentase}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 pl-1 leading-relaxed">
                        <span className="text-slate-500">Dasar: </span>{zone.dasarKebijakan}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sempadan dan Jaringan Riil */}
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
                <Droplets className="w-4 h-4 text-blue-700" />
                <span>Arahan Garis Sempadan & Jaringan Eksisting Riil pada {wpProfile.wpName}</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                {wpProfile.arahanSpesifikSempadanDanJaringan.map((dir, i) => (
                  <li key={i} className="flex items-start space-x-2 bg-white p-2.5 rounded-lg border border-blue-100">
                    <span className="text-blue-700 font-bold">•</span>
                    <span>{dir}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Callout: Boundary with Grogol RDTR Eksisting */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 flex items-start space-x-3 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900">Keterkaitan Perbatasan dengan RDTR Eksisting Kecamatan Grogol:</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">
                  Berdasarkan <strong>Keputusan Bupati Sukoharjo No. 600.3/342 Tahun 2026</strong>, Kawasan Perkotaan Kecamatan Grogol (Solo Baru) telah memiliki penetapan delineasi RDTR tersendiri dan <strong>TIDAK TERMASUK</strong> dalam pekerjaan penyusunan RDTR baru ini. Perencanaan pada {wpProfile.wpName} mengadopsi Grogol sebagai batas eksternal tetap untuk sinkronisasi elevasi drainase makro, hirarki jalan arteri/kolektor penghubung, dan transisi zonasi perbatasan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIST OF 15 REGULATIONS */}
      {activeTab === 'regulations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filter & Doc List */}
          <div className="lg:col-span-5 space-y-3">
            {/* Search & Tier Filters */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor/nama peraturan tata ruang..."
                className="w-full text-xs px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-1 text-[11px]">
                {['all', 'Nasional', 'Provinsi', 'Kabupaten', 'Statistik', 'RDTR_Eksisting'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-2 py-1 rounded font-medium transition-all ${
                      selectedTier === tier
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tier === 'all' ? 'Semua (15)' : tier.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredDocs.map((doc) => {
                const isSelected = selectedDoc?.id === doc.id;
                const isGrogol = doc.tier === 'RDTR_Eksisting';

                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-400 shadow-xs ring-1 ring-blue-300'
                        : isGrogol
                        ? 'bg-amber-50/50 border-amber-300 hover:bg-amber-50'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        doc.tier === 'Nasional' ? 'bg-indigo-100 text-indigo-800' :
                        doc.tier === 'Provinsi' ? 'bg-blue-100 text-blue-800' :
                        doc.tier === 'Kabupaten' ? 'bg-emerald-100 text-emerald-800' :
                        doc.tier === 'Statistik' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800 font-extrabold'
                      }`}>
                        {doc.orderNumber}. {doc.tier.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{doc.year}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1.5 leading-snug line-clamp-2">
                      {doc.formalNumber}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {doc.scope}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Regulation Inspector */}
          <div className="lg:col-span-7">
            {selectedDoc ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 sticky top-20">
                <div className="border-b border-slate-200 pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      REGULASI NOMOR URUT #{selectedDoc.orderNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-500">Tahun Pengesahan: {selectedDoc.year}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {selectedDoc.formalNumber}
                  </h3>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Perihal: </strong>{selectedDoc.title}
                  </p>
                </div>

                {/* Mandat Pokok */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-700" />
                    <span>Mandat Pokok & Ketentuan Penataan Ruang</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedDoc.keyDirectives.map((dir, idx) => (
                      <li key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        <span className="text-blue-700 font-bold mt-0.5">•</span>
                        <span>{dir}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Implikasi terhadap 3 WP */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Implikasi Teknis Spasial pada 3 Wilayah Perencanaan</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 space-y-1">
                      <div className="font-bold text-sky-900 text-[11px]">WP MOJOLABAN</div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{selectedDoc.wpImplications.mojolaban}</p>
                    </div>
                    <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
                      <div className="font-bold text-rose-900 text-[11px]">WP BAKI</div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{selectedDoc.wpImplications.baki}</p>
                    </div>
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-900 text-[11px]">WP GATAK</div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{selectedDoc.wpImplications.gatak}</p>
                    </div>
                  </div>
                </div>

                {/* Relevansi ke RDTR */}
                <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
                  <span className="font-bold">Kedudukan dalam Penyusunan RDTR: </span>
                  {selectedDoc.relevanceToRDTR}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                Pilih salah satu dokumen regulasi di kolom kiri untuk melihat rincian mandat.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MATRIX COMPARISON */}
      {activeTab === 'matrix' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Matriks Keterkaitan 15 Regulasi dengan Penentuan Tematik 3 WP & Delineasi
              </h3>
              <p className="text-xs text-slate-500">
                Perbandingan komparatif mandat hukum per peraturan terhadap masing-masing WP di Kabupaten Sukoharjo
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              15 Dokumen Legal
            </span>
          </div>

          <div className="overflow-x-auto max-h-[640px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  <th className="p-3 border-r border-slate-200 w-12 text-center">No</th>
                  <th className="p-3 border-r border-slate-200 w-64">Nama & Nomor Regulasi</th>
                  <th className="p-3 border-r border-slate-200 w-24 text-center">Tingkat</th>
                  <th className="p-3 border-r border-slate-200 w-64 bg-sky-50/50 text-sky-950">Implikasi WP Mojolaban</th>
                  <th className="p-3 border-r border-slate-200 w-64 bg-rose-50/50 text-rose-950">Implikasi WP Baki</th>
                  <th className="p-3 w-64 bg-emerald-50/50 text-emerald-950">Implikasi WP Gatak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {REGULATORY_DOCUMENTS.map((doc, idx) => (
                  <tr key={doc.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                    <td className="p-3 border-r border-slate-200 text-center font-bold font-mono text-slate-500">
                      {doc.orderNumber}
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{doc.formalNumber}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{doc.scope}</div>
                    </td>
                    <td className="p-3 border-r border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.tier === 'Nasional' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        doc.tier === 'Provinsi' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        doc.tier === 'Kabupaten' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        doc.tier === 'Statistik' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-amber-50 text-amber-700 border border-amber-300 font-extrabold'
                      }`}>
                        {doc.tier.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 border-r border-slate-200 text-[11px] leading-relaxed bg-sky-50/20">
                      {doc.wpImplications.mojolaban}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-[11px] leading-relaxed bg-rose-50/20">
                      {doc.wpImplications.baki}
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed bg-emerald-50/20">
                      {doc.wpImplications.gatak}
                    </td>
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
