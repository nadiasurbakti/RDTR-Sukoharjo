// Data Infrastruktur Jaringan Jalan, Jalur Rel KRL, dan Jaringan Sungai beserta Sempadan
// Disesuaikan dengan penelusuran garis riil (bukan garis lurus/melintang) di Wilayah Sukoharjo
// Mencakup WP Gatak, WP Baki, dan WP Mojolaban
// Serta mematuhi Permen PUPR No. 28/PRT/M/2015 (Garis Sempadan Sungai) dan Standar RDTR ATR/BPN

export interface RoadFeature {
  id: string;
  name: string;
  category: 'arteri' | 'kolektor' | 'lingkungan';
  categoryLabel: string;
  wp: string;
  widthMeters: number;
  speedKmh: number;
  surface: string;
  rdtrClassification: string;
  status: 'Eksisting' | 'Rencana Peningkatan' | 'Koridor Strategis';
  coordinates: [number, number][]; // [latitude, longitude]
}

export interface RailwayFeature {
  id: string;
  name: string;
  type: 'KRL Commuter Line' | 'Kereta Api Antarkota / Perintis';
  tracks: 'Ganda (Double Track)' | 'Tunggal (Single Track)';
  electrified: boolean;
  voltage: string;
  operator: string;
  corridor: string;
  description: string;
  coordinates: [number, number][]; // [latitude, longitude]
}

export interface RailwayStation {
  id: string;
  name: string;
  code: string;
  elevation: string;
  isTOD: boolean;
  todConcept: string;
  wp: string;
  coordinates: [number, number]; // [lat, lng]
}

export interface RiverFeature {
  id: string;
  name: string;
  type: 'Sungai Utama' | 'Anak Sungai' | 'Saluran Irigasi Primer';
  wp: string;
  lengthKm: number;
  description: string;
  coordinates: [number, number][]; // [lat, lng]
}

export interface SempadanFeature {
  id: string;
  riverName: string;
  bufferWidthMeters: number;
  legalBasis: string;
  zoningRule: string;
  allowedUses: string[];
  prohibitedUses: string[];
  polygonCoordinates: [number, number][]; // [lat, lng]
}

// --------------------------------------------------------------------------
// 1. INFRASTRUKTUR JALAN (Garis Riil Tracing)
// --------------------------------------------------------------------------

