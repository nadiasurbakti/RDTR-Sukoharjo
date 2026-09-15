export interface RdtrDistrictStatus {
  id: string;
  name: string;
  status: 'DITETAPKAN' | 'SEDANG_DISUSUN' | 'BELUM_DISUSUN';
  statusLabel: string;
  wpName?: string;
  delineationStatus: string;
  perdaNumber?: string;
  isExcludedFromNewWork?: boolean;
  decreeDetail?: string;
  description: string;
  color: string;
}

export interface DesaDelineationInfo {
  name: string;
  kecamatan: 'Mojolaban' | 'Baki' | 'Gatak';
  areaHa: number;
  karakterSpasial: string;
  delineationRecommendation: {
    skenario1_administratif: boolean; // Seluruh kecamatan
    skenario2_fungsional_perkotaan: boolean; // Kawasan perkotaan & koridor
    skenario3_aglomerasi_lintas: boolean; // Koridor strategis
  };
  catatanTeknis: string;
}

export interface DelineationScenario {
  id: 'skenario1' | 'skenario2' | 'skenario3';
  name: string;
  shortName: string;
  title: string;
  description: string;
  legalBasis: string;
  pros: string[];
  cons: string[];
  totalAreaHa: {
    mojolaban: number;
    baki: number;
    gatak: number;
    total: number;
  };
}

