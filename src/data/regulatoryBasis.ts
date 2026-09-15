export interface RegulationDocument {
  id: string;
  orderNumber: number;
  code: string;
  title: string;
  formalNumber: string;
  tier: 'Nasional' | 'Provinsi' | 'Kabupaten' | 'Statistik' | 'RDTR_Eksisting';
  year: string;
  scope: string;
  keyDirectives: string[];
  wpImplications: {
    mojolaban: string;
    baki: string;
    gatak: string;
  };
  relevanceToRDTR: string;
}

export const REGULATORY_DOCUMENTS: RegulationDocument[] = [
  {
    id: 'reg-01',
    orderNumber: 1,
    code: 'PERDA_RTRW_KAB_01_2018',
    formalNumber: 'Peraturan Daerah Kabupaten Sukoharjo Nomor 1 Tahun 2018',
    title: 'Perda No. 1 Tahun 2018 tentang Perubahan atas Perda No. 14 Tahun 2011 tentang RTRW Kabupaten Sukoharjo 2011-2031',
    tier: 'Kabupaten',
    year: '2018',
    scope: 'Tata Ruang Wilayah Kabupaten Sukoharjo',
    keyDirectives: [
      'Menetapkan hirarki pusat pelayanan: Pusat Pelayanan Kawasan (PPK) Bekonang (Mojolaban), PPK Baki, dan PPK Gatak.',
      'Menetapkan koridor jalan arteri primer Kartasura-Surakarta-Sukoharjo dan kolektor primer penghubung simpul antar-kecamatan.',
      'Melindungi lahan sawah beririgasi teknis Daerah Irigasi (DI) Colo sebagai Lahan Pertanian Pangan Berkelanjutan (LP2B).',
      'Menetapkan sempadan Sungai Bengawan Solo minimal 100 meter sebagai kawasan perlindungan setempat.',
      'Menetapkan sentra industri rotan Trangsan (Gatak) dan industri jamu/gamelan (Mojolaban) sebagai kawasan peruntukan industri berbasis kearifan lokal.'
    ],
    wpImplications: {
      mojolaban: 'Penguatan PPK Bekonang sebagai pusat agropolitan & budaya; penegakan sempadan Bengawan Solo 100m; preservasi sawah beririgasi teknis Colo seluas >1.700 ha.',
      baki: 'Pengendalian alih fungsi lahan sawah menjadi perumahan di PPK Baki dan koridor Solo-Baki; penataan aglomerasi Solo Baru.',
      gatak: 'Perlindungan sentra industri mebel rotan Trangsan dan pemantapan Stasiun Gawok sebagai simpul perkeretaapian lokal.'
    },
    relevanceToRDTR: 'Landasan legal hierarkis utama dalam penetapan rencana pola ruang, struktur ruang, dan batas delineasi RDTR 3 WP.'
  },
  {
    id: 'reg-02',
    orderNumber: 2,
    code: 'PP_13_2017_RTRWN',
    formalNumber: 'Peraturan Pemerintah Nomor 13 Tahun 2017',
    title: 'PP No. 13 Tahun 2017 tentang Perubahan atas Peraturan Pemerintah No. 26 Tahun 2008 tentang RTRW Nasional',
    tier: 'Nasional',
    year: '2017',
    scope: 'Tata Ruang Nasional & Kawasan Strategis Nasional',
    keyDirectives: [
      'Menetapkan Kawasan Perkotaan Surakarta dan sekitarnya (Aglomerasi Subosukawonosraten) sebagai Pusat Kegiatan Nasional (PKN).',
      'Mengamanatkan pembatasan konversi lahan sawah beririgasi teknis di Pulau Jawa sebagai lumbung pangan strategis nasional.',
      'Mendorong pengembangan koridor transportasi massal berbasis rel (Jalur Ganda Elektrifikasi Solo-Yogyakarta).',
      'Pengendalian sempadan sungai pada Wilayah Sungai Bengawan Solo sebagai sungai lintas provinsi berkewenangan nasional (BBWS Bengawan Solo).'
    ],
    wpImplications: {
      mojolaban: 'Penyangga lumbung padi nasional dan perlindungan sempadan WS Bengawan Solo berkewenangan BBWSBS.',
      baki: 'Penyangga perkotaan PKN Solo Raya dengan arahan pengendalian alih fungsi lahan sawah kelas satu.',
      gatak: 'Penguatan simpul perkeretaapian nasional pada jalur double track elektrifikasi Solo-Yogya di koridor barat.'
    },
    relevanceToRDTR: 'Memastikan RDTR Sukoharjo selaras dengan mandat ketahanan pangan dan konektivitas strategis skala nasional.'
  },
  {
    id: 'reg-03',
    orderNumber: 3,
    code: 'RTRW_JATENG_2024_2044',
    formalNumber: 'Peraturan Daerah Provinsi Jawa Tengah Nomor 15 Tahun 2023',
    title: 'Perda RTRW Provinsi Jawa Tengah Tahun 2024-2044',
    tier: 'Provinsi',
    year: '2023',
    scope: 'Tata Ruang Wilayah Provinsi Jawa Tengah 20 Tahun',
    keyDirectives: [
      'Menempatkan Kawasan Solo Raya (termasuk Sukoharjo) sebagai Kawasan Strategis Pertumbuhan Ekonomi Cepat.',
      'Mendorong integrasi transportasi ramah lingkungan berbasis Transit-Oriented Development (TOD) pada simpul stasiun kereta api komuter.',
      'Menargetkan luas minimum LP2B Provinsi Jateng dan perlindungan sistem hidrologi DAS Bengawan Solo.',
      'Pengembangan sentra industri kerajinan rakyat berbasis ekspor bernilai tambah tinggi.'
    ],
    wpImplications: {
      mojolaban: 'Koridor hijau resiliensi bencana banjir luapan DAS Bengawan Solo dan klaster budaya kreatif.',
      baki: 'Penerapan konsep kota kompak (compact city) untuk menekan laju konversi lahan di perbatasan selatan Surakarta.',
      gatak: 'Mandat pengembangan simpul TOD Stasiun Gawok pada koridor KRL Solo-Yogya dan penguatan sentra ekspor rotan Trangsan.'
    },
    relevanceToRDTR: 'Menjadi acuan perumusan arahan zonasi koridor regional dan integrasi sistem jaringan transportasi antardaerah.'
  },
  {
    id: 'reg-04',
    orderNumber: 4,
    code: 'RPJMD_JATENG_2025_2029',
    formalNumber: 'Peraturan Daerah Provinsi Jawa Tengah tentang RPJMD 2025-2029',
    title: 'Perda RPJMD Provinsi Jawa Tengah Tahun 2025-2029',
    tier: 'Provinsi',
    year: '2025',
    scope: 'Pembangunan Jangka Menengah Jawa Tengah',
    keyDirectives: [
      'Prioritas transformasi ekonomi hijau dan penguatan kemandirian pangan daerah.',
      'Peningkatan konektivitas antarmoda transportasi perkotaan di Kawasan Aglomerasi Solo Raya.',
      'Revitalisasi dan modernisasi sentra industri kecil menengah (IKM) unggulan daerah agar menembus pasar global.',
      'Peningkatan kapasitas adaptasi dan mitigasi risiko bencana hidrometeorologi di sepanjang lembah sungai besar.'
    ],
    wpImplications: {
      mojolaban: 'Infrastruktur pengendalian banjir terpadu dan pengolahan limbah sentra industri jamu/alkohol secara komunal.',
      baki: 'Penguatan sarana prasarana perumahan perkotaan rendah emisi dan drainase zero run-off.',
      gatak: 'Bantuan hilirisasi desain dan sertifikasi kayu/rotan lestari (SVLK) untuk sentra kerajinan rotan Trangsan.'
    },
    relevanceToRDTR: 'Menyelaraskan indikasi program 5 tahunan RDTR dengan alokasi pendanaan provinsi.'
  },
  {
    id: 'reg-05',
    orderNumber: 5,
    code: 'RKPD_JATENG_2026',
    formalNumber: 'Peraturan Gubernur Jawa Tengah tentang RKPD Tahun 2026',
    title: 'RKPD Provinsi Jawa Tengah Tahun 2026',
    tier: 'Provinsi',
    year: '2026',
    scope: 'Rencana Kerja Tahunan Pemerintah Provinsi Jawa Tengah',
    keyDirectives: [
      'Fokus kerja 2026: Akselerasi digitalisasi perizinan tata ruang dan percepatan integrasi RDTR ke portal OSS RBA.',
      'Peningkatan produktivitas padi sawah beririgasi teknis di Sukoharjo sebagai pemasok utama cadangan beras Jateng.',
      'Penataan ruang sempadan sungai kritis dan normalisasi saluran pembuang primer Bengawan Solo.',
      'Fasilitasi simpul transit KRL Gawok sebagai hub pergerakan komuter harian Sukoharjo-Solo-Yogyakarta.'
    ],
    wpImplications: {
      mojolaban: 'Normalisasi inlet saluran drainase Bengawan Solo dan pemantapan peta LP2B.',
      baki: 'Penerapan standar KBLI untuk zona perdagangan jasa koridor Gentan-Baki.',
      gatak: 'Penyediaan fasilitas pejalan kaki dan park-and-ride di kawasan sekitar Stasiun Gawok.'
    },
    relevanceToRDTR: 'Memastikan muatan materi teknis RDTR siap terbit dan langsung operasional pada tahun anggaran berjalan 2026.'
  },
  {
    id: 'reg-06',
    orderNumber: 6,
    code: 'RPJPD_JATENG_2025_2045',
    formalNumber: 'Peraturan Daerah Provinsi Jawa Tengah tentang RPJPD 2025-2045',
    title: 'RPJPD Provinsi Jawa Tengah Tahun 2025-2045',
    tier: 'Provinsi',
    year: '2025',
    scope: 'Pembangunan Jangka Panjang Jawa Tengah (Visi 20 Tahun)',
    keyDirectives: [
      'Visi: "Jawa Tengah Maju, Sejahtera, dan Berkelanjutan Menuju Indonesia Emas 2045".',
      'Pola ruang masa depan berorientasi ketahanan ekologis (ecological security) dan efisiensi ruang berbasis teknologi.',
      'De-karbonisasi mobilitas perkotaan melalui jaringan rel kereta api komuter dan logistik terpadu.',
      'Perlindungan permanen ruang terbuka hijau dan ekosistem riparian sungai besar.'
    ],
    wpImplications: {
      mojolaban: 'Koridor hijau abadi sepanjang tepi Bengawan Solo sebagai koridor resiliensi iklim.',
      baki: 'Kawasan hunian kompak dengan densitas terukur dan perlindungan ruang terbuka hijau mikro.',
      gatak: 'Simpul industri kreatif rendah karbon dan integrasi penuh dengan jalur rel KRL Solo-Yogya.'
    },
    relevanceToRDTR: 'Menyediakan horizon jangka panjang bagi peraturan zonasi agar tidak usang dalam rentang 20 tahun.'
  },
  {
    id: 'reg-07',
    orderNumber: 7,
    code: 'RP3KP_LAMPIRAN_I',
    formalNumber: 'Lampiran I Perda RP3KP Kabupaten Sukoharjo',
    title: 'Lampiran I Perda Rencana Pembangunan dan Pengembangan Perumahan dan Kawasan Permukiman (RP3KP) Kabupaten Sukoharjo',
    tier: 'Kabupaten',
    year: '2022',
    scope: 'Delineasi Kebutuhan dan Arahan Lokasi Perumahan',
    keyDirectives: [
      'Identifikasi proyeksi backlog perumahan dan arahan kebutuhan lahan permukiman baru.',
      'Delineasi kawasan siap bangun (Kasiba) dan lingkungan siap bangun (Lisiba) pada koridor peri-urban Baki dan Mojolaban.',
      'Penetapan rasio kebutuhan penyediaan prasarana, sarana, dan utilitas umum (PSU) minimal 30% pada kawasan perumahan formal.',
      'Standar teknis kepadatan bangunan perumahan (Kepadatan Tinggi di Gentan-Baki, Sedang di Bekonang, Rendah di Trangsan).'
    ],
    wpImplications: {
      mojolaban: 'Penyediaan perumahan kepadatan sedang di koridor Bekonang-Palur dengan kewajiban retensi drainase.',
      baki: 'Pusat pengembangan perumahan vertikal / townhouse kompak di Gentan untuk mengurangi okupasi sawah horizontal.',
      gatak: 'Pengembangan perumahan berbasis perdesaan yang serasi dengan bengkel kerja industri rotan Trangsan.'
    },
    relevanceToRDTR: 'Menjadi basis perhitungan alokasi luas Zona Perumahan (R-1, R-2, R-3) dan standar Koefisien Dasar Bangunan (KDB).'
  },
  {
    id: 'reg-08',
    orderNumber: 8,
    code: 'RP3KP_LAMPIRAN_II',
    formalNumber: 'Lampiran II Perda RP3KP Kabupaten Sukoharjo',
    title: 'Lampiran II Perda Rencana Pembangunan dan Pengembangan Perumahan dan Kawasan Permukiman (RP3KP) Kabupaten Sukoharjo',
    tier: 'Kabupaten',
    year: '2022',
    scope: 'Matriks Indikasi Program & Pencegahan Permukiman Kumuh',
    keyDirectives: [
      'Matriks indikasi program sektoral perumahan dan penataan permukiman kumuh perdesaan/perkotaan.',
      'Larangan mutlak pembangunan hunian baru pada kawasan rawan bencana bantaran sungai dan sempadan jalur kereta api.',
      'Program konsolidasi tanah perkotaan (urban land consolidation) pada sentra pertumbuhan baru.',
      'Peningkatan kualitas sanitasi, penyediaan air bersih jaringan perpipaan, dan pengelolaan persampahan terpadu.'
    ],
    wpImplications: {
      mojolaban: 'Pencegahan perumahan liar di bantaran Bengawan Solo dan relokasi bertahap rumah di zona genangan tinggi.',
      baki: 'Konsolidasi tanah dan penataan sistem sanitasi komunal di kantong-kantong permukiman padat Baki.',
      gatak: 'Pengamanan sempadan rel kereta api 11m dari as rel dan pemisahan fungsi gudang rotan dari ruang tidur permukiman.'
    },
    relevanceToRDTR: 'Menentukan ketentuan khusus (overlay) keselamatan permukiman dan matriks ITBX perumahan.'
  },
  {
    id: 'reg-09',
    orderNumber: 9,
    code: 'PERDA_RPJMD_KAB_04_2025',
    formalNumber: 'Peraturan Daerah Kabupaten Sukoharjo Nomor 4 Tahun 2025',
    title: 'Perda No. 4 Tahun 2025 tentang RPJMD Kabupaten Sukoharjo Periode 2025-2029',
    tier: 'Kabupaten',
    year: '2025',
    scope: 'Pembangunan Jangka Menengah Kabupaten Sukoharjo 5 Tahun',
    keyDirectives: [
      'Misi Daerah: Peningkatan pertumbuhan ekonomi berbasis potensi lokal (pertanian modern dan IKM kreatif).',
      'Peningkatan kualitas infrastruktur wilayah yang berwawasan lingkungan dan tangguh bencana.',
      'Penataan ruang terpadu dan penegakan regulasi tata ruang untuk menjamin kepastian investasi daerah.',
      'Target penyusunan dan penetapan Perkada RDTR di seluruh wilayah perencanaan prioritas.'
    ],
    wpImplications: {
      mojolaban: 'Realisasi sentra jamu higienis Bekonang, penataan desa wisata Wirun, dan perlindungan 1.700 ha sawah irigasi.',
      baki: 'Peningkatan kapasitas jalan dan drainase wilayah peri-urban Baki-Gentan guna mengatasi kemacetan dan genangan.',
      gatak: 'Revitalisasi ekosistem bisnis ekspor rotan Trangsan dan penataan kawasan terintegrasi Stasiun KRL Gawok.'
    },
    relevanceToRDTR: 'Menjadi payung hukum kebijakan pembangunan 5 tahunan Pemkab Sukoharjo yang diterjemahkan ke dalam RDTR.'
  },
  {
    id: 'reg-10',
    orderNumber: 10,
    code: 'PERDA_RPJPD_KAB_06_2024',
    formalNumber: 'Peraturan Daerah Kabupaten Sukoharjo Nomor 6 Tahun 2024',
    title: 'Perda No. 6 Tahun 2024 tentang RPJPD Kabupaten Sukoharjo Tahun 2025-2045',
    tier: 'Kabupaten',
    year: '2024',
    scope: 'Pembangunan Jangka Panjang Kabupaten Sukoharjo 20 Tahun',
    keyDirectives: [
      'Visi 2045: "Kabupaten Sukoharjo yang Maju, Tangguh, Berdaya Saing, dan Berkelanjutan Berbasis Pertanian Modern dan Industri Kreatif".',
      'Menjaga predikat Sukoharjo sebagai Lumbung Padi Abadi Jawa Tengah melalui moratorium konversi sawah irigasi teknis.',
      'Transformasi desa menjadi pusat pertumbuhan ekonomi kreatif berbasis kerajinan dan agrowisata.',
      'Perwujudan jaringan infrastruktur cerdas (smart infrastructure) yang terintegrasi dengan Aglomerasi Solo Raya.'
    ],
    wpImplications: {
      mojolaban: 'Agropolitan terpadu berbasis kearifan budaya lokal dan ketahanan pangan DAS Bengawan Solo.',
      baki: 'Kawasan permukiman urban mandiri, tertib tata ruang, ramah pejalan kaki, dan bebas banjir genangan.',
      gatak: 'Sentra industri kreatif rotan berdaya saing internasional berpadu dengan simpul transportasi modern Gawok.'
    },
    relevanceToRDTR: 'Memberikan kepastian visi spasial 20 tahunan untuk penetapan zonasi LP2B dan zona industri kreatif.'
  },
  {
    id: 'reg-11',
    orderNumber: 11,
    code: 'PERBUP_RKPD_KAB_19_2025',
    formalNumber: 'Peraturan Bupati Sukoharjo Nomor 19 Tahun 2025',
    title: 'Perbup No. 19 Tahun 2025 tentang RKPD Kabupaten Sukoharjo Tahun 2026',
    tier: 'Kabupaten',
    year: '2025',
    scope: 'Rencana Kerja Tahunan Pemerintah Kabupaten Sukoharjo 2026',
    keyDirectives: [
      'Tema Pembangunan 2026: "Akselerasi Pertumbuhan Ekonomi Inklusif melalui Optimalisasi Tata Ruang Terpadu, Ketahanan Pangan Daerah, dan Penguatan Daya Saing Sentra Industri Lokal".',
      'Target spesifik penyelesaian RDTR WP Mojolaban, WP Baki, dan WP Gatak hingga tahap persetujuan substansi Kemen ATR/BPN.',
      'Alokasi anggaran fisik peningkatan jaringan irigasi tersier dan rehabilitasi drainase perkotaan.',
      'Penguatan kelembagaan pengawasan perizinan pemanfaatan ruang di tingkat kecamatan dan desa.'
    ],
    wpImplications: {
      mojolaban: 'Fokus verifikasi faktual delineasi batas WP Mojolaban dan sinkronisasi sempadan Bengawan Solo.',
      baki: 'Penyusunan aturan ketat ITBX untuk izin persetujuan bangunan gedung (PBG) klaster perumahan baru di Baki.',
      gatak: 'Penyusunan rencana tata bangunan dan lingkungan (RTBL) koridor Stasiun Gawok dan sentra rotan Trangsan.'
    },
    relevanceToRDTR: 'Dasar operasional penganggaran dan target deliverable pekerjaan penyusunan RDTR pada tahun 2026.'
  },
  {
    id: 'reg-12',
    orderNumber: 12,
    code: 'BPS_SUKOHARJO_DALAM_ANGKA_2026',
    formalNumber: 'BPS Kabupaten Sukoharjo (Publikasi 2026)',
    title: 'Kabupaten Sukoharjo Dalam Angka 2026',
    tier: 'Statistik',
    year: '2026',
    scope: 'Data Statistik Demografi, Ekonomi, dan Penggunaan Lahan Resmi',
    keyDirectives: [
      'Kecamatan Mojolaban: Penduduk 93.420 jiwa, luas 3.554 Ha, luas sawah irigasi teknis 1.714 Ha (48,2%), kepadatan 2.628 jiwa/km².',
      'Kecamatan Baki: Penduduk 74.850 jiwa, luas 2.197 Ha, lahan terbangun mencapai 1.428 Ha (65,0%), laju konversi lahan tertinggi di Sukoharjo.',
      'Kecamatan Gatak: Penduduk 56.120 jiwa, luas 1.947 Ha, lahan sawah 996 Ha (51,2%), sentra rotan Trangsan menyerap >12.000 tenaga kerja.',
      'Struktur PDRB Kabupaten Sukoharjo: Sektor Industri Pengolahan berkontribusi 38,4%, Perdagangan & Jasa 18,2%, Pertanian 12,8%.'
    ],
    wpImplications: {
      mojolaban: 'Basis angka penetapan luas LP2B 1.714 Ha dan proyeksi daya dukung air minum untuk 93.420 jiwa.',
      baki: 'Bukti empiris fragmentasi lahan dan laju konversi kritis yang menuntut kebijakan Urban Growth Containment.',
      gatak: 'Justifikasi pengalokasian Zona Khusus Industri Kreatif Rotan (IKR) dan zona TOD Stasiun Gawok.'
    },
    relevanceToRDTR: 'Sumber data kuantitatif ground-truth resmi untuk kalibrasi analisis spasial GEE dan proyeksi kebutuhan ruang 20 tahun.'
  },
  {
    id: 'reg-13',
    orderNumber: 13,
    code: 'UU_59_2024_RPJPN',
    formalNumber: 'Undang-Undang Nomor 59 Tahun 2024',
    title: 'UU No. 59 Tahun 2024 tentang Rencana Pembangunan Jangka Panjang Nasional (RPJPN) 2025-2045',
    tier: 'Nasional',
    year: '2024',
    scope: 'Rencana Pembangunan Jangka Panjang Nasional Menuju Indonesia Emas 2045',
    keyDirectives: [
      'Pilar Pembangunan Berkelanjutan: Perlindungan keanekaragaman hayati, ketahanan pangan, dan swasembada pangan abadi.',
      'Transformasi Perkotaan: Penerapan prinsip Compact, Resilient, and Smart Cities untuk mencegah urban sprawl.',
      'Transisi Ekonomi: Penguatan daya saing industri berbasis rantai nilai lokal dan warisan budaya nusantara.',
      'Integrasi Tata Ruang Darat, Pesisir, dan Udara dengan penegakan hukum tata ruang yang berkepastian.'
    ],
    wpImplications: {
      mojolaban: 'Pelaksanaan pilar ketahanan pangan padi dan konservasi koridor riparian sungai Bengawan Solo.',
      baki: 'Implementasi konsep Compact City untuk menahan perluasan acak wilayah peri-urban Solo Raya.',
      gatak: 'Hilirisasi industri kreatif bernilai ekspor (rotan Trangsan) sesuai pilar transformasi ekonomi nasional.'
    },
    relevanceToRDTR: 'Landasan filosofis dan hukum tertinggi arah penataan ruang jangka panjang Republik Indonesia.'
  },
  {
    id: 'reg-14',
    orderNumber: 14,
    code: 'PERPRES_117_2025',
    formalNumber: 'Peraturan Presiden Nomor 117 Tahun 2025',
    title: 'Perpres No. 117 Tahun 2025 tentang Percepatan Investasi dan Kemudahan Berusaha melalui Digitalisasi Penataan Ruang',
    tier: 'Nasional',
    year: '2025',
    scope: 'Digitalisasi Tata Ruang & Integrasi Perizinan Berusaha OSS-RBA',
    keyDirectives: [
      'Mengamanatkan percepatan legalisasi RDTR menjadi Peraturan Kepala Daerah (Perkada) yang terintegrasi penuh ke sistem OSS.',
      'Standarisasi digitalisasi peta RDTR skala 1:5.000 berformat geodatabase GIS sesuai standar Kemen ATR/BPN.',
      'Penyusunan tabel Ketentuan Kegiatan dan Penggunaan Lahan (ITBX) berbasis kodefikasi KBLI (Klasifikasi Baku Lapangan Usaha Indonesia).',
      'Pemberian insentif penataan ruang bagi investasi ramah lingkungan dan disinsentif bagi kegiatan pemicu degradasi lingkungan.'
    ],
    wpImplications: {
      mojolaban: 'Penyusunan matriks ITBX berkodefikasi KBLI untuk industri jamu higienis dan pergudangan koridor Palur.',
      baki: 'Digitalisasi aturan zonasi hunian dan komersial agar izin Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) otomatis terbit di OSS.',
      gatak: 'Fasilitasi kemudahan izin berusaha OSS bagi para pengrajin dan eksportir rotan di Desa Wisata Trangsan.'
    },
    relevanceToRDTR: 'Mandat teknis format output RDTR agar compliant dengan sistem Konfirmasi KKPR Otomatis pada OSS RBA.'
  },
  {
    id: 'reg-15',
    orderNumber: 15,
    code: 'SK_BUPATI_600_3_342_2026_GROGOL',
    formalNumber: 'Keputusan Bupati Sukoharjo Nomor : 600.3/342 Tahun 2026',
    title: 'Keputusan Bupati Sukoharjo Nomor : 600.3/342 Tahun 2026 tentang Penetapan Delineasi Wilayah Perencanaan Rencana Detail Tata Ruang Kawasan Perkotaan Kecamatan Grogol Kabupaten Sukoharjo',
    tier: 'RDTR_Eksisting',
    year: '2026',
    scope: 'RDTR Eksisting Telah Ditetapkan (TIDAK MASUK WILAYAH PEKERJAAN RDTR BARU)',
    keyDirectives: [
      'BUPATI SUKOHARJO PROVINSI JAWA TENGAH KEPUTUSAN BUPATI SUKOHARJO NOMOR : 600.3/342 TAHUN 2026 TENTANG PENETAPAN DELINEASI WILAYAH PERENCANAAN RENCANA DETAIL TATA RUANG KAWASAN PERKOTAAN KECAMATAN GROGOL KABUPATEN SUKOHARJO.',
      'Menetapkan delineasi definitif RDTR Kawasan Perkotaan Kecamatan Grogol mencakup seluruh 14 desa/kelurahan (Solo Baru, Telukan, Madegondo, Langenharjo, Grogol, Kwarasan, Banaran, Gedangan, Cemani, Manang, Pandeyan, Sanggrahan, Kadokan, Parangjoro).',
      'STATUS HUKUM: RDTR EKSISTING TELAH DITETAPKAN SECARA MANDIRI OLEH PEMKAB SUKOHARJO.',
      'KETENTUAN PEMBATAS: KECAMATAN GROGOL BUKAN MERUPAKAN WILAYAH PEKERJAAN PENYUSUNAN RDTR BARU TAHUN ANGGARAN 2026.',
      'Wilayah pekerjaan baru hanya mencakup 3 Wilayah Perencanaan (WP): WP Mojolaban, WP Baki, dan WP Gatak.',
      'Kecamatan Grogol berkedudukan sebagai KAWASAN PENETAPAN EKSISTING PERBATASAN yang menjadi rujukan konektivitas fisik jaringan jalan, drainase makro, dan buffer zonasi dengan WP Baki (barat) dan WP Mojolaban (timur).'
    ],
    wpImplications: {
      mojolaban: 'Berbatasan langsung di sebelah barat dengan RDTR Eksisting Grogol; keselarasan sistem pembuang drainase ke Bengawan Solo.',
      baki: 'Berbatasan langsung di sebelah timur dengan RDTR Eksisting Grogol (Solo Baru); penyesuaian hierarki jalan kolektor Baki-Solo Baru.',
      gatak: 'Konektivitas jalan arteri sekunder penghubung koridor Gatak-Grogol untuk distribusi angkutan logistik mebel rotan.'
    },
    relevanceToRDTR: 'PENETAPAN DELINEASI BATAS EKSTERNAL: Menjadi pembatas hukum tegas bahwa Kecamatan Grogol telah memiliki RDTR sendiri dan dikecualikan dari pekerjaan penyusunan RDTR 3 WP.'
  }
];