export const REAL_ROADS: RoadFeature[] = [
  // A. JALAN ARTERI PRIMER & SEKUNDER
  {
    id: 'art-01',
    name: 'Jl. Ir. Soekarno / Solo Baru - Sukoharjo (Arteri Primer)',
    category: 'arteri',
    categoryLabel: 'Jalan Arteri Primer',
    wp: 'Baki / Grogol (Koridor Utama Sukoharjo)',
    widthMeters: 24,
    speedKmh: 60,
    surface: 'Aspal Hotmix (4 Jalur 2 Arah Terbagi)',
    rdtrClassification: 'Arteri Primer Koridor Pusat Bisnis Solo Baru - Sukoharjo',
    status: 'Eksisting',
    coordinates: [
      [-7.5835, 110.8192],
      [-7.5878, 110.8198],
      [-7.5932, 110.8206],
      [-7.5985, 110.8218], // Bundaran Pandawa Solo Baru
      [-7.6042, 110.8231],
      [-7.6105, 110.8245], // Simpang Tanjunganom
      [-7.6178, 110.8258],
      [-7.6252, 110.8269], // Telukan
      [-7.6335, 110.8278],
      [-7.6432, 110.8288], // Songgorunggi
      [-7.6540, 110.8310],
      [-7.6685, 110.8335], // Masuk Sukoharjo Kota
    ],
  },
  {
    id: 'art-02',
    name: 'Jl. Slamet Riyadi - Kartasura - Klaten (Arteri Nasional Solo-Yogya)',
    category: 'arteri',
    categoryLabel: 'Jalan Arteri Primer',
    wp: 'Perbatasan Gatak Utara - Kartasura',
    widthMeters: 22,
    speedKmh: 60,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Arteri Primer Nasional Jalur Logistik & Wisata Solo-Yogya',
    status: 'Eksisting',
    coordinates: [
      [-7.5562, 110.8120],
      [-7.5568, 110.7985],
      [-7.5571, 110.7850],
      [-7.5565, 110.7725],
      [-7.5552, 110.7600],
      [-7.5538, 110.7485], // Simpang Tugu Kartasura
      [-7.5582, 110.7380],
      [-7.5645, 110.7275],
      [-7.5720, 110.7180], // Mengarah ke Delanggu Klaten
    ],
  },
  {
    id: 'art-03',
    name: 'Jl. Raya Palur - Flyover Palur - Karanganyar (Arteri Mojolaban Utara)',
    category: 'arteri',
    categoryLabel: 'Jalan Arteri Sekunder',
    wp: 'Mojolaban (Desa Palur)',
    widthMeters: 18,
    speedKmh: 50,
    surface: 'Aspal Hotmix (Terbagi Median)',
    rdtrClassification: 'Arteri Sekunder Akses Timur Aglomerasi Solo Raya - Tawangmangu',
    status: 'Eksisting',
    coordinates: [
      [-7.5595, 110.8480], // Jembatan Jurug Bengawan Solo
      [-7.5612, 110.8545],
      [-7.5628, 110.8610],
      [-7.5645, 110.8678], // Flyover Palur
      [-7.5658, 110.8752],
      [-7.5672, 110.8835],
      [-7.5685, 110.8940],
      [-7.5702, 110.9065], // Perbatasan Karanganyar
    ],
  },
  {
    id: 'art-04',
    name: 'Jalur Lingkar Luar Sukoharjo Selatan (Rencana Arteri Sekunder)',
    category: 'arteri',
    categoryLabel: 'Jalan Arteri Sekunder',
    wp: 'Baki - Mojolaban (Interkoneksi WP)',
    widthMeters: 16,
    speedKmh: 50,
    surface: 'Rencana Peningkatan & Pelebaran',
    rdtrClassification: 'Arteri Sekunder Sabuk Pengalih Beban Perkotaan Surakarta',
    status: 'Rencana Peningkatan',
    coordinates: [
      [-7.6015, 110.7850], // Simpang Baki
      [-7.6038, 110.7965],
      [-7.6062, 110.8105],
      [-7.6105, 110.8245], // Simpang Tanjunganom
      [-7.6142, 110.8390],
      [-7.6185, 110.8525], // Jembatan Tegalmade Bengawan Solo
      [-7.6215, 110.8650],
      [-7.6250, 110.8785], // Simpang Bekonang Selatan
    ],
  },

  // B. JALAN KOLEKTOR & LOKAL PRIMER
  {
    id: 'kol-01',
    name: 'Jl. Gentan Raya - Baki Pandeyan (Kolektor Primer WP Baki)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Primer',
    wp: 'Baki (Gentan - Kwarasan - Jetis - Baki)',
    widthMeters: 12,
    speedKmh: 40,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Kolektor Primer Koridor Hunian Padat & Perdagangan Jasa Gentan',
    status: 'Eksisting',
    coordinates: [
      [-7.5720, 110.7965], // Batas Pajang Laweyan
      [-7.5765, 110.7952], // Simpang Gentan Center
      [-7.5818, 110.7938],
      [-7.5872, 110.7925], // Kwarasan
      [-7.5935, 110.7912],
      [-7.5998, 110.7900], // Jetis
      [-7.6065, 110.7888], // Pusat Baki Pandeyan
      [-7.6142, 110.7875],
      [-7.6225, 110.7858], // Menuju Klaten
    ],
  },
  {
    id: 'kol-02',
    name: 'Jl. Gawok - Baki (Poros Penghubung Antar-WP Gatak - Baki)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Sekunder',
    wp: 'Gatak - Baki (Penghubung Simpul TOD Gawok ke Baki)',
    widthMeters: 10,
    speedKmh: 40,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Kolektor Sekunder Penghubung Sentra Industri Rotan & TOD ke Pusat Baki',
    status: 'Eksisting',
    coordinates: [
      [-7.5855, 110.7483], // Stasiun Gawok Gatak
      [-7.5862, 110.7552],
      [-7.5878, 110.7625], // Luwang
      [-7.5905, 110.7698], // Menuran
      [-7.5938, 110.7765], // Mancasan
      [-7.5975, 110.7820],
      [-7.6015, 110.7850], // Simpang Pasar Baki
    ],
  },
  {
    id: 'kol-03',
    name: 'Jl. Mayang - Trangsan - Sanggung (Koridor Industri Rotan Gatak)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Sekunder',
    wp: 'Gatak (Mayang - Trangsan - Krajan - Sanggung)',
    widthMeters: 10,
    speedKmh: 40,
    surface: 'Aspal Hotmix & Beton K-350',
    rdtrClassification: 'Kolektor Kawasan Industri Kreatif Kerajinan Rotan Ekspor Trangsan',
    status: 'Koridor Strategis',
    coordinates: [
      [-7.5655, 110.7625], // Simpang Mayang Utara
      [-7.5710, 110.7592],
      [-7.5768, 110.7560], // Sentra Rotan Trangsan
      [-7.5825, 110.7532],
      [-7.5892, 110.7495], // Krajan
      [-7.5958, 110.7450],
      [-7.6025, 110.7398], // Sanggung
      [-7.6095, 110.7345], // Menuju Wonosari / Ceper
    ],
  },
  {
    id: 'kol-04',
    name: 'Jl. Raya Palur - Bekonang (Poros Utara-Selatan Mojolaban)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Primer',
    wp: 'Mojolaban (Palur - Dukuhturi - Sapen - Bekonang)',
    widthMeters: 12,
    speedKmh: 45,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Kolektor Primer Penghubung Sub-Pusat Palur ke Pusat WP Bekonang',
    status: 'Eksisting',
    coordinates: [
      [-7.5645, 110.8678], // Flyover Palur
      [-7.5705, 110.8690],
      [-7.5772, 110.8708], // Sapen
      [-7.5845, 110.8725], // Joho
      [-7.5920, 110.8745],
      [-7.5995, 110.8762], // Bekonang Pusat
    ],
  },
  {
    id: 'kol-05',
    name: 'Jl. Semanggi - Laban - Bekonang (Koridor Barat-Timur Mojolaban)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Sekunder',
    wp: 'Mojolaban (Laban - Cangkol - Bekonang)',
    widthMeters: 10,
    speedKmh: 40,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Kolektor Sekunder Akses Komuter Surakarta Timur ke Mojolaban',
    status: 'Eksisting',
    coordinates: [
      [-7.5825, 110.8410], // Jembatan Mojo Semanggi
      [-7.5850, 110.8475], // Laban
      [-7.5882, 110.8550], // Gadingan
      [-7.5925, 110.8635], // Cangkol
      [-7.5960, 110.8710],
      [-7.5995, 110.8762], // Pasar Bekonang
    ],
  },
  {
    id: 'kol-06',
    name: 'Jl. Bekonang - Sukoharjo (Kolektor Penghubung Ibukota Kabupaten)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Primer',
    wp: 'Mojolaban (Bekonang - Wirun - Sukoharjo)',
    widthMeters: 12,
    speedKmh: 45,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Kolektor Primer Akses Pusat WP Mojolaban ke Pusat Pemerintahan Sukoharjo',
    status: 'Eksisting',
    coordinates: [
      [-7.5995, 110.8762], // Bundaran Bekonang
      [-7.6075, 110.8785], // Wirun Sentra Gamelan
      [-7.6162, 110.8805],
      [-7.6258, 110.8818], // Perbatasan Polokarto
      [-7.6365, 110.8825],
      [-7.6480, 110.8810], // Menuju Sukoharjo Kota
    ],
  },
  {
    id: 'kol-07',
    name: 'Jl. Baki - Daleman - Klaten (Kolektor Selatan Baki)',
    category: 'kolektor',
    categoryLabel: 'Jalan Kolektor Sekunder',
    wp: 'Baki (Bakipandeyan - Bentakan - Daleman)',
    widthMeters: 9,
    speedKmh: 40,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Kolektor Sekunder Penghubung Lintas Kabupaten Sukoharjo - Klaten',
    status: 'Eksisting',
    coordinates: [
      [-7.6065, 110.7888], // Baki Pandeyan
      [-7.6125, 110.7832],
      [-7.6188, 110.7780], // Bentakan
      [-7.6260, 110.7715],
      [-7.6345, 110.7640], // Daleman Klaten
    ],
  },

  // C. JALAN LINGKUNGAN / POROS DESA (Real Tracing Menembus Desa-Desa)
  {
    id: 'lng-01',
    name: 'Jl. Lingkungan Sentra Gamelan Desa Wirun',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Mojolaban (Desa Wirun)',
    widthMeters: 6,
    speedKmh: 25,
    surface: 'Paving Block & Aspal',
    rdtrClassification: 'Jalan Lingkungan Wisata Budaya & Kerajinan Gamelan Bersejarah',
    status: 'Eksisting',
    coordinates: [
      [-7.6025, 110.8710],
      [-7.6052, 110.8745],
      [-7.6078, 110.8792],
      [-7.6110, 110.8835],
      [-7.6145, 110.8880],
    ],
  },
  {
    id: 'lng-02',
    name: 'Jl. Poros Desa Tegalmade - Klumprit (Tanggul Bengawan)',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Mojolaban (Desa Tegalmade & Klumprit)',
    widthMeters: 5,
    speedKmh: 25,
    surface: 'Beton Rabat & Aspal',
    rdtrClassification: 'Jalan Lingkungan Pengendali Banjir & Akses Pertanian Lahan Basah',
    status: 'Eksisting',
    coordinates: [
      [-7.6120, 110.8490],
      [-7.6165, 110.8535],
      [-7.6212, 110.8578],
      [-7.6268, 110.8605],
      [-7.6335, 110.8640],
    ],
  },
  {
    id: 'lng-03',
    name: 'Jl. Lingkungan Permukiman Gentan Indah & Songgolangit',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Sekunder',
    wp: 'Baki (Desa Gentan)',
    widthMeters: 7,
    speedKmh: 20,
    surface: 'Paving Block K-300',
    rdtrClassification: 'Jalan Lingkungan Hunian Mandiri Aglomerasi Urban',
    status: 'Eksisting',
    coordinates: [
      [-7.5745, 110.7915],
      [-7.5780, 110.7885],
      [-7.5815, 110.7858],
      [-7.5860, 110.7842],
      [-7.5910, 110.7830],
    ],
  },
  {
    id: 'lng-04',
    name: 'Jl. Poros Desa Menuran - Mancasan - Purbayan',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Baki (Desa Menuran, Mancasan, Purbayan)',
    widthMeters: 6,
    speedKmh: 30,
    surface: 'Aspal Tipis & Rabat Beton',
    rdtrClassification: 'Jalan Lingkungan Penghubung Antar-Desa WP Baki Barat',
    status: 'Eksisting',
    coordinates: [
      [-7.5895, 110.7710],
      [-7.5928, 110.7755],
      [-7.5965, 110.7802],
      [-7.6010, 110.7845],
      [-7.6055, 110.7890],
    ],
  },
  {
    id: 'lng-05',
    name: 'Jl. Lingkungan Desa Luwang - Stasiun Gawok',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Gatak (Desa Luwang & Gawok)',
    widthMeters: 6,
    speedKmh: 25,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Jalan Sirkulasi Pedestrian & Feeder Stasiun TOD Gawok',
    status: 'Koridor Strategis',
    coordinates: [
      [-7.5810, 110.7455],
      [-7.5832, 110.7470],
      [-7.5855, 110.7483], // Stasiun Gawok
      [-7.5885, 110.7512],
      [-7.5920, 110.7545],
    ],
  },
  {
    id: 'lng-06',
    name: 'Jl. Poros Desa Klaseman - Krajan - Trangsan Rotan',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Gatak (Klaseman - Trangsan)',
    widthMeters: 6,
    speedKmh: 25,
    surface: 'Beton K-300',
    rdtrClassification: 'Akses Angkutan Logistik Bahan Baku & Ekspor Furnitur Rotan',
    status: 'Eksisting',
    coordinates: [
      [-7.5715, 110.7480],
      [-7.5750, 110.7512],
      [-7.5785, 110.7545],
      [-7.5820, 110.7580],
      [-7.5865, 110.7615],
    ],
  },
  {
    id: 'lng-07',
    name: 'Jl. Poros Desa Sanggung - Tempel - Geneng',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Gatak (Sanggung - Geneng)',
    widthMeters: 5,
    speedKmh: 25,
    surface: 'Aspal Penetrasi',
    rdtrClassification: 'Jalan Lingkungan Pertanian Lahan Basah & Permukiman Tradisional',
    status: 'Eksisting',
    coordinates: [
      [-7.5980, 110.7320],
      [-7.6015, 110.7365],
      [-7.6050, 110.7410],
      [-7.6092, 110.7460],
      [-7.6135, 110.7510],
    ],
  },
  {
    id: 'lng-08',
    name: 'Jl. Poros Desa Sapen - Joho - Klumprit',
    category: 'lingkungan',
    categoryLabel: 'Jalan Lingkungan Primer',
    wp: 'Mojolaban (Sapen - Joho)',
    widthMeters: 6,
    speedKmh: 30,
    surface: 'Aspal Hotmix',
    rdtrClassification: 'Akses Koleksi Komoditas Agrikultur & Sentra Padi Organik',
    status: 'Eksisting',
    coordinates: [
      [-7.5780, 110.8710],
      [-7.5835, 110.8755],
      [-7.5895, 110.8805],
      [-7.5955, 110.8845],
      [-7.6020, 110.8885],
    ],
  },
];

