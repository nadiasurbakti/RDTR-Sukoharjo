export interface ProposalTeamMember {
  no: number;
  nama: string;
  jabatan: string;
  usia: number;
  jenisKelamin: 'L' | 'P';
  pendidikanTerakhir: string;
  statusPegawai: 'ASN' | 'Lainnya';
  bidangKeahlian?: string;
}

export interface ProposalEquipment {
  no: number;
  nama: string;
  spesifikasi: string;
  tahunStatus: string;
  kegunaan: string;
}

export interface ProposalDeliverable {
  no: number;
  kode: string;
  nama: string;
  sasaranKakTerkait: string;
  muatanUtama: string[];
  formatPenyerahan: string;
  keterangan: string;
  status: 'Tersedia di Sistem' | 'Tersinkronisasi' | 'Siap Ekspor';
}

export interface ProposalRiskItem {
  no: number;
  risikoUtama: string;
  dampakPotensial: string;
  tingkatRisiko: 'Tinggi' | 'Sedang–Tinggi' | 'Sedang';
  strategiMitigasi: string;
  penanggungJawab: string;
}

export interface ProposalScheduleWeek {
  tahap: number;
  kegiatan: string;
  subKegiatan: string[];
  mingguMulai: number;
  mingguSelesai: number;
  keluaran: string;
}