export const RDTR_DISTRICTS_SUKOHARJO: Record<string, RdtrDistrictStatus> = {
  Sukoharjo: {
    id: 'Sukoharjo',
    name: 'Kecamatan Sukoharjo',
    status: 'DITETAPKAN',
    statusLabel: 'RDTR Telah Ditetapkan (Perda)',
    wpName: 'WP Perkotaan Sukoharjo',
    delineationStatus: 'Delineasi Definitif Ditetapkan',
    perdaNumber: 'Perda Kab. Sukoharjo No. 4/2020',
    description: 'Pusat pemerintahan dan pelayanan administratif ibukota Kabupaten Sukoharjo.',
    color: '#10b981', // Emerald
  },
  Grogol: {
    id: 'Grogol',
    name: 'Kecamatan Grogol',
    status: 'DITETAPKAN',
    statusLabel: 'RDTR Eksisting Telah Ditetapkan (SK Bupati 2026)',
    wpName: 'WP Kawasan Perkotaan Grogol (Solo Baru)',
    delineationStatus: 'RDTR EKSISTING - TIDAK MASUK WILAYAH PEKERJAAN BARU',
    perdaNumber: 'Keputusan Bupati Sukoharjo No. 600.3/342 Tahun 2026',
    isExcludedFromNewWork: true,
    decreeDetail: 'BUPATI SUKOHARJO PROVINSI JAWA TENGAH KEPUTUSAN BUPATI SUKOHARJO NOMOR : 600.3/342 TAHUN 2026 TENTANG PENETAPAN DELINEASI WILAYAH PERENCANAAN RENCANA DETAIL TATA RUANG KAWASAN PERKOTAAN KECAMATAN GROGOL KABUPATEN SUKOHARJO',
    description: 'Berdasarkan Keputusan Bupati Sukoharjo No. 600.3/342 Tahun 2026, delineasi RDTR Kawasan Perkotaan Kecamatan Grogol (Solo Baru, Telukan, Madegondo, Langenharjo, dkk) telah ditetapkan secara mandiri dan berstatus RDTR Eksisting. Wilayah ini TIDAK MASUK dalam wilayah pekerjaan RDTR baru yang akan dikerjakan (pekerjaan baru fokus pada 3 WP: Mojolaban, Baki, dan Gatak). Keberadaannya menjadi batas eksternal acuan sinkronisasi jaringan dan perbatasan.',
    color: '#0284c7', // Cyan/Blue
  },
  Kartasura: {
    id: 'Kartasura',
    name: 'Kecamatan Kartasura',
    status: 'DITETAPKAN',
    statusLabel: 'RDTR Telah Ditetapkan (Perda)',
    wpName: 'WP Kartasura',
    delineationStatus: 'Delineasi Definitif Ditetapkan',
    perdaNumber: 'Perda Kab. Sukoharjo No. 6/2020',
    description: 'Simpul segitiga pertumbuhan Joglosemar, transit regional, pendidikan tinggi, dan industri.',
    color: '#10b981',
  },
  Nguter: {
    id: 'Nguter',
    name: 'Kecamatan Nguter',
    status: 'DITETAPKAN',
    statusLabel: 'RDTR Telah Ditetapkan (Perda)',
    wpName: 'WP Nguter - Bendosari (Kawasan Industri)',
    delineationStatus: 'Delineasi Definitif Ditetapkan',
    perdaNumber: 'Perda Kab. Sukoharjo No. 7/2021',
    description: 'Kawasan Peruntukan Industri (KPI) terpadu Sukoharjo dan jamu herbal nasional.',
    color: '#10b981',
  },
  Bendosari: {
    id: 'Bendosari',
    name: 'Kecamatan Bendosari',
    status: 'DITETAPKAN',
    statusLabel: 'RDTR Telah Ditetapkan (Perda)',
    wpName: 'WP Nguter - Bendosari (Kawasan Industri)',
    delineationStatus: 'Delineasi Definitif Ditetapkan',
    perdaNumber: 'Perda Kab. Sukoharjo No. 7/2021',
    description: 'Kawasan penyangga industri dan pengembangan perumahan pendukung pusat kabupaten.',
    color: '#10b981',
  },
  Mojolaban: {
    id: 'Mojolaban',
    name: 'Kecamatan Mojolaban',
    status: 'SEDANG_DISUSUN',
    statusLabel: 'Tahap Penyusunan (Delineasi Belum Ditentukan)',
    wpName: 'WP Kecamatan Mojolaban (Usulan)',
    delineationStatus: 'BELUM DITENTUKAN DELINEASI DEFINITIF',
    description: 'Kandidat Wilayah Perencanaan RDTR baru: mencakup 15 desa, transisi agro-urban, lembah Bengawan Solo, dan sentra Bekonang.',
    color: '#f59e0b', // Amber
  },
  Baki: {
    id: 'Baki',
    name: 'Kecamatan Baki',
    status: 'SEDANG_DISUSUN',
    statusLabel: 'Tahap Penyusunan (Delineasi Belum Ditentukan)',
    wpName: 'WP Kecamatan Baki (Usulan)',
    delineationStatus: 'BELUM DITENTUKAN DELINEASI DEFINITIF',
    description: 'Kandidat Wilayah Perencanaan RDTR baru: mencakup 14 desa, kawasan peri-urban spillover Surakarta, dan klaster perumahan Gentan.',
    color: '#f43f5e', // Rose
  },
  Gatak: {
    id: 'Gatak',
    name: 'Kecamatan Gatak',
    status: 'SEDANG_DISUSUN',
    statusLabel: 'Tahap Penyusunan (Delineasi Belum Ditentukan)',
    wpName: 'WP Kecamatan Gatak (Usulan)',
    delineationStatus: 'BELUM DITENTUKAN DELINEASI DEFINITIF',
    description: 'Kandidat Wilayah Perencanaan RDTR baru: mencakup 14 desa, agro-industri kerajinan rotan Trangsan, dan simpul Stasiun Gawok.',
    color: '#06b6d4', // Cyan
  },
  Polokarto: {
    id: 'Polokarto',
    name: 'Kecamatan Polokarto',
    status: 'BELUM_DISUSUN',
    statusLabel: 'Belum Masuk Tahap RDTR',
    delineationStatus: 'Kawasan Perdesaan & LP2B Luar RDTR',
    description: 'Kawasan pertanian, perkebunan karet, dan konservasi hidrologis.',
    color: '#475569',
  },
  Tawangsari: {
    id: 'Tawangsari',
    name: 'Kecamatan Tawangsari',
    status: 'BELUM_DISUSUN',
    statusLabel: 'Belum Masuk Tahap RDTR',
    delineationStatus: 'Kawasan Perdesaan & LP2B Luar RDTR',
    description: 'Kawasan pertanian lumbung padi dan perbukitan kapur selatan.',
    color: '#475569',
  },
  Bulu: {
    id: 'Bulu',
    name: 'Kecamatan Bulu',
    status: 'BELUM_DISUSUN',
    statusLabel: 'Belum Masuk Tahap RDTR',
    delineationStatus: 'Kawasan Lindung & Pegunungan Selatan',
    description: 'Kawasan karst, batas Kabupaten Wonogiri, dan kawasan lindung resapan air.',
    color: '#475569',
  },
  Weru: {
    id: 'Weru',
    name: 'Kecamatan Weru',
    status: 'BELUM_DISUSUN',
    statusLabel: 'Belum Masuk Tahap RDTR',
    delineationStatus: 'Kawasan Perdesaan Luar RDTR',
    description: 'Kawasan pertanian tadah hujan dan perbatasan Kabupaten Gunungkidul.',
    color: '#475569',
  },
};