// --------------------------------------------------------------------------
// 2. JALUR KRL COMMUTER LINE SOLO-YOGYAKARTA & KERETA API (Garis Riil Tracing)
// --------------------------------------------------------------------------

export const REAL_RAILWAYS: RailwayFeature[] = [
  {
    id: 'krl-main',
    name: 'Jalur Ganda KRL Commuter Line Lin Solo - Yogyakarta (Double Track Berlistrik)',
    type: 'KRL Commuter Line',
    tracks: 'Ganda (Double Track)',
    electrified: true,
    voltage: '1.500 V DC LAA (Listrik Aliran Atas)',
    operator: 'PT Kereta Commuter Indonesia (KAI Commuter)',
    corridor: 'Kutoarjo - Klaten - Gawok (Gatak) - Purwosari - Solo Balapan - Palur (Mojolaban)',
    description: 'Jalur rel kereta api rel ganda elektrik tersibuk di koridor aglomerasi Solo-Yogya dengan headway 30-45 menit.',
    coordinates: [
      [-7.6250, 110.7150], // Arah Delanggu Klaten
      [-7.6175, 110.7225], // Perbatasan Sukoharjo/Klaten
      [-7.6105, 110.7288], // Melintasi Desa Sanggung
      [-7.6035, 110.7350],
      [-7.5970, 110.7410],
      [-7.5910, 110.7452], // Mendekati Stasiun Gawok
      [-7.58552, 110.74836], // Stasiun Gawok (Km 122+550)
      [-7.5815, 110.7518], // Melintasi Desa Luwang
      [-7.5772, 110.7562], // Melintasi Desa Mayang
      [-7.5728, 110.7620],
      [-7.5680, 110.7685], // Tempel / Pajang
      [-7.5635, 110.7765],
      [-7.5595, 110.7860], // Menuju Stasiun Purwosari
      [-7.5568, 110.8010], // Stasiun Solo Balapan
      [-7.5575, 110.8220], // Stasiun Solo Jebres
      [-7.5645, 110.8678], // Stasiun Palur (Batas Utara Mojolaban)
    ],
  },
  {
    id: 'rail-wonogiri',
    name: 'Jalur KA Perintis Percabangan Solo - Wonogiri (Batara Kresna)',
    type: 'Kereta Api Antarkota / Perintis',
    tracks: 'Tunggal (Single Track)',
    electrified: false,
    voltage: 'Non-Elektrifikasi (Diesel Hidraulik / DMU)',
    operator: 'PT Kereta Api Indonesia (Persero) Daop 6 Yogyakarta',
    corridor: 'Solo Purwosari - Solo Kota - Grogol/Sukoharjo - Wonogiri',
    description: 'Jalur rel historis yang melayani Railbus Batara Kresna menelusuri sisi barat Bengawan Solo & koridor tengah Sukoharjo.',
    coordinates: [
      [-7.5620, 110.8150],
      [-7.5710, 110.8240], // Stasiun Solo Kota (Sangkrah)
      [-7.5825, 110.8285],
      [-7.5940, 110.8320],
      [-7.6075, 110.8355],
      [-7.6210, 110.8372], // Stasiun Sukoharjo
      [-7.6385, 110.8390],
      [-7.6580, 110.8405],
    ],
  },
];