export const PROPOSAL_FTUI_DATA = {
  identitas: {
    namaPaket: 'Penyusunan Materi Teknis dan Rancangan Peraturan Kepala Daerah (Ranperkada) Rencana Detail Tata Ruang (RDTR) di Kabupaten Sukoharjo',
    jenisPengadaan: 'Pengadaan Swakelola Tipe II',
    instansiPemberiTugas: 'Direktorat Jenderal Tata Ruang, Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional',
    penanggungJawabAnggaran: 'Kuasa Pengguna Anggaran Satuan Kerja Direktorat Jenderal Tata Ruang',
    tahunAnggaran: 2026,
    pelaksanaPekerjaan: 'Universitas Indonesia (Fakultas Teknik)',
    noPengesahanBadanHukum: 'Perguruan Tinggi Negeri Badan Hukum (PTNBH) berdasarkan Peraturan Pemerintah Nomor 75 Tahun 2021',
    alamatKorespondensi: 'Fakultas Teknik, Universitas Indonesia, Kampus UI Depok',
    tanggalPengesahan: 'Depok, 15 September 2026',
    penandatangan: {
      nama: 'Prof. Kemas Ridwan Kurniawan, S.T., M.Sc., Ph.D',
      jabatan: 'Dekan Fakultas Teknik Universitas Indonesia',
    },
    jangkaWaktu: '3 (tiga) bulan atau 12 (dua belas) minggu terhitung sejak penerbitan SPMK',
    totalRAB: 1982304900,
    totalRABFormatted: 'Rp 1.982.304.900,-',
    komponenBiaya: {
      biayaLangsungPersonil: 1116630000,
      biayaLangsungPersonilFormatted: 'Rp 1.116.630.000,-',
      biayaNonPersonil: 444240000,
      biayaNonPersonilFormatted: 'Rp 444.240.000,-',
      totalLangsungDanTidakLangsung: 1560870000,
      ppn12Persen: 187304400,
      danaPengembanganInstitusi15Persen: 234130500,
    },
  },

  positioningFTUI: [
    {
      peran: 'Tim Penyusun',
      deskripsi: 'Mengintegrasikan data spasial dan nonspasial untuk membangun pemahaman berbasis bukti (evidence-building) mengenai kondisi dan dinamika 3 WP.',
    },
    {
      peran: 'Analis Keruangan (Spatial Intelligence)',
      deskripsi: 'Mengidentifikasi struktur ruang, pola penggunaan lahan, karakteristik lingkungan, jaringan infrastruktur, dan hubungan antarkawasan dengan resolusi tinggi.',
    },
    {
      peran: 'Integrator Lintas Sektor',
      deskripsi: 'Menghubungkan aspek kependudukan, sosial-budaya, ekonomi, lingkungan, transportasi, kebencanaan, dan penggunaan lahan dalam satu kerangka terpadu.',
    },
    {
      peran: 'Perumus Konsep Rencana',
      deskripsi: 'Menerjemahkan hasil analisis menjadi tujuan penataan ruang, konsep struktur dan pola ruang, ketentuan pemanfaatan ruang, peraturan zonasi (ITBX), hingga Ranperkada.',
    },
    {
      peran: 'Penghubung Akademik dan Pemerintahan',
      deskripsi: 'Menjembatani pendekatan akademik berbasis bukti dengan kebutuhan praktis pemerintah daerah melalui konsultasi publik, FGD, dan pembahasan teknis.',
    },
  ],

  rantaiAnalisis: [
    { step: 'Data', detail: 'Kompilasi data primer (survei GCP/ICP, drone, wawancara) dan sekunder (BPS, BIG, ATR/BPN, OPD).' },
    { step: 'Evidence', detail: 'Pembangunan bukti keruangan: citra satelit Sentinel-2 SR 10m terortorektifikasi, matriks kesenjangan data.' },
    { step: 'Analysis', detail: 'Rapid assessment 12 aspek terpadu berbasis kajian teknis dan komputasi cloud Google Earth Engine.' },
    { step: 'Spatial Intelligence', detail: 'Sintesis spasial: deteksi alih fungsi lahan, hotspot tekanan pembangunan (DPI), fragmentasi LP2B, dan bahaya banjir.' },
    { step: 'Planning Implication', detail: 'Perumusan rencana struktur ruang, pola ruang, aturan dasar zonasi, intensitas bangunan, dan draf Ranperkada.' },
  ],

  // Tabel 1: Keterkaitan Sasaran KAK dan 11 Luaran Proposal
  keterkaitanSasaranLuaran: [
    {
      sasaranKak: 'a. Delineasi wilayah perencanaan',
      luaranProposal: 'Luaran 2: Delineasi Wilayah Perencanaan',
      keterangan: 'Peta delineasi 3 WP skala 1:5.000, dasar pertimbangan delineasi, dan Berita Acara kesepakatan dengan Pemda Sukoharjo.',
      statusApp: 'Tersedia (Katalog Skenario WP & Peta Interaktif)',
    },
    {
      sasaranKak: 'b. Data dan analisis',
      luaranProposal: 'Luaran 3, 4, 5, dan 6',
      keterangan: 'Basis data spasial/nonspasial (Luaran 3), Peta Dasar & Tematik 1:5.000 (Luaran 4), Dokumen Fakta dan Analisis 12 Aspek (Luaran 5), dan Matriks Isu, Potensi, Permasalahan, & Implikasi Penataan Ruang (Luaran 6).',
      statusApp: 'Tersedia (16 Modul Analisis GEE & Output 2-3)',
    },
    {
      sasaranKak: 'c. Tujuan penataan ruang',
      luaranProposal: 'Luaran 7 butir a',
      keterangan: 'Tujuan penataan ruang tiap WP (Mojolaban: Agro-urban & riverine, Baki: Peri-urban growth, Gatak: Industri rotan & TOD) beserta dasar pertimbangannya.',
      statusApp: 'Tersedia (Output 4 & Profil Tematik WP)',
    },
    {
      sasaranKak: 'd. Konsep rencana struktur ruang',
      luaranProposal: 'Luaran 7 butir b dan Luaran 8 butir a',
      keterangan: 'Konsep rencana struktur ruang (pusat pelayanan PPK/PPL, sistem transportasi arteri/kolektor/lokal, jaringan rel ganda KRL & Stasiun Gawok) serta Konsep Peta Rencana Struktur Ruang 1:5.000.',
      statusApp: 'Tersedia (Peta Tematik & Jaringan Riil)',
    },
    {
      sasaranKak: 'e. Konsep rencana pola ruang',
      luaranProposal: 'Luaran 7 butir c dan Luaran 8 butir b',
      keterangan: 'Konsep rencana pola ruang (zona lindung sempadan sungai 100m, sawah LP2B DI Colo, perumahan, industri mebel) serta Konsep Peta Rencana Pola Ruang 1:5.000.',
      statusApp: 'Tersedia (Matriks Pola Ruang & Studio Peta)',
    },
    {
      sasaranKak: 'f. Konsep ketentuan pemanfaatan ruang',
      luaranProposal: 'Luaran 7 butir d',
      keterangan: 'Konsep ketentuan pemanfaatan ruang memuat indikasi program utama perwujudan struktur dan pola ruang per 5 tahunan.',
      statusApp: 'Tersedia (Output 4 & Rencana Pemanfaatan)',
    },
    {
      sasaranKak: 'g. Konsep peraturan zonasi',
      luaranProposal: 'Luaran 7 butir e',
      keterangan: 'Konsep aturan dasar zonasi: ketentuan kegiatan (ITBX), intensitas pemanfaatan ruang (KDB, KLB, KDH), tata bangunan, prasarana minimal, dan ketentuan khusus.',
      statusApp: 'Tersedia (Matriks ITBX & Aturan Intensitas)',
    },
    {
      sasaranKak: 'h. Konsep Ranperkada',
      luaranProposal: 'Luaran 9: Draf Ranperkada RDTR',
      keterangan: 'Batang tubuh rancangan peraturan kepala daerah (Perbup), lampiran album peta rencana 1:5.000, dan lampiran tabel ketentuan peraturan zonasi.',
      statusApp: 'Tersedia (Legal Drafting Ranperkada & Ekspor)',
    },
  ],

  // 11 Luaran Lengkap Proposal FTUI
  daftar11Luaran: [
    {
      no: 1,
      kode: 'LUARAN-01',
      nama: 'Laporan Pendahuluan',
      sasaranKakTerkait: 'Persiapan & Kerangka Kerja',
      muatanUtama: [
        'Pemahaman komprehensif terhadap KAK dan kerangka perundang-undangan penataan ruang',
        'Metodologi pelaksanaan rapid assessment berbasis kajian teknis',
        'Kerangka analisis wilayah dan rantai penalaran perencanaan',
        'Identifikasi kebutuhan data primer dan sekunder beserta sumbernya',
        'Rencana kerja rinci dan jadwal 12 minggu pelaksanaan pekerjaan',
        'Instrumen survei (ground check, kuesioner, formulir GCP/ICP, SOP drone)',
      ],
      formatPenyerahan: 'Buku laporan cetak (4 eksemplar) dan digital (PDF), diserahkan 1 bulan setelah SPMK',
      keterangan: 'Memandu konsistensi seluruh tahapan pelaksanaan pekerjaan',
      status: 'Tersedia di Sistem',
    },
    {
      no: 2,
      kode: 'LUARAN-02',
      nama: 'Delineasi Wilayah Perencanaan',
      sasaranKakTerkait: 'Sasaran KAK butir a',
      muatanUtama: [
        'Peta delineasi 3 Wilayah Perencanaan (Mojolaban, Baki, Gatak) skala 1:5.000',
        'Dasar pertimbangan delineasi (prinsip fokus, efisiensi, konektivitas Solo Raya, batas fisik riil)',
        'Eksklusi definitif RDTR Kecamatan Grogol (SK Bupati Sukoharjo No. 600.3/342/2026)',
        'Berita Acara kesepakatan delineasi hasil FGD 1 dengan Pemkab Sukoharjo',
      ],
      formatPenyerahan: 'Laporan teknis delineasi, shapefile/GeoJSON batas WP, dan Berita Acara FGD 1',
      keterangan: 'Menjadi landasan batas yurisdiksi spasial seluruh analisis lanjutan',
      status: 'Tersedia di Sistem',
    },
    {
      no: 3,
      kode: 'LUARAN-03',
      nama: 'Basis Data Spasial dan Nonspasial',
      sasaranKakTerkait: 'Sasaran KAK butir b',
      muatanUtama: [
        'Geodatabase terstruktur berbasis sistem referensi SRGI 2013 / UTM Zone 49S',
        'Metadata standar nasional informasi geospasial (sumber, tahun, akurasi, riwayat)',
        'Data hasil pengolahan spasial dan nonspasial tingkat desa/kelurahan (5 tahun terakhir)',
        'Dokumentasi sumber data, matriks inventarisasi, dan penanganan data gap',
      ],
      formatPenyerahan: 'Geodatabase (GDB/GeoJSON/SHP) dan media penyimpanan Harddisk 1 TB per WP',
      keterangan: 'Struktur siap integrasi dengan Database Peraturan Zonasi (DBPZ) dan GISTARU ATR/BPN',
      status: 'Tersedia di Sistem',
    },
    {
      no: 4,
      kode: 'LUARAN-04',
      nama: 'Peta Dasar dan Peta Tematik (Skala 1:5.000)',
      sasaranKakTerkait: 'Sasaran KAK butir b',
      muatanUtama: [
        'Peta dasar skala 1:5.000 berorientasi ortorektifikasi CSRT ber-GCP/ICP terverifikasi BIG',
        'Peta penggunaan dan tutupan lahan multi-temporal (2015, 2020, 2025)',
        'Peta kondisi fisik wilayah (topografi DEM, kemiringan lereng, geologi, hidrologi)',
        'Peta jaringan transportasi dan infrastruktur (jalan arteri, kolektor, KRL Solo-Yogya, stasiun, utilitas)',
        'Peta lingkungan dan sempadan sungai (Bengawan Solo 100m, Kali Jenes, saluran irigasi teknis)',
        'Peta risiko kebencanaan (kerawanan banjir genangan Bengawan Solo, gempa)',
      ],
      formatPenyerahan: 'Album Peta A1/A3 cetak dan digital georeferenced format TIFF/PDF/SHP',
      keterangan: 'Memenuhi kaidah kartografi ATR/BPN dan ketentuan ketelitian skala 1:5.000',
      status: 'Tersedia di Sistem',
    },
    {
      no: 5,
      kode: 'LUARAN-05',
      nama: 'Dokumen Fakta dan Analisis (12 Aspek Rapid Assessment)',
      sasaranKakTerkait: 'Sasaran KAK butir b',
      muatanUtama: [
        'Kependudukan dan sosial budaya (proyeksi 20 tahun, struktur usia, sebaran)',
        'Ekonomi dan sektor unggulan (Location Quotient, sentra mebel Trangsan, industri ciu Bekonang)',
        'Sumber daya alam dan fisik lingkungan (daya dukung air, kemampuan lahan)',
        'Penggunaan lahan dan deteksi alih fungsi (konversi sawah ke perumahan/industri)',
        'Sumber daya buatan (evaluasi SNI 03-1733-2004 kecukupan sarana dan utilitas)',
        'Struktur internal WP dan hierarki pusat pelayanan (skalogram)',
        'Transportasi (V/C ratio jalan, konektivitas Stasiun Gawok, angkutan umum)',
        'Lingkungan binaan (karakteristik intensitas bangunan KDB/KLB dan tipologi kawasan)',
        'Karakteristik peruntukan zona dan daya dukung lokasi',
        'Kebencanaan (mitigasi risiko banjir Bengawan Solo)',
        'Perubahan iklim dan dinamika Urban Heat Island (LST)',
        'Jasa lingkungan dan kawasan perlindungan resapan air',
      ],
      formatPenyerahan: 'Buku Fakta dan Analisis cetak (4 eksemplar) dan dokumen digital',
      keterangan: 'Evidence base menyeluruh yang menghubungkan fakta empiris dengan rencana',
      status: 'Tersedia di Sistem',
    },
    {
      no: 6,
      kode: 'LUARAN-06',
      nama: 'Matriks Isu, Potensi, Permasalahan, dan Implikasi Penataan Ruang',
      sasaranKakTerkait: 'Sasaran KAK butir b',
      muatanUtama: [
        'Sintesis Spatial Potential (keunggulan aglomerasi Solo Raya & klaster rotan Trangsan)',
        'Sintesis Spatial Constraint (kawasan rawan banjir luapan sungai & sempadan)',
        'Sintesis Spatial Pressure (konversi masif sawah irigasi teknis Colo menjadi perumahan peri-urban)',
        'Sintesis Spatial Risk (bencana hidrometeorologi dan degradasi sempadan)',
        'Sintesis Spatial Conflict (tumpang-tindih LP2B vs zonasi industri/perumahan)',
        'Matriks keterkaitan langsung antara isu strategis dengan rumusan ketentuan RDTR',
      ],
      formatPenyerahan: 'Tabel matriks sintesis komprehensif dalam buku analisis dan digital spreadsheet',
      keterangan: 'Jembatan metodologis antara hasil temuan analitis dan rumusan materi teknis',
      status: 'Tersedia di Sistem',
    },
    {
      no: 7,
      kode: 'LUARAN-07',
      nama: 'Konsep Buku Rencana RDTR',
      sasaranKakTerkait: 'Sasaran KAK butir c, d, e, f, g',
      muatanUtama: [
        'Butir a: Tujuan penataan ruang tiap WP beserta dasar pertimbangannya',
        'Butir b: Konsep rencana struktur ruang (jaringan jalan, kereta api, energi, telekomunikasi, air minum, drainase, persampahan)',
        'Butir c: Konsep rencana pola ruang (zona lindung setempat, zona budi daya perumahan, perdagangan jasa, industri, SPBU, RTH)',
        'Butir d: Konsep ketentuan pemanfaatan ruang (indikasi program perwujudan 5 tahunan)',
        'Butir e: Konsep peraturan zonasi (ketentuan kegiatan ITBX, intensitas KDB/KLB/KDH, tata bangunan, prasarana minimal, ketentuan khusus LP2B & sempadan)',
      ],
      formatPenyerahan: 'Buku Rencana RDTR cetak (4 eksemplar per WP) dan berkas digital',
      keterangan: 'Materi substansi teknis lengkap siap uji publik dan persetujuan substansi',
      status: 'Tersedia di Sistem',
    },
    {
      no: 8,
      kode: 'LUARAN-08',
      nama: 'Konsep Peta Rencana (Skala 1:5.000)',
      sasaranKakTerkait: 'Sasaran KAK butir d & e',
      muatanUtama: [
        'Butir a: Konsep Peta Rencana Struktur Ruang skala 1:5.000 per WP',
        'Butir b: Konsep Peta Rencana Pola Ruang skala 1:5.000 per WP (kode zona & sub-zona standar Permen ATR/BPN No. 11/2021)',
      ],
      formatPenyerahan: 'Album Peta Rencana skala 1:5.000 cetak ukuran A1 dan file geospasial shapefile/geodatabase',
      keterangan: 'Memenuhi standar verifikasi teknis BIG dan Ditjen Tata Ruang ATR/BPN',
      status: 'Tersedia di Sistem',
    },
    {
      no: 9,
      kode: 'LUARAN-09',
      nama: 'Draf Ranperkada RDTR',
      sasaranKakTerkait: 'Sasaran KAK butir h',
      muatanUtama: [
        'Batang tubuh Rancangan Peraturan Kepala Daerah (Peraturan Bupati Sukoharjo)',
        'Lampiran I: Batas Wilayah Perencanaan dan Koordinat Geografis',
        'Lampiran II: Album Peta Struktur Ruang dan Pola Ruang skala 1:5.000',
        'Lampiran III: Tabel Matriks Ketentuan Kegiatan dan Penggunaan Lahan (ITBX)',
        'Lampiran IV: Ketentuan Intensitas Pemanfaatan Ruang (KDB, KLB, KDH, GSB)',
        'Lampiran V: Indikasi Program Prioritas Pemanfaatan Ruang 5 Tahunan',
      ],
      formatPenyerahan: 'Naskah legal drafting Perbup format Word/PDF dan lampiran peta tabel resmi',
      keterangan: 'Instrumen hukum operasional dasar pelayanan izin KKPR & OSS-RBA',
      status: 'Tersedia di Sistem',
    },
    {
      no: 10,
      kode: 'LUARAN-10',
      nama: 'Citra Satelit Resolusi Tinggi (CSRT)',
      sasaranKakTerkait: 'Data Geospasial Dasar',
      muatanUtama: [
        'Citra satelit resolusi tinggi ortorektifikasi (resolusi spasial 0.5 - 0.6 meter)',
        'Sebaran titik kontrol tanah (GCP) dan titik uji independen (ICP)',
        'Laporan uji akurasi posisi horizontal (CE90) memenuhi toleransi skala 1:5.000',
        'Toponimi terverifikasi hasil koordinasi dengan BRIN dan BIG',
      ],
      formatPenyerahan: 'Softcopy citra ortorektifikasi format GeoTIFF/ECW dalam harddisk eksternal',
      keterangan: 'Rujukan visual objektif batas persil dan fisik lapangan',
      status: 'Tersedia di Sistem',
    },
    {
      no: 11,
      kode: 'LUARAN-11',
      nama: 'Dokumentasi Pembahasan & Penjaringan Aspirasi',
      sasaranKakTerkait: 'Validasi & Pelibatan Stakeholder',
      muatanUtama: [
        'Berita Acara dan Notulensi FGD 1 (Penetapan Delineasi Awal di Daerah)',
        'Berita Acara dan Daftar Masukan Konsultasi Publik 1 (KP 1 RDTR di Daerah)',
        'Berita Acara dan Notulensi FGD 2 (Pembahasan Konsep Rencana & Peraturan Zonasi)',
        'Notulensi FGD 3 di Jakarta (Sinkronisasi Program K/L & Penajaman Ranperkada)',
        'Matriks rekapitulasi tanggapan dan tindak lanjut masukan pemangku kepentingan',
      ],
      formatPenyerahan: 'Buku kompilasi dokumentasi, foto berkoordinat, daftar hadir, dan rekaman digital',
      keterangan: 'Menjamin akuntabilitas publik dan konsensus lintas sektor Pemda & Kementerian',
      status: 'Tersedia di Sistem',
    },
  ],

  // Tim Pelaksana FTUI (41 Personil - Tabel 9 Proposal)
  timPersonil: [
    { no: 1, nama: 'Prof. Ir. Antony Sihombing, MPD., Ph.D', jabatan: 'Team Leader / Ahli Perencanaan Wilayah dan Kota', usia: 67, jenisKelamin: 'L', pendidikanTerakhir: 'S3', statusPegawai: 'ASN', bidangKeahlian: 'Perencanaan Wilayah & Kota Senior' },
    { no: 2, nama: 'Dr. Intan Hapsari Surya Putri., S.PWK., M.PWK', jabatan: 'Tenaga Ahli Perencanaan Wilayah dan Kota (Co-TL)', usia: 30, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Perencanaan Spasial & Kebijakan Wilayah' },
    { no: 3, nama: 'Nadia Indriani Surbakti., S.Ars., M.PWK', jabatan: 'Tenaga Ahli Perencanaan Wilayah dan Kota (Co-TL)', usia: 27, jenisKelamin: 'P', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Perancangan Tata Ruang & Morfologi Urban' },
    { no: 4, nama: 'Reza Pangestu Iskandar, M.PWK', jabatan: 'Tenaga Ahli Perencanaan Wilayah dan Kota (Co-TL)', usia: 26, jenisKelamin: 'L', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Analisis Spasial & Komputasi Wilayah' },
    { no: 5, nama: 'Farrah Eriska Putri., S.T., M.Ars', jabatan: 'Tenaga Ahli Rancang Kota', usia: 31, jenisKelamin: 'P', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Urban Design & Intensitas Bangunan' },
    { no: 6, nama: 'Dr. Lathiyfah Shanti Purnamasari, S.T., M.Ars', jabatan: 'Tenaga Ahli Rancang Kota', usia: 40, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Tipologi Permukiman & Rancang Kota' },
    { no: 7, nama: 'Cut Sannas Saskia, M.Ars', jabatan: 'Tenaga Ahli Rancang Kota', usia: 31, jenisKelamin: 'P', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Perancangan Kawasan & Ketentuan Khusus' },
    { no: 8, nama: 'Ardiansyah, S.Si', jabatan: 'Tenaga Ahli Pemetaan / GIS', usia: 38, jenisKelamin: 'L', pendidikanTerakhir: 'S1', statusPegawai: 'Lainnya', bidangKeahlian: 'Penginderaan Jauh & Database Geospasial' },
    { no: 9, nama: 'Septian Rahmadi, S.Si', jabatan: 'Tenaga Ahli Pemetaan / GIS', usia: 37, jenisKelamin: 'L', pendidikanTerakhir: 'S1', statusPegawai: 'Lainnya', bidangKeahlian: 'Kartografi & Geoprocessing SIG' },
    { no: 10, nama: 'Mohammad Umar, S.Si., M.PWK', jabatan: 'Tenaga Ahli Pemetaan / GIS', usia: 27, jenisKelamin: 'L', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Analisis Multi-Kriteria Spasial & GEE' },
    { no: 11, nama: 'Dr. Rr. Dwinanti Rika Marthanty, ST, MT', jabatan: 'Tenaga Ahli Geologi / Kebencanaan', usia: 46, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Mitigasi Bencana & Hidrometeorologi' },
    { no: 12, nama: 'Prof. Ir. R Jachrizal Sumabrata, M.Sc.(Eng)., Ph.D., IPU.', jabatan: 'Tenaga Ahli Infrastruktur', usia: 64, jenisKelamin: 'L', pendidikanTerakhir: 'S3', statusPegawai: 'ASN', bidangKeahlian: 'Transportasi Wilayah & Jaringan Prasarana' },
    { no: 13, nama: 'Fathiyah Hakim Sagitaningrum, S.T., M.T., Ph.D', jabatan: 'Tenaga Ahli Infrastruktur', usia: 32, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Sistem Drainase & Utilitas Kota' },
    { no: 14, nama: 'Dr. Mustika Sari, S.T., M.T', jabatan: 'Tenaga Ahli Infrastruktur', usia: 39, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'ASN', bidangKeahlian: 'Infrastruktur Perkotaan & Jaringan Jalan' },
    { no: 15, nama: 'Dr.-Eng. Mochamad Adhiraga Pratama, S.T., M.T.', jabatan: 'Tenaga Ahli Lingkungan', usia: 39, jenisKelamin: 'L', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Kajian Lingkungan Hidup Strategis (KLHS)' },
    { no: 16, nama: 'Nopa Dwi Maulidiany, S.T., M.T., Ph.D', jabatan: 'Tenaga Ahli Lingkungan', usia: 35, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Daya Dukung Lingkungan & Jasa Ekosistem' },
    { no: 17, nama: 'Ridwan Hakim, S.T., M.T.', jabatan: 'Tenaga Ahli Lingkungan', usia: 34, jenisKelamin: 'L', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Pengelolaan Limbah & Sempadan Riparian' },
    { no: 18, nama: 'Azrar Hadi H Ramli, Ph.D.', jabatan: 'Tenaga Ahli Ekonomi Pembangunan', usia: 76, jenisKelamin: 'L', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Ekonomi Regional & Sektor Unggulan' },
    { no: 19, nama: 'Dr. Risna Triandhari, M.S.E', jabatan: 'Tenaga Ahli Ekonomi Pembangunan', usia: 41, jenisKelamin: 'P', pendidikanTerakhir: 'S3', statusPegawai: 'Lainnya', bidangKeahlian: 'Pembiayaan Pembangunan & Investasi Daerah' },
    { no: 20, nama: 'Adam Faiana Amru, MBA', jabatan: 'Tenaga Ahli Ekonomi Pembangunan', usia: 39, jenisKelamin: 'L', pendidikanTerakhir: 'S2', statusPegawai: 'Lainnya', bidangKeahlian: 'Ekonomi Industri Kreatif & Rantai Pasok' },
  ] as ProposalTeamMember[],

  asistenDanPendukung: {
    asistenPWKCount: 6, // Yohana Romauli, Amanda Hardiana, Achmad Fachri, Annasya Sausan, Neysa Vasthi, Muh. Fauzan Azhari
    asistenGISCount: 3, // Christian Nathanael, Dimas Setya, Yulisa Ade
    administrasiCount: 3, // Virda Khairun Nisa, Julius Eduvin Pandjaitan, Advia Fildzah
    surveyorCount: 9, // Daivanya Natasya, Dini Putri, Fia Sholihah, Vania Gustiansyah, Aliyyah Hanan, Yohana Febiola, Nabeela Shafa, Lathifa Salma, Ayeshia Putri
    totalPersonil: 41,
  },

  // Tabel 10: Peralatan Kerja
  peralatanSurvei: [
    { no: 1, nama: 'GPS Geodetic (GNSS Receiver)', spesifikasi: 'GNSS Geodetic Receiver multi-konstelasi (GPS, GLONASS, Galileo, BeiDou), controller/data collector, tripod, pole', tahunStatus: '≥ 2020', kegunaan: 'Pengukuran titik kontrol (GCP), titik uji independen (ICP), dan verifikasi geometrik batas peta skala 1:5.000.' },
    { no: 2, nama: 'GPS Handheld', spesifikasi: 'Akurasi 3-5m, navigasi satelit GNSS, penyimpanan waypoint/track, ekspor koordinat', tahunStatus: '≥ 2020', kegunaan: 'Inventarisasi lapangan, tracking fasilitas umum/sosial, jaringan prasarana, dan cek lapangan tutupan lahan.' },
    { no: 3, nama: 'Drone Unmanned Aerial Vehicle (UAV)', spesifikasi: 'Kamera digital beresolusi tinggi, GPS/GNSS positioning, terbang otomatis berprogram, baterai cadangan', tahunStatus: '≥ 2020', kegunaan: 'Pemotretan udara resolusi ultra-tinggi untuk kawasan prioritas (simpul Stasiun Gawok, sentra Trangsan, koridor Bekonang).' },
    { no: 4, nama: 'Workstation PC / GIS Station', spesifikasi: 'Intel Core i7/AMD Ryzen 7, RAM 32 GB, SSD 1 TB, Dedicated GPU untuk olah citra', tahunStatus: '≥ 2020', kegunaan: 'Pengolahan citra satelit, ortorektifikasi, digitasi, geoprocessing GIS, dan layout album peta.' },
    { no: 5, nama: 'ArcGIS Licences', spesifikasi: 'Perangkat lunak GIS berlisensi resmi untuk pengolahan data vector, raster, geodatabase, buffering, network analysis', tahunStatus: 'Lisensi Aktif', kegunaan: 'Penyusunan geodatabase RDTR, peta rencana struktur ruang, dan pola ruang.' },
    { no: 6, nama: 'Google Earth Engine & Google Earth Pro', spesifikasi: 'Platform komputasi cloud geospasial skala petabyte + visualisasi 3D citra satelit historis', tahunStatus: 'Versi Aktif', kegunaan: 'Analisis multi-temporal Sentinel-2 (2015, 2020, 2025), deteksi alih fungsi lahan sawah, NDVI, LST, dan verifikasi kondisi eksisting.' },
  ] as ProposalEquipment[],

  // 14 Risiko Utama & Mitigasi (Tabel 13)
  mitigasiRisiko: [
    { no: 1, risikoUtama: 'Keterbatasan atau keterlambatan data sektoral', dampakPotensial: 'Analisis tidak dapat dilakukan secara lengkap atau tepat waktu', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Menyusun matriks kebutuhan data sejak tahap awal, menetapkan data prioritas, koordinasi aktif dengan instansi pemilik data, serta menggunakan data alternatif GEE/citra satelit yang dapat dipertanggungjawabkan.', penanggungJawab: 'Team Leader dan tenaga ahli terkait' },
    { no: 2, risikoUtama: 'Ketidakkonsistenan format, skala, tahun, dan sumber data', dampakPotensial: 'Integrasi data dan analisis berpotensi menghasilkan kesimpulan yang kurang akurat', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Melakukan standardisasi format, penyamaan sistem koordinat SRGI 2013 UTM 49S, verifikasi sumber, pemeriksaan metadata, dan pengendalian mutu data.', penanggungJawab: 'Tenaga Ahli GIS dan tim pemetaan' },
    { no: 3, risikoUtama: 'Perbedaan antara data sekunder dan kondisi aktual', dampakPotensial: 'Interpretasi kondisi wilayah kurang representatif', tingkatRisiko: 'Sedang–Tinggi', strategiMitigasi: 'Melakukan verifikasi lapangan pada lokasi prioritas dengan GPS/drone, dokumentasi berkoordinat, dan pemeriksaan silang antara hasil observasi dengan basis data.', penanggungJawab: 'Team Leader dan tim survei' },
    { no: 4, risikoUtama: 'Keterbatasan waktu pelaksanaan (3 bulan / 12 minggu)', dampakPotensial: 'Sebagian kegiatan, analisis, pembahasan, atau validasi berpotensi mengalami keterlambatan', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Menetapkan kegiatan pada jalur kritis, melaksanakan pekerjaan secara paralel, memantau kemajuan setiap minggu, dan memprioritaskan keluaran utama.', penanggungJawab: 'Team Leader' },
    { no: 5, risikoUtama: 'Keterlambatan koordinasi dan tanggapan pemangku kepentingan', dampakPotensial: 'Pengumpulan data, validasi, dan pengambilan keputusan tertunda', tingkatRisiko: 'Sedang–Tinggi', strategiMitigasi: 'Menetapkan narahubung, menyusun kalender koordinasi, menyampaikan bahan pembahasan lebih awal, serta menyiapkan jadwal alternatif.', penanggungJawab: 'Team Leader dan Co-Team Leader' },
    { no: 6, risikoUtama: 'Perbedaan interpretasi antarbidang keahlian', dampakPotensial: 'Hasil analisis tidak terintegrasi dan rumusan rencana menjadi tidak konsisten', tingkatRisiko: 'Sedang', strategiMitigasi: 'Melaksanakan rapat teknis lintas bidang mingguan, telaah sejawat internal, dan pembahasan sintesis hasil analisis.', penanggungJawab: 'Team Leader dan Co-Team Leader' },
    { no: 7, risikoUtama: 'Perubahan atau ketidakjelasan delineasi wilayah perencanaan', dampakPotensial: 'Basis data, analisis, dan peta perlu disesuaikan kembali', tingkatRisiko: 'Sedang', strategiMitigasi: 'Menetapkan delineasi melalui FGD 1 dan Berita Acara kesepakatan serta menerapkan pengendalian versi batas wilayah perencanaan (menegaskan status luar RDTR Grogol).', penanggungJawab: 'Team Leader dan Tenaga Ahli GIS' },
    { no: 8, risikoUtama: 'Temuan lapangan berbeda dari indikasi awal', dampakPotensial: 'Interpretasi data dan peta perlu diperbaiki', tingkatRisiko: 'Sedang', strategiMitigasi: 'Menggunakan hasil verifikasi lapangan sebagai dasar perbaikan basis data, peta, dan hasil analisis secara terukur.', penanggungJawab: 'Tenaga Ahli GIS dan tenaga ahli terkait' },
    { no: 9, risikoUtama: 'Keterbatasan kualitas data kebencanaan dan lingkungan', dampakPotensial: 'Analisis risiko dan lingkungan menjadi kurang terperinci', tingkatRisiko: 'Sedang', strategiMitigasi: 'Memadukan data sekunder BPBD/BBWS Bengawan Solo dengan pemodelan spasial GEE (NDWI, SRTM DEM, riwayat genangan citra satelit), membedakan fakta dan indikasi.', penanggungJawab: 'Tenaga Ahli Kebencanaan & Lingkungan' },
    { no: 10, risikoUtama: 'Kesalahan geometri, atribut, atau topologi data spasial', dampakPotensial: 'Basis data geospasial tidak dapat digunakan secara optimal atau gagal uji validasi BIG', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Melakukan pemeriksaan sistem koordinat, geometri bebas celah/overlap, atribut, topologi, kode, dan metadata secara bertahap sejak awal.', penanggungJawab: 'Tenaga Ahli GIS' },
    { no: 11, risikoUtama: 'Masukan hasil FGD dan konsultasi publik tidak terdokumentasi', dampakPotensial: 'Masukan pemangku kepentingan tidak terakomodasi dalam dokumen', tingkatRisiko: 'Sedang', strategiMitigasi: 'Menyusun berita acara, notulensi rinci, dokumentasi foto, dan matriks rekapitulasi masukan serta status tindak lanjut.', penanggungJawab: 'Co-Team Leader dan tim administrasi' },
    { no: 12, risikoUtama: 'Ketidaksesuaian antara laporan, tabel, peta, dan basis data', dampakPotensial: 'Keluaran menjadi tidak konsisten dan menurunkan kredibilitas pekerjaan', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Melakukan pemeriksaan silang (cross-check) berjenjang antara basis data, peta, tabel, grafik, dan narasi sebelum penyerahan laporan.', penanggungJawab: 'Team Leader, Tenaga Ahli GIS, dan tim penyusun' },
    { no: 13, risikoUtama: 'Penambahan pekerjaan di luar ruang lingkup KAK', dampakPotensial: 'Jadwal dan alokasi sumber daya 12 minggu terganggu', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Mencatat setiap usulan perubahan, menilai pengaruhnya terhadap jadwal kritis, dan memperoleh keputusan tertulis pemberi kerja sebelum dilaksanakan.', penanggungJawab: 'Team Leader dan pemberi kerja' },
    { no: 14, risikoUtama: 'Kehilangan atau kerusakan data digital', dampakPotensial: 'Sebagian data dan hasil pekerjaan harus disusun kembali', tingkatRisiko: 'Tinggi', strategiMitigasi: 'Melakukan pencadangan (backup) berkala, penyimpanan cloud terenkripsi, penyimpanan fisik pada harddisk eksternal 1 TB mandiri per WP.', penanggungJawab: 'Tenaga Ahli GIS dan pengelola data' },
  ] as ProposalRiskItem[],

  // Pengendalian Mutu 4 Lapis (Quality Control)
  pengendalianMutu: [
    {
      tingkat: '1. Mutu Data (Data Quality)',
      fokus: 'Pemeriksaan sumber resmi, relevansi kebutuhan, keterbaruan tahun, satuan, cakupan wilayah, dan dokumentasi data gap.',
    },
    {
      tingkat: '2. Mutu Data Spasial (Spatial Quality)',
      fokus: 'Pemeriksaan sistem koordinat SRGI 2013, ketelitian geometrik skala 1:5.000, kelengkapan atribut, topologi (bebas celah & tumpang-tindih), dan standar geodatabase BIG.',
    },
    {
      tingkat: '3. Mutu Analisis (Analytical Quality)',
      fokus: 'Ketertelusuran metode, proses pengolahan GEE, dukungan bukti empiris, dan verifikasi konsistensi lintas disiplin keahlian.',
    },
    {
      tingkat: '4. Relevansi Perencanaan (Planning Relevance)',
      fokus: 'Penerjemahan temuan analitis menjadi arahan operasional penataan ruang (tujuan, struktur ruang, pola ruang, aturan ITBX, dan pasal Ranperkada).',
    },
  ],

  // Rencana Kerja 12 Minggu (Tabel 12)
  jadwalKerja12Minggu: [
    { no: 1, tahapan: 'Persiapan & Kajian Awal Kebijakan', durasi: 'Minggu 1 - 3', milestone: 'Kajian awal RTRW, RPJMD, SK RDTR Grogol, penyiapan metodologi & mobilisasi tim' },
    { no: 2, tahapan: 'FGD 1: Penetapan Delineasi Awal di Daerah', durasi: 'Minggu 3 - 5', milestone: 'Kesepakatan Berita Acara Delineasi 3 WP bersama Pemda Sukoharjo & ATR/BPN' },
    { no: 3, tahapan: 'Survei Lapangan & Pengolahan Peta Skala 1:5.000', durasi: 'Minggu 4 - 7', milestone: 'Pengukuran GCP/ICP GNSS, drone kawasan prioritas, ortorektifikasi CSRT & koordinasi BIG' },
    { no: 4, tahapan: 'Pengolahan Data & Rapid Assessment 12 Aspek GEE', durasi: 'Minggu 4 - 8', milestone: '16 Modul Analisis GEE, LULC 2015-2025, alih fungsi sawah, NDBI, DPI, LST, banjir' },
    { no: 5, tahapan: 'Perumusan Konsep Awal RDTR', durasi: 'Minggu 6 - 9', milestone: 'Tujuan penataan, konsep struktur ruang, konsep pola ruang, dan identifikasi KLHS' },
    { no: 6, tahapan: 'Konsultasi Publik 1 (KP 1 RDTR di Daerah)', durasi: 'Minggu 9 - 10', milestone: 'Pemaparan hasil analisis, tujuan, struktur & pola ruang bersama DPRD & Forum Penataan Ruang' },
    { no: 7, tahapan: 'Penyusunan Aturan Zonasi (PZ) & Indikasi Program', durasi: 'Minggu 9 - 11', milestone: 'Ketentuan kegiatan ITBX, intensitas KDB/KLB/KDH, tata bangunan, dan indikasi program 5 tahunan' },
    { no: 8, tahapan: 'FGD 2: Pembahasan Konsep PZ & Program di Daerah', durasi: 'Minggu 10 - 11', milestone: 'Berita acara pembahasan materi Peraturan Zonasi bersama Pemkab Sukoharjo' },
    { no: 9, tahapan: 'FGD 3: Sinkronisasi Program K/L di Jakarta', durasi: 'Minggu 11 - 12', milestone: 'Sinkronisasi program kementerian/lembaga nasional dan penajaman pasal Ranperkada' },
    { no: 10, tahapan: 'Finalisasi Laporan Akhir & Penyerahan Seluruh Dokumen', durasi: 'Minggu 12', milestone: 'Penyerahan 11 Luaran Pekerjaan, Buku Rencana, Draf Ranperkada, Album Peta, dan Harddisk 1 TB per WP' },
  ],
};