export const DELINEATION_SCENARIOS: DelineationScenario[] = [
  {
    id: 'skenario1',
    name: 'Skenario 1: Delineasi Administratif Penuh (Kecamatan Utuh)',
    shortName: 'Administratif Penuh',
    title: 'Pendekatan Batas Administrasi Kecamatan (Whole-District WP)',
    description: 'Menetapkan seluruh wilayah administrasi kecamatan sebagai 1 kesatuan Wilayah Perencanaan (WP) RDTR tanpa memotong batas desa.',
    legalBasis: 'Permen ATR/BPN No. 11/2021 Pasal 5 ayat (2): Wilayah Perencanaan (WP) dapat mencakup 1 (satu) wilayah kecamatan secara utuh apabila terdapat keterkaitan fungsional.',
    pros: [
      'Kepastian hukum batas yurisdiksi jelas dan tidak memicu sengketa batas desa.',
      'Memudahkan integrasi data perizinan PBG/SIMBG, PBB, dan administrasi kependudukan BPS.',
      'Pengendalian ruang mencakup kawasan hulu-hilir (termasuk sempadan sungai dan sawah irigasi).',
    ],
    cons: [
      'Beban pemetaan skala 1:5.000 menjadi sangat luas (total 7.698 Ha untuk 3 WP).',
      'Memerlukan alokasi anggaran survei topografi/drone yang lebih besar pada desa-desa sawah terpencil.',
    ],
    totalAreaHa: {
      mojolaban: 3554,
      baki: 2197,
      gatak: 1947,
      total: 7698,
    },
  },
  {
    id: 'skenario2',
    name: 'Skenario 2: Delineasi Fungsional Kawasan Perkotaan (Urban Cluster)',
    shortName: 'Fungsional Perkotaan',
    title: 'Pendekatan Kawasan Perkotaan Tumbuh Cepat & Koridor Primer',
    description: 'Mendelineasi hanya desa-desa yang telah mengalami proses urbanisasi pesat (>45% terbangun atau dilewati jalan arteri/kolektor), dan mengecualikan desa sawah murni perdesaan.',
    legalBasis: 'Permen ATR/BPN No. 11/2021 Pasal 5 ayat (3): Wilayah Perencanaan dapat dibatasi pada sebagian wilayah kecamatan yang memiliki intensitas kegiatan perkotaan tinggi.',
    pros: [
      'Sangat fokus pada kawasan yang mengalami tekanan alih fungsi lahan dan spekulasi properti tertinggi.',
      'Efisiensi anggaran penyusunan dokumen teknis dan peta detail skala 1:5.000.',
      'Perizinan OSS-RBA langsung terakselerasi di pusat-pusat pertumbuhan ekonomi.',
    ],
    cons: [
      'Desa-desa yang berada di luar delineasi RDTR rentan mengalami "kebocoran alih fungsi" (spillover sprawl) karena pengawasannya lebih longgar.',
      'Terjadi fragmentasi kelembagaan rencana tata ruang di dalam satu kecamatan yang sama.',
    ],
    totalAreaHa: {
      mojolaban: 1920, // Palur, Bekonang, Triyagan, Joho, Wirun
      baki: 1485, // Gentan, Kudu, Menuran, Purbayan, Bakipandeyan, Mancasan, Waru
      gatak: 1120, // Trangsan, Mayang, Krajan, Sraten, Blimbing (Gawok)
      total: 4525,
    },
  },
  {
    id: 'skenario3',
    name: 'Skenario 3: Delineasi Aglomerasi Lintas Batas (Strategic Corridor)',
    shortName: 'Aglomerasi Koridor',
    title: 'Pendekatan Koridor Ekonomi Strategis Surakarta–Sukoharjo–Klaten',
    description: 'Delineasi difokuskan pada keterkaitan koridor transportasi regional: Koridor Palur–Bekonang–Solo di Mojolaban, Koridor Solo Baru–Baki di Baki, dan Koridor Rel KA/KRL Stasiun Gawok–Trangsan di Gatak.',
    legalBasis: 'RTRW Kabupaten Sukoharjo No. 1/2018 tentang Pengembangan Koridor Strategis Aglomerasi Solo Raya.',
    pros: [
      'Mengakomodasi konektivitas logistik, TOD stasiun commuter, dan aksesibilitas industri ekspor rotan.',
      'Sinkron dengan sistem jaringan prasarana transportasi regional Solo Raya.',
    ],
    cons: [
      'Bentuk geometri WP menjadi memanjang linier (ribbon shape), menyulitkan penataan struktur jaringan sirkulasi sekunder/lingkungan.',
    ],
    totalAreaHa: {
      mojolaban: 2340,
      baki: 1750,
      gatak: 1390,
      total: 5480,
    },
  },
];