export const REAL_STATIONS: RailwayStation[] = [
  {
    id: 'st-gawok',
    name: 'Stasiun Gawok (GW)',
    code: 'GW (Km 122+550)',
    elevation: '+118 m dpl',
    isTOD: true,
    todConcept: 'Pusat Transit-Oriented Development (TOD) Utama Wilayah Barat Sukoharjo (WP Gatak). Skenario 3 RDTR mengalokasikan radius 800m sebagai zona intensitas tinggi ramah pejalan kaki.',
    wp: 'Gatak (Desa Luwang / Gawok)',
    coordinates: [-7.58552, 110.74836],
  },
  {
    id: 'st-palur',
    name: 'Stasiun Palur (PL)',
    code: 'PL (Km 262+500)',
    elevation: '+93 m dpl',
    isTOD: true,
    todConcept: 'Terminus Timur KRL Commuter Line Solo-Yogya. Titik integrasi bus Batik Solo Trans (BST) Koridor 1 & 2 di gerbang utara WP Mojolaban.',
    wp: 'Mojolaban Utara / Karanganyar',
    coordinates: [-7.5645, 110.8678],
  },
  {
    id: 'st-purwosari',
    name: 'Stasiun Purwosari (PWS)',
    code: 'PWS',
    elevation: '+98 m dpl',
    isTOD: true,
    todConcept: 'Stasiun percabangan utama Solo-Yogya & Solo-Wonogiri dekat perbatasan WP Baki utara.',
    wp: 'Surakarta Barat (Aksesibilitas WP Baki)',
    coordinates: [-7.5628, 110.7932],
  },
];