export interface WPThematicSummary {
  wpId: 'mojolaban' | 'baki' | 'gatak';
  wpName: string;
  kabupaten: string;
  delineasiLuasHa: number;
  jumlahDesa: number;
  temaRDTR: string;
  karakterSpasialUtama: string;
  dasarHukumPenetapan: {
    regulasi: string;
    mandatUtama: string;
  }[];
  fokusAlokasiPolaRuang: {
    kode: string;
    nama: string;
    persentase: number;
    dasarKebijakan: string;
  }[];
  arahanSpesifikSempadanDanJaringan: string[];
}

export const WP_THEMATIC_PROFILES: Record<'mojolaban' | 'baki' | 'gatak', WPThematicSummary> = {
  mojolaban: {
    wpId: 'mojolaban',
    wpName: 'Wilayah Perencanaan (WP) Kecamatan Mojolaban',
    kabupaten: 'Kabupaten Sukoharjo',
    delineasiLuasHa: 3554,
    jumlahDesa: 15,
    temaRDTR: 'Pengendalian Aglomerasi Agro-Perkotaan, Ketahanan Ekologis Sempadan Bengawan Solo, dan Revitalisasi Sentra Budaya-Industri Kreatif Tradisional (Jamu Bekonang & Gamelan Wirun)',
    karakterSpasialUtama: 'Wilayah transisi agro-urban dinamis di timur Sungai Bengawan Solo dengan dualisme kutub ekonomi Palur (perdagangan-pergudangan) dan Bekonang (pasar tradisional & jamu), serta lumbung padi irigasi teknis DI Colo.',
    dasarHukumPenetapan: [
      {
        regulasi: 'Perda Kab. Sukoharjo No. 1/2018 (RTRW)',
        mandatUtama: 'Penetapan PPK Bekonang sebagai pusat agropolitan & jamu; sempadan Bengawan Solo 100m kawasan lindung; perlindungan LP2B.'
      },
      {
        regulasi: 'PP No. 13/2017 & RTRW Jateng 2024-2044',
        mandatUtama: 'Koridor hijau resiliensi bencana DAS Bengawan Solo berkewenangan BBWSBS dan penyangga ketahanan pangan Solo Raya.'
      },
      {
        regulasi: 'Lampiran I & II Perda RP3KP Sukoharjo',
        mandatUtama: 'Pembatasan perumahan liar di dataran banjir aluvial dan penataan perumahan kepadatan sedang di koridor Bekonang-Palur.'
      },
      {
        regulasi: 'Perda No. 4/2025 (RPJMD) & Perbup No. 19/2025 (RKPD 2026)',
        mandatUtama: 'Revitalisasi Desa Budaya Wirun (Gamelan UNESCO), modernisasi sentra jamu Bekonang ramah lingkungan dengan IPAL komunal.'
      },
      {
        regulasi: 'BPS Kabupaten Sukoharjo Dalam Angka 2026',
        mandatUtama: '1.714 Ha sawah beririgasi teknis berproduksi tinggi (48,2% luas wilayah); populasi 93.420 jiwa dengan kepadatan 2.628 jiwa/km².'
      }
    ],
    fokusAlokasiPolaRuang: [
      {
        kode: 'LP2B',
        nama: 'Zona Lahan Pertanian Pangan Berkelanjutan',
        persentase: 44.5,
        dasarKebijakan: 'Mandat Perda 1/2018 & RPJPD 6/2024 untuk melindungi sawah irigasi teknis DI Colo 1.714 Ha.'
      },
      {
        kode: 'PS-BS',
        nama: 'Zona Perlindungan Setempat (Sempadan Bengawan Solo 100m)',
        persentase: 12.5,
        dasarKebijakan: 'Permen PUPR 28/2015 & PP 13/2017: Sabuk hijau penahan banjir dan ruang terbuka hijau pasif.'
      },
      {
        kode: 'R-2',
        nama: 'Zona Perumahan Kepadatan Sedang',
        persentase: 24.8,
        dasarKebijakan: 'Lampiran I RP3KP: Akomodasi pertumbuhan penduduk 93.420 jiwa di koridor Palur-Bekonang.'
      },
      {
        kode: 'K-1',
        nama: 'Zona Perdagangan & Jasa Koridor Palur',
        persentase: 8.2,
        dasarKebijakan: 'RTRW 1/2018: Koridor komersial dan pergudangan logistik regional Palur-Karanganyar.'
      },
      {
        kode: 'I-K',
        nama: 'Zona Industri Kreatif & Tradisional Bekonang-Wirun',
        persentase: 4.5,
        dasarKebijakan: 'RPJMD 4/2025: Klaster kerajinan gamelan dan jamu tradisional higienis bersertifikasi.'
      },
      {
        kode: 'RTH',
        nama: 'Zona Ruang Terbuka Hijau & Kolam Retensi',
        persentase: 5.5,
        dasarKebijakan: 'Ketentuan UU Penataan Ruang: Retensi genangan air di kawasan aluvial rendah.'
      }
    ],
    arahanSpesifikSempadanDanJaringan: [
      'Garis Sempadan Bengawan Solo: Ditetapkan 100 meter dari tepi palung sungai (non-perkotaan/kawasan lindung). KDB 0%, dilarang bangunan permanen, wajib sabuk tanaman konservasi vetiver dan bambu.',
      'Garis Sempadan Sungai Kali Jenes: 30 meter untuk kawasan bertanggul di perbatasan barat.',
      'Jalan Arteri Sekunder Palur-Bekonang: ROW 24m, sempadan bangunan (GSB) 12m dari as jalan.',
      'Konektivitas ke RDTR Eksisting Grogol: Akses timur Solo Baru melalui Jembatan Bacem diarahkan dengan sistem pengendali beban tonase.'
    ]
  },
  baki: {
    wpId: 'baki',
    wpName: 'Wilayah Perencanaan (WP) Kecamatan Baki',
    kabupaten: 'Kabupaten Sukoharjo',
    delineasiLuasHa: 2197,
    jumlahDesa: 14,
    temaRDTR: 'Pengendalian Pertumbuhan Peri-Urban (Urban Growth Containment), Infill Densifikasi Permukiman Mandiri, Perlindungan Sawah Terkonsolidasi (LP2B), dan Integrasi Koridor Komersial Solo-Baki',
    karakterSpasialUtama: 'Inti pertumbuhan peri-urban bertekanan pembangunan sangat tinggi (DPI = 89,2) akibat limpahan perumahan Surakarta dan Solo Baru (Grogol), dengan lahan terbangun mencapai 65,0% (1.428 Ha) dan fragmentasi sawah kritis.',
    dasarHukumPenetapan: [
      {
        regulasi: 'Perda Kab. Sukoharjo No. 1/2018 (RTRW)',
        mandatUtama: 'PPK Baki sebagai pusat pelayanan pemukiman perkotaan penyangga Surakarta; pembatasan konversi sawah irigasi Colo.'
      },
      {
        regulasi: 'UU No. 59/2024 (RPJPN) & PP 13/2017',
        mandatUtama: 'Penerapan konsep kota kompak (compact city) untuk menghentikan fenomena urban sprawl tak terkendali di Solo Raya.'
      },
      {
        regulasi: 'Lampiran I & II Perda RP3KP Sukoharjo',
        mandatUtama: 'Kawasan Gentan-Baki sebagai prioritas densifikasi hunian vertikal/townhouse dengan kewajiban PSU 30% dan sumur injeksi air hujan.'
      },
      {
        regulasi: 'Keputusan Bupati Sukoharjo No. 600.3/342/2026 (RDTR Eksisting Grogol)',
        mandatUtama: 'Sinkronisasi tata ruang perbatasan timur Baki yang berhadapan langsung dengan kawasan modern Solo Baru (Kecamatan Grogol).'
      },
      {
        regulasi: 'BPS Sukoharjo Dalam Angka 2026',
        mandatUtama: 'Populasi 74.850 jiwa, kepadatan tertinggi 3.410 jiwa/km², lahan terbangun 1.428 Ha (65,0%), sisa sawah 668 Ha terfragmentasi.'
      }
    ],
    fokusAlokasiPolaRuang: [
      {
        kode: 'R-1',
        nama: 'Zona Perumahan Kepadatan Tinggi (Infill Gentan)',
        persentase: 38.5,
        dasarKebijakan: 'Lampiran I RP3KP: Pemanfaatan lahan tidur/kavling eksisting, KDB max 70%, KLB 2.4, vertikal kompak.'
      },
      {
        kode: 'R-2',
        nama: 'Zona Perumahan Kepadatan Sedang',
        persentase: 22.0,
        dasarKebijakan: 'Moratorium ketat izin kavling perumahan baru di atas lahan sawah aktif.'
      },
      {
        kode: 'LP2B-K',
        nama: 'Zona Lahan Pertanian Pangan Abadi Terkonsolidasi',
        persentase: 18.2,
        dasarKebijakan: 'Perda RTRW 1/2018 & RPJPD 6/2024: Menjaga 400 Ha sawah inti terpadu agar tidak punah.'
      },
      {
        kode: 'K-2',
        nama: 'Zona Perdagangan & Jasa Terpadu (Koridor Solo-Baki)',
        persentase: 11.5,
        dasarKebijakan: 'Perpres 117/2025: Koridor bisnis modern terintegrasi OSS dengan penyediaan parkir off-street.'
      },
      {
        kode: 'RTH-P',
        nama: 'Zona Ruang Terbuka Hijau & Kolam Retensi Drainase',
        persentase: 9.8,
        dasarKebijakan: 'Mitigasi run-off banjir genangan akibat penutupan lahan kedap air di Gentan dan Kudu.'
      }
    ],
    arahanSpesifikSempadanDanJaringan: [
      'Garis Sempadan Kali Jenes: 30 meter di bagian bertanggul perkotaan; zero run-off bagi perumahan di bantarannya.',
      'Koridor Jalan Raya Solo-Baki & Jl. Raya Gentan: ROW 16m, GSB 8m dari tepi jalan, wajib jalur pedestrian ramah disabilitas.',
      'Hubungan dengan RDTR Eksisting Grogol: Penyelarasan elevasi saluran drainase sekunder Baki yang mengalir menuju saluran pembuang Grogol.'
    ]
  },
  gatak: {
    wpId: 'gatak',
    wpName: 'Wilayah Perencanaan (WP) Kecamatan Gatak',
    kabupaten: 'Kabupaten Sukoharjo',
    delineasiLuasHa: 1947,
    jumlahDesa: 14,
    temaRDTR: 'Pengembangan Kawasan Agro-Industri Berkelanjutan, Penguatan Sentra Ekspor Rotan Trangsan, Konservasi Lumbung Pangan Abadi (LP2B), dan Optimalisasi Simpul Transit Kereta Api (TOD Stasiun Gawok)',
    karakterSpasialUtama: 'Wilayah produktif berdaya lentur tinggi yang mempertahankan 51,2% wilayahnya (996 Ha) sebagai sawah irigasi teknis utuh, sentra industri rotan kelas dunia di Desa Trangsan, dan simpul KRL Solo-Yogya di Stasiun Gawok.',
    dasarHukumPenetapan: [
      {
        regulasi: 'Perda Kab. Sukoharjo No. 1/2018 (RTRW)',
        mandatUtama: 'Penetapan Trangsan sebagai Kawasan Sentra Industri Kerajinan Rotan; perlindungan inti sawah LP2B >900 Ha.'
      },
      {
        regulasi: 'RTRW Prov. Jateng 2024-2044 & RPJMD Jateng 2025-2029',
        mandatUtama: 'Pengembangan simpul TOD Stasiun KRL Gawok pada koridor ganda Solo-Yogya dan hilirisasi industri mebel ekspor.'
      },
      {
        regulasi: 'Perpres No. 117/2025 (Kemudahan Berusaha & OSS)',
        mandatUtama: 'Pemberian kepastian zonasi IKM kerajinan rotan untuk perizinan ekspor dan izin amdal terpadu.'
      },
      {
        regulasi: 'Perda No. 4/2025 (RPJMD Sukoharjo) & Perda 6/2024 (RPJPD)',
        mandatUtama: 'Penguatan Desa Wisata Rotan Trangsan, logistik terpadu bahan baku rotan, dan modernisasi mesin ramah debu.'
      },
      {
        regulasi: 'BPS Sukoharjo Dalam Angka 2026',
        mandatUtama: 'Luas sawah 996 Ha berproduksi 6,4 ton/Ha; menyerap 12.000 pengrajin rotan; populasi 56.120 jiwa.'
      }
    ],
    fokusAlokasiPolaRuang: [
      {
        kode: 'LP2B-U',
        nama: 'Zona Inti Pertanian Pangan Berkelanjutan (LP2B Abadi)',
        persentase: 48.5,
        dasarKebijakan: 'Mandat RTRW 1/2018 & RPJPN UU 59/2024: 996 Ha sawah irigasi teknis dengan perlindungan mutlak.'
      },
      {
        kode: 'IKR',
        nama: 'Zona Industri Kreatif Kerajinan Rotan & Kayu Trangsan',
        persentase: 14.2,
        dasarKebijakan: 'RPJMD 4/2025: Sentra manufaktur rotan berstandar ekspor dengan fasilitas instalasi pengolahan debu/finishing.'
      },
      {
        kode: 'TOD',
        nama: 'Zona Pengembangan Transit Stasiun Gawok (Mixed-Use)',
        persentase: 6.8,
        dasarKebijakan: 'RTRW Jateng 2024-2044: Hunian kompak, komersial pejalan kaki, terminal transit park-and-ride KRL.'
      },
      {
        kode: 'R-3',
        nama: 'Zona Perumahan Kepadatan Sedang/Rendah Berwawasan Perdesaan',
        persentase: 18.5,
        dasarKebijakan: 'Lampiran I RP3KP: Permukiman ramah lingkungan tipologi arsitektur limasan/joglo.'
      },
      {
        kode: 'S-KA',
        nama: 'Zona Sempadan Rel Kereta Api (Double Track)',
        persentase: 4.2,
        dasarKebijakan: 'UU Perkeretaapian & Permenhub 60/2012: Buffer keselamatan 11m dari as rel rel kereta api.'
      },
      {
        kode: 'RTH',
        nama: 'Zona Ruang Terbuka Hijau & Sempadan Saluran Irigasi',
        persentase: 7.8,
        dasarKebijakan: 'Pengamanan tanggul saluran irigasi teknis primer dan ruang terbuka publik desa.'
      }
    ],
    arahanSpesifikSempadanDanJaringan: [
      'Garis Sempadan Rel Kereta Api (Double Track Solo-Yogya): 11 meter dari as rel terluar. Larangan total bangunan hunian/gudang, wajib pagar pengaman dan peredam getaran/kebisingan.',
      'Garis Sempadan Kali Dengkeng: 20 meter dari bibir sungai alam.',
      'Akses Jalan Kolektor Stasiun Gawok & Kawasan Industri Trangsan: Peningkatan kapasitas jalan minimum 8 meter untuk kelancaran manuver kontainer logistik 20-40 feet.',
      'Sistem Sirkulasi Gawok TOD: Jalur pedestrian kanopi tertutup dari pintu stasiun menuju pangkalan transportasi umum dan area parkir sepeda/motor.'
    ]
  }
};