export const DESA_3WP_DETAILS: DesaDelineationInfo[] = [
  // MOJOLABAN (15 Desa)
  {
    name: 'Palur',
    kecamatan: 'Mojolaban',
    areaHa: 467.28,
    karakterSpasial: 'Pusat Perdagangan & Jasa, Akses Karanganyar/Surakarta',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Prioritas Delineasi Tertinggi: Koridor primer jalan nasional & perdagangan regional.',
  },
  {
    name: 'Bekonang',
    kecamatan: 'Mojolaban',
    areaHa: 271.40,
    karakterSpasial: 'Pusat Kecamatan, Pasar Tradisional, Sentra Industri Ciu/Bioetanol',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Prioritas Delineasi Tertinggi: Ibukota kecamatan dengan kompleksitas permukiman produktif.',
  },
  {
    name: 'Wirun',
    kecamatan: 'Mojolaban',
    areaHa: 285.89,
    karakterSpasial: 'Desa Wisata Gamelan Tradisional & Kerajinan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Kandidat Zona Pelestarian Budaya & Pariwisata.',
  },
  {
    name: 'Triyagan',
    kecamatan: 'Mojolaban',
    areaHa: 187.22,
    karakterSpasial: 'Perumahan Spillover & Koridor Jl. Raya Solo–Tawangmangu',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Tekanan alih fungsi perumahan sangat tinggi.',
  },
  {
    name: 'Joho',
    kecamatan: 'Mojolaban',
    areaHa: 348.83,
    karakterSpasial: 'Transisi Agro-Urban & Permukiman Campuran',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Batas penyangga antara permukiman perkotaan dan sawah beririgasi teknis.',
  },
  {
    name: 'Cangkol',
    kecamatan: 'Mojolaban',
    areaHa: 226.62,
    karakterSpasial: 'Agro-Perdesaan & Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Kandidat kuat perlindungan LP2B abadi.',
  },
  {
    name: 'Demakan',
    kecamatan: 'Mojolaban',
    areaHa: 234.73,
    karakterSpasial: 'Sawah Irigasi Teknis & Bantaran Bengawan Solo',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Sensitif terhadap luapan banjir Bengawan Solo.',
  },
  {
    name: 'Dukuh',
    kecamatan: 'Mojolaban',
    areaHa: 193.32,
    karakterSpasial: 'Pertanian & Permukiman Perdesaan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Dominan pertanian pangan beririgasi Dam Colo.',
  },
  {
    name: 'Gadingan',
    kecamatan: 'Mojolaban',
    areaHa: 221.73,
    karakterSpasial: 'Sempadan Sungai Bengawan Solo & Pertanian Aluvial',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Memerlukan ketentuan khusus sempadan sungai 100 meter.',
  },
  {
    name: 'Klumprit',
    kecamatan: 'Mojolaban',
    areaHa: 226.62,
    karakterSpasial: 'Lembah Aluvial & Rawan Banjir Bengawan Solo',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Zona kendala lingkungan tinggi, elevasi rendah <= 92m dpl.',
  },
  {
    name: 'Kragilan',
    kecamatan: 'Mojolaban',
    areaHa: 198.22,
    karakterSpasial: 'Pertanian Campuran & Permukiman Perdesaan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Perlindungan sawah produktif.',
  },
  {
    name: 'Laban',
    kecamatan: 'Mojolaban',
    areaHa: 243.41,
    karakterSpasial: 'Bantaran Bengawan Solo & Batas Kota Surakarta',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Pintu gerbang jembatan Semanggi / Mojo menuju Surakarta.',
  },
  {
    name: 'Plumbon',
    kecamatan: 'Mojolaban',
    areaHa: 239.54,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Sapen',
    kecamatan: 'Mojolaban',
    areaHa: 240.97,
    karakterSpasial: 'Pertanian & Permukiman Tradisional',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Tegalmade',
    kecamatan: 'Mojolaban',
    areaHa: 204.53,
    karakterSpasial: 'Ujung Selatan Bantaran Bengawan Solo',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Zona resapan air dan perlindungan sempadan aluvial.',
  },

  // BAKI (14 Desa)
  {
    name: 'Gentan',
    kecamatan: 'Baki',
    areaHa: 138.40,
    karakterSpasial: 'Kawasan Perumahan Formal Padat (Real Estate), Berbatasan Surakarta',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Prioritas Delineasi Absolut: Urbanisasi tertinggi di Baki (>75% terbangun).',
  },
  {
    name: 'Kudu',
    kecamatan: 'Baki',
    areaHa: 226.93,
    karakterSpasial: 'Ekspansi Perumahan Menengah & Akses Solo Baru',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Tekanan alih fungsi lahan sawah sangat masif.',
  },
  {
    name: 'Menuran',
    kecamatan: 'Baki',
    areaHa: 227.03,
    karakterSpasial: 'Perumahan & Koridor Penghubung Baki–Grogol',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Koridor aglomerasi Solo Baru.',
  },
  {
    name: 'Purbayan',
    kecamatan: 'Baki',
    areaHa: 131.21,
    karakterSpasial: 'Kawasan Perumahan dan Jasa Komersial',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Kepadatan bangunan tinggi, perlu pemadatan vertikal.',
  },
  {
    name: 'Bakipandeyan',
    kecamatan: 'Baki',
    areaHa: 127.78,
    karakterSpasial: 'Pusat Administrasi Kecamatan Baki & Pasar Tradisional Baki',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Pusat pelayanan sekunder WP Baki.',
  },
  {
    name: 'Mancasan',
    kecamatan: 'Baki',
    areaHa: 266.31,
    karakterSpasial: 'Perumahan Campuran & Pertanian Transisi',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Zona penyangga antara Gentan dan pusat Baki.',
  },
  {
    name: 'Waru',
    kecamatan: 'Baki',
    areaHa: 185.73,
    karakterSpasial: 'Perumahan & Koridor Akses Kartasura/Gatak',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Titik simpul barat Baki.',
  },
  {
    name: 'Bentakan',
    kecamatan: 'Baki',
    areaHa: 137.34,
    karakterSpasial: 'Pertanian Sawah & Permukiman Tradisional',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'Sawah irigasi teknis LP2B terkonsolidasi.',
  },
  {
    name: 'Duwet',
    kecamatan: 'Baki',
    areaHa: 135.03,
    karakterSpasial: 'Pertanian & Permukiman Perdesaan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B terkonsolidasi.',
  },
  {
    name: 'Gedongan',
    kecamatan: 'Baki',
    areaHa: 130.38,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B terkonsolidasi.',
  },
  {
    name: 'Jetis',
    kecamatan: 'Baki',
    areaHa: 150.58,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B terkonsolidasi.',
  },
  {
    name: 'Kadilangu',
    kecamatan: 'Baki',
    areaHa: 110.36,
    karakterSpasial: 'Pertanian & Permukiman Perdesaan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B terkonsolidasi.',
  },
  {
    name: 'Ngrombo',
    kecamatan: 'Baki',
    areaHa: 143.89,
    karakterSpasial: 'Pertanian & Permukiman Campuran',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B terkonsolidasi.',
  },
  {
    name: 'Siwal',
    kecamatan: 'Baki',
    areaHa: 174.25,
    karakterSpasial: 'Pertanian & Batas Selatan Baki',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B terkonsolidasi.',
  },

  // GATAK (14 Desa)
  {
    name: 'Trangsan',
    kecamatan: 'Gatak',
    areaHa: 243.75,
    karakterSpasial: 'Sentra Kerajinan Rotan & Mebel Nasional, Ekosistem Ekspor',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Prioritas Delineasi Khusus: Kawasan Permukiman Industri Kerajinan Rotan (IKR).',
  },
  {
    name: 'Blimbing',
    kecamatan: 'Gatak',
    areaHa: 249.84,
    karakterSpasial: 'Simpul Transit Stasiun Gawok (KRL Solo–Yogyakarta)',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Prioritas Delineasi Khusus: Kawasan Berorientasi Transit (TOD Stasiun Gawok).',
  },
  {
    name: 'Mayang',
    kecamatan: 'Gatak',
    areaHa: 176.37,
    karakterSpasial: 'Permukiman Industri Kerajinan Rotan & Pergudangan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Penyangga klaster industri rotan Trangsan.',
  },
  {
    name: 'Krajan',
    kecamatan: 'Gatak',
    areaHa: 199.34,
    karakterSpasial: 'Pusat Kecamatan Gatak & Pelayanan Publik',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Pusat pemerintahan kecamatan Gatak.',
  },
  {
    name: 'Sraten',
    kecamatan: 'Gatak',
    areaHa: 101.94,
    karakterSpasial: 'Koridor Stasiun Gawok & Akses Baki',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: true, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Kawasan penyangga sirkulasi transit komuter.',
  },
  {
    name: 'Geneng',
    kecamatan: 'Gatak',
    areaHa: 139.67,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti lumbung padi Gatak.',
  },
  {
    name: 'Jati',
    kecamatan: 'Gatak',
    areaHa: 121.19,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Kagokan',
    kecamatan: 'Gatak',
    areaHa: 98.91,
    karakterSpasial: 'Pertanian & Permukiman Perdesaan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Klaseman',
    kecamatan: 'Gatak',
    areaHa: 98.17,
    karakterSpasial: 'Pertanian & Permukiman Perdesaan',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Luwang',
    kecamatan: 'Gatak',
    areaHa: 128.29,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Sanggung',
    kecamatan: 'Gatak',
    areaHa: 102.91,
    karakterSpasial: 'Pertanian & Batas Kabupaten Klaten',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: true },
    catatanTeknis: 'Batas barat Kabupaten Sukoharjo dengan Klaten.',
  },
  {
    name: 'Tempel',
    kecamatan: 'Gatak',
    areaHa: 97.78,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Trosemi',
    kecamatan: 'Gatak',
    areaHa: 130.52,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
  {
    name: 'Wironanggan',
    kecamatan: 'Gatak',
    areaHa: 140.28,
    karakterSpasial: 'Pertanian Sawah Irigasi Teknis',
    delineationRecommendation: { skenario1_administratif: true, skenario2_fungsional_perkotaan: false, skenario3_aglomerasi_lintas: false },
    catatanTeknis: 'LP2B inti.',
  },
];