// --------------------------------------------------------------------------
// 3. JARINGAN SUNGAI RIIL & ZONA SEMPADAN SUNGAI (Permen PUPR No. 28/2015)
// --------------------------------------------------------------------------

// Tracing riil kelokan meander Sungai Bengawan Solo di sisi barat & tengah Mojolaban
const BENGAWAN_SOLO_MEANDER: [number, number][] = [
  [-7.5505, 110.8435], // Hulu Jurug
  [-7.5548, 110.8475],
  [-7.5595, 110.8480], // Jembatan Jurug Palur
  [-7.5642, 110.8458],
  [-7.5695, 110.8420], // Kelokan Desa Laban Utara
  [-7.5745, 110.8402],
  [-7.5792, 110.8438],
  [-7.5825, 110.8465], // Jembatan Mojo Laban - Semanggi
  [-7.5868, 110.8492],
  [-7.5912, 110.8470], // Kelokan Gadingan
  [-7.5960, 110.8435],
  [-7.6015, 110.8448], // Kelokan Cangkol
  [-7.6065, 110.8505],
  [-7.6115, 110.8568], // Kelokan Madegondo
  [-7.6165, 110.8580],
  [-7.6212, 110.8545], // Kelokan Tegalmade
  [-7.6265, 110.8522],
  [-7.6325, 110.8560], // Meander Tajam Klumprit
  [-7.6385, 110.8618],
  [-7.6445, 110.8652],
  [-7.6520, 110.8668], // Aliran Hilir Sukoharjo Kota
];

