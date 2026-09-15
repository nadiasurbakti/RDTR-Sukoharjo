export interface KakObjectiveTarget {
  letter: string;
  title: string;
  description: string;
  status: 'Tersedia' | 'Terintegrasi' | 'Siap Ekspor';
  appLocation: string;
  componentBadge: string;
}

export interface KakScopeItem {
  code: string;
  title: string;
  method: string;
  details: string[];
}

export const KAK_FRAMEWORK = {
  header: 'KERANGKA ACUAN KERJA (KAK)',
  documentTitle: 'Penyusunan Materi Teknis dan Ranperkada 3 (Tiga) RDTR di Kabupaten Sukoharjo, Provinsi Jawa Tengah',
  methodologyType: 'Swakelola',
  
  // 1. MAKSUD
  maksud: {
    title: '1. Maksud',
    summary: 'Membantu pemerintah daerah dalam percepatan penyusunan RDTR sebagai dasar pemberian izin dan kemudahan berinvestasi.',
    explanation: 'Pekerjaan ini dimaksudkan membantu pemerintah daerah dalam percepatan penyusunan RDTR sebagai dasar pemberian izin (Konfirmasi Kesesuaian Kegiatan Pemanfaatan Ruang / KKPR) dan kemudahan berinvestasi melalui integrasi sistem Online Single Submission Risk-Based Approach (OSS-RBA).',
    keyBenefits: [
      'Kepastian hukum investasi perizinan berusaha dan non-berusaha berbasis ruang digital.',
      'Percepatan digitalisasi tata ruang Kabupaten Sukoharjo melalui integrasi GISTARU / ATR-BPN.',
      'Mitigasi konflik pemanfaatan ruang antara preservasi sawah lumbung pangan (LP2B) dan ekspansi permukiman-industri.'
    ]
  },

  // 2. TUJUAN
  tujuan: {
    title: '2. Tujuan',
    summary: 'Penyusunan materi teknis dan ranperkada 3 (Tiga) RDTR di Kabupaten Sukoharjo, Provinsi Jawa Tengah.',
    explanation: 'Tujuan dari pekerjaan ini adalah penyusunan materi teknis dan ranperkada 3 (Tiga) RDTR di Kabupaten Sukoharjo, Provinsi Jawa Tengah (mencakup Wilayah Perencanaan Mojolaban, Wilayah Perencanaan Baki, dan Wilayah Perencanaan Gatak).',
    targetWps: [
      {
        code: 'WP 1',
        name: 'Wilayah Perencanaan Mojolaban',
        desaCount: 15,
        fokus: 'Penyangga lumbung pangan (LP2B Colo), sempadan Bengawan Solo (100m), dan koridor ekonomi PPK Bekonang.'
      },
      {
        code: 'WP 2',
        name: 'Wilayah Perencanaan Baki',
        desaCount: 14,
        fokus: 'Pengendalian spillover urban Solo Baru, sentra industri kreatif, dan penataan perumahan peri-urban.'
      },
      {
        code: 'WP 3',
        name: 'Wilayah Perencanaan Gatak',
        desaCount: 14,
        fokus: 'Sentra industri mebel rotan ekspor Trangsan dan simpul Transit-Oriented Development (TOD) Stasiun Gawok.'
      }
    ]
  },

  // 3. SASARAN
  sasaran: {
    title: '3. Sasaran',
    summary: 'Sasaran yang dicapai dalam pelaksanaan pekerjaan ini adalah tersedianya 8 (delapan) dokumen keluaran:',
    items: [
      {
        letter: 'a',
        title: 'Delineasi wilayah perencanaan',
        description: 'Penetapan batas administratif dan batas fungsional 3 WP (Mojolaban, Baki, Gatak) seluas total 43 desa/kelurahan, dengan kepastian batas luar RDTR Grogol Eksisting.',
        status: 'Tersedia',
        appLocation: 'Katalog Skenario WP & Delineation Map Studio',
        componentBadge: 'Batas Vektor GeoJSON WGS84'
      },
      {
        letter: 'b',
        title: 'Data dan analisis',
        description: 'Kompilasi data primer/sekunder dan pemodelan spasial multi-temporal berbasis 16 modul analisis Google Earth Engine (tutupan lahan, NDVI, NDWI, LST, slope, jaringan infrastruktur).',
        status: 'Tersedia',
        appLocation: '16 Modul Analisis Spasial & Output 2-3',
        componentBadge: 'Citra Sentinel-2 SR 10m & GEE'
      },
      {
        letter: 'c',
        title: 'Tujuan penataan ruang',
        description: 'Perumusan visi, arah tematik, dan karakteristik spesifik penataan ruang masing-masing WP untuk 20 tahun masa berlaku rencana.',
        status: 'Terintegrasi',
        appLocation: 'Deliverables Output 4 & Profil Tematik WP',
        componentBadge: 'Perumusan Kebijakan Spasial'
      },
      {
        letter: 'd',
        title: 'Konsep rencana struktur ruang',
        description: 'Hierarki pusat pelayanan kegiatan (PPK, PPL) dan sistem jaringan prasarana transportasi (arteri primer, kolektor, lokal, rel ganda KRL Solo-Yogyakarta & Stasiun Gawok) serta energi, air, dan telekomunikasi.',
        status: 'Tersedia',
        appLocation: 'Peta Tematik & Jaringan Riil (Layer Infrastruktur)',
        componentBadge: 'Trase Riil Jaringan Jalan & Kereta'
      },
      {
        letter: 'e',
        title: 'Konsep rencana Pola Ruang',
        description: 'Alokasi zona lindung (sempadan Sungai Bengawan Solo 100m, sempadan Kali Samin/Jenes) dan zona budi daya (perumahan, perdagangan & jasa, industri rotan/tekstil, sawah dilindungi/LP2B).',
        status: 'Tersedia',
        appLocation: 'Peta Tematik & Skema Zonasi 3 WP',
        componentBadge: 'Zona Lindung & Budi Daya'
      },
      {
        letter: 'f',
        title: 'Konsep ketentuan pemanfaatan ruang',
        description: 'Arahan program sektoral lima tahunan, indikasi program utama, pendanaan, pelaksana, dan waktu pelaksanaan pembangunan infrastruktur prioritas.',
        status: 'Terintegrasi',
        appLocation: 'Matriks Ketentuan Ruang & Regulasi',
        componentBadge: 'Indikasi Program 5 Tahunan'
      },
      {
        letter: 'g',
        title: 'Konsep peraturan zonasi',
        description: 'Ketentuan intensitas pemanfaatan ruang (KDB, KLB, KDH, GSB), ketentuan tata massa bangunan, prasarana minimal, dan matriks kesesuaian kegiatan (Izin, Terbatas, Bersyarat, Dilarang / ITBX).',
        status: 'Terintegrasi',
        appLocation: 'Peraturan Zonasi & Ketentuan ITBX',
        componentBadge: 'Matriks ITBX & Intensitas Ruang'
      },
      {
        letter: 'h',
        title: 'Konsep Ranperkada',
        description: 'Penyusunan legal drafting Naskah Rancangan Peraturan Kepala Daerah (Perbup) RDTR Kabupaten Sukoharjo beserta lampiran peta skala 1:5.000.',
        status: 'Siap Ekspor',
        appLocation: 'Pusat Ekspor & Naskah Regulasi',
        componentBadge: 'Legal Drafting Ranperkada'
      }
    ] as KakObjectiveTarget[]
  },

  // RUANG LINGKUP
  ruangLingkup: {
    title: 'RUANG LINGKUP',
    
    lingkupPekerjaan: {
      subTitle: '1) Lingkup Pekerjaan',
      nature: 'Pekerjaan dilakukan secara swakelola, dengan lingkup kegiatan sebagai berikut:',
      activities: [
        {
          code: 'a',
          title: 'Kajian Multi-Aspek Komprehensif',
          description: 'Melakukan kajian aspek hukum/peraturan perundang-undangan dan administrasi, kajian aspek perencanaan wilayah dan aspek kelembagaan, serta aspek sosial dan lingkungan.',
          deliverables: 'Review 15 peraturan perundang-undangan (UU 26/2007, PP 21/2021, RTRWN, RTRW Jateng, RTRW & RPJMD Sukoharjo, SK RDTR Grogol).'
        },
        {
          code: 'b',
          title: 'Pembahasan Konsultatif & Survey Lapangan',
          description: 'Melakukan pembahasan di Pusat dan daerah serta perjalanan dinas ke daerah dalam rangka penjaringan isu dan permasalahan, pengumpulan data sekaligus untuk menyusun dokumen pendukung RDTR.',
          deliverables: 'FGD pemangku kepentingan (Bappeda, DPUPR, DPM-PTSP, BBWS Bengawan Solo, akademisi, dan asosiasi usaha).'
        },
        {
          code: 'c',
          title: 'Penyusunan 8 Komponen Materi Teknis & Ranperkada',
          description: 'Melakukan penyusunan secara terstruktur:',
          subList: [
            'Delineasi wilayah perencanaan;',
            'Data dan analisis;',
            'Tujuan penataan ruang;',
            'Konsep rencana struktur ruang;',
            'Konsep rencana Pola Ruang;',
            'Konsep ketentuan pemanfaatan ruang;',
            'Konsep peraturan zonasi; dan',
            'Konsep Ranperkada.'
          ]
        }
      ]
    },

    lingkupWilayah: {
      subTitle: '2) Lingkup Wilayah',
      summary: 'Lingkup wilayah perencanaan berada di Kabupaten Sukoharjo, Provinsi Jawa Tengah, yang akan ditetapkan berdasarkan kajian delineasi dan/atau kesepakatan para pemangku kepentingan.',
      geographicContext: [
        {
          entity: 'Kabupaten Sukoharjo',
          role: 'Wilayah Induk Pemerintahan',
          provinsi: 'Jawa Tengah',
          keterangan: 'Kawasan strategis Aglomerasi Solo Raya (Subosukawonosraten) yang dilintasi koridor utama ekonomi nasional.'
        },
        {
          entity: 'WP Mojolaban',
          role: 'Wilayah Perencanaan Timur',
          cakupan: '15 Desa / Kelurahan',
          keterangan: 'Dibatasi Sungai Bengawan Solo, perbatasan langsung dengan Kota Surakarta dan Kabupaten Karanganyar.'
        },
        {
          entity: 'WP Baki',
          role: 'Wilayah Perencanaan Tengah-Selatan',
          cakupan: '14 Desa / Kelurahan',
          keterangan: 'Penyangga koridor Solo Baru dan kawasan industri-perumahan yang berbatasan dengan Klaten dan Grogol.'
        },
        {
          entity: 'WP Gatak',
          role: 'Wilayah Perencanaan Barat',
          cakupan: '14 Desa / Kelurahan',
          keterangan: 'Sentra mebel rotan Trangsan dan koridor rel ganda Solo-Yogyakarta berbatasan dengan Kartasura dan Klaten.'
        }
      ],
      boundaryConstraint: 'Batas wilayah perencanaan dikecualikan terhadap Kecamatan Grogol yang telah ditetapkan melalui Keputusan Bupati Sukoharjo Nomor 600.3/342 Tahun 2026 tentang RDTR Kecamatan Grogol.'
    }
  }
};