// Sungai Kali Jenes (Anak Sungai di Baki)
const KALI_JENES_STREAM: [number, number][] = [
  [-7.5720, 110.8080],
  [-7.5775, 110.8125],
  [-7.5840, 110.8165],
  [-7.5915, 110.8210],
  [-7.6005, 110.8265],
  [-7.6110, 110.8320],
  [-7.6225, 110.8385],
  [-7.6310, 110.8440], // Muara Bengawan Solo
];

// Kali Dengkeng / Saluran Induk Colo Gatak (Jaringan Irigasi Primer Pertanian)
const KALI_DENGKENG_GATAK: [number, number][] = [
  [-7.5685, 110.7420],
  [-7.5745, 110.7460],
  [-7.5815, 110.7495],
  [-7.5885, 110.7530],
  [-7.5960, 110.7565],
  [-7.6050, 110.7605],
  [-7.6145, 110.7645],
];

export const REAL_RIVERS: RiverFeature[] = [
  {
    id: 'riv-bengawan-solo',
    name: 'Sungai Bengawan Solo (Palung Sungai Utama)',
    type: 'Sungai Utama',
    wp: 'Batas Barat & Lembah Tengah Mojolaban (Laban - Gadingan - Cangkol - Tegalmade - Klumprit)',
    lengthKm: 18.4,
    description: 'Sungai terpanjang di Pulau Jawa dengan karakter meander aktif, potensi limpasan banjir tahunan, dan koridor ekologis utama Kabupaten Sukoharjo.',
    coordinates: BENGAWAN_SOLO_MEANDER,
  },
  {
    id: 'riv-kali-jenes',
    name: 'Sungai Kali Jenes (Anak Bengawan Solo)',
    type: 'Anak Sungai',
    wp: 'Baki - Grogol',
    lengthKm: 9.8,
    description: 'Anak sungai Bengawan Solo penampung drainase makro wilayah aglomerasi Baki dan Solo Baru.',
    coordinates: KALI_JENES_STREAM,
  },
  {
    id: 'riv-kali-dengkeng',
    name: 'Kali Dengkeng Hulu & Saluran Induk Colo Barat',
    type: 'Saluran Irigasi Primer',
    wp: 'Gatak (Penyangga LBS Sawah Beririgasi Teknis)',
    lengthKm: 8.2,
    description: 'Tulang punggung jaringan pengairan teknis yang menopang ketahanan pangan dan status LP2B/LBS di Kecamatan Gatak.',
    coordinates: KALI_DENGKENG_GATAK,
  },
];

// Fungsi pembuatan polygon buffer sempadan sungai riil (mengikuti kelokan sungai)
function createBufferPolygon(centerline: [number, number][], bufferMeters: number): [number, number][] {
  // 1 derajat lintang ~ 111,000 meter; 1 derajat bujur ~ 111,000 * cos(-7.6) ~ 110,000 meter
  const dLat = bufferMeters / 111000;
  const dLon = bufferMeters / (111000 * Math.cos((-7.6 * Math.PI) / 180));

  const leftRing: [number, number][] = [];
  const rightRing: [number, number][] = [];

  for (let i = 0; i < centerline.length; i++) {
    const curr = centerline[i];
    let dX = 0;
    let dY = 0;

    if (i === 0) {
      const next = centerline[1];
      dX = next[1] - curr[1];
      dY = next[0] - curr[0];
    } else if (i === centerline.length - 1) {
      const prev = centerline[i - 1];
      dX = curr[1] - prev[1];
      dY = curr[0] - prev[0];
    } else {
      const prev = centerline[i - 1];
      const next = centerline[i + 1];
      dX = next[1] - prev[1];
      dY = next[0] - prev[0];
    }

    const length = Math.sqrt(dX * dX + dY * dY);
    if (length === 0) continue;

    // Vektor tegak lurus
    const nLat = -dX / length;
    const nLon = dY / length;

    leftRing.push([Number((curr[0] + nLat * dLat).toFixed(6)), Number((curr[1] + nLon * dLon).toFixed(6))]);
    rightRing.push([Number((curr[0] - nLat * dLat).toFixed(6)), Number((curr[1] - nLon * dLon).toFixed(6))]);
  }

  rightRing.reverse();
  const ring = [...leftRing, ...rightRing];
  if (ring.length > 0) {
    ring.push(ring[0]); // tutup ring
  }
  return ring;
}

export const REAL_SEMPADAN_ZONES: SempadanFeature[] = [
  {
    id: 'smp-bengawan-solo',
    riverName: 'Sungai Bengawan Solo',
    bufferWidthMeters: 100,
    legalBasis: 'Permen PUPR No. 28/PRT/M/2015 Pasal 9 (Sungai Besar Tidak Bertanggul Luar Perkotaan: min. 100m)',
    zoningRule: 'Zona Lindung Sempadan Sungai (ZLS) - KDB Maksimal 0%, KLB 0. Dilarang mendirikan bangunan hunian/industri baru.',
    allowedUses: [
      'Sabuk hijau penyerap air & hutan riparian',
      'Bangunan pengendali banjir, pintu air, dan tanggul pelindung',
      'RTH Publik pasif dan jalur inspeksi BBWS Bengawan Solo',
      'Pemanfaatan perikanan tradisional tanpa merusak morfologi bantaran',
    ],
    prohibitedUses: [
      'Pembangunan hunian permanen atau perumahan komersial',
      'Kawasan industri, gudang, atau bengkel penghasil limbah cair',
      'Pembuangan limbah domestik / B3 (Pencemaran Sungai)',
      'Pengurukan atau reklamasi yang mempersempit palung sungai',
    ],
    polygonCoordinates: createBufferPolygon(BENGAWAN_SOLO_MEANDER, 100),
  },
  {
    id: 'smp-kali-jenes',
    riverName: 'Sungai Kali Jenes',
    bufferWidthMeters: 30,
    legalBasis: 'Permen PUPR No. 28/PRT/M/2015 Pasal 11 (Sungai Bertanggul / Kawasan Perkotaan: min. 10-30m)',
    zoningRule: 'Zona Perlindungan Sungai Perkotaan - Penyangga Saluran Drainase Makro Baki-Surakarta',
    allowedUses: [
      'Jalur pedestrian tepi air (waterfront walk)',
      'Taman kota & vegetasi perakar dalam pencegah erosi tebing',
      'Pemasangan pipa transmisi utilitas bawah tanah berizin',
    ],
    prohibitedUses: [
      'Bangunan menjorok ke atas badan air (overhanging building)',
      'Septic tank tanpa filter biopori di bibir tanggul',
      'Pagar pembatas masif yang menghalangi jalur inspeksi alat berat',
    ],
    polygonCoordinates: createBufferPolygon(KALI_JENES_STREAM, 30),
  },
  {
    id: 'smp-kali-dengkeng',
    riverName: 'Kali Dengkeng & Saluran Induk Colo Gatak',
    bufferWidthMeters: 20,
    legalBasis: 'Permen PUPR No. 28/PRT/M/2015 Pasal 15 (Sempadan Jaringan Irigasi Primer)',
    zoningRule: 'Zona Sempadan Irigasi Teknis (ZSI) - Penjamin Kelancaran Debit Air LP2B Gatak',
    allowedUses: [
      'Jalan inspeksi pemeliharaan pintu air irigasi',
      'Sabuk penguat talud irigasi dengan rumput vetiver',
      'Jembatan perlintasan antar-blok sawah berizin instansi teknis',
    ],
    prohibitedUses: [
      'Penyempitan penampang basah saluran irigasi',
      'Bangunan liar / warung semipermanen di tanggul irigasi',
      'Pembuangan sampah padat dan limbah kimia pertanian',
    ],
    polygonCoordinates: createBufferPolygon(KALI_DENGKENG_GATAK, 20),
  },
];
