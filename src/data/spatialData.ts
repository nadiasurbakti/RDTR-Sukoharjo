import { WPStats } from '../types';
import sukoharjoKecamatanGeo from './sukoharjo_kecamatan.json';

// Helper to extract official geometry from portal data
const getKecFeature = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const found = (sukoharjoKecamatanGeo as any).features.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (f: any) => f.properties.WADMKC === name
  );
  return found;
};

export const WP_STATISTICS: Record<'mojolaban' | 'baki' | 'gatak', WPStats> = {
  mojolaban: {
    id: 'mojolaban',
    name: 'Kecamatan Mojolaban',
    kabupaten: 'Kabupaten Sukoharjo',
    totalAreaHa: 3554,
    bpsCode: '3311090',
    villagesCount: 15,
    hypothesizedCharacter: 'Urban–Rural Transition / Agro-Urban Interface',
    confirmedCharacter: 'Agro-Urban Transition with Riverine Environmental Sensitivity',
    builtUp2015Ha: 1024,
    builtUp2020Ha: 1228,
    builtUp2025Ha: 1462,
    builtUpGrowthHa: 438,
    builtUpGrowthPct: 42.77,
    annualizedGrowthHa: 43.8,
    agri2015Ha: 2112,
    agri2020Ha: 1930,
    agri2025Ha: 1714,
    agriConversionHa: 398,
    agriConversionPct: 18.84,
    vegetation2025Ha: 244,
    vegetationPct: 6.87,
    water2025Ha: 134,
    waterPct: 3.77,
    developmentPressureScore: 68.4,
    developmentPressureCategory: 'Tinggi',
    builtWithin100mPct: 29.4,
    builtWithin250mPct: 53.8,
    builtWithin500mPct: 76.2,
    morphology: {
      infillPct: 26.2,
      edgeExpansionPct: 55.7,
      leapfrogPct: 18.1,
    },
    fragmentation: {
      patchCount2015: 48,
      patchCount2025: 86,
      meanPatchSizeHa2015: 44.0,
      meanPatchSizeHa2025: 19.9,
      edgeDensityMPerHa: 48.2,
    },
    environmentalConstraintHa: 462,
    environmentalConstraintPct: 13.0,
    floodSusceptibilityHa: 418,
  },
  baki: {
    id: 'baki',
    name: 'Kecamatan Baki',
    kabupaten: 'Kabupaten Sukoharjo',
    totalAreaHa: 2197,
    bpsCode: '3311080',
    villagesCount: 14,
    hypothesizedCharacter: 'High-Pressure Peri-Urban Growth Area',
    confirmedCharacter: 'Intensive Peri-Urban Expansion & Severe Farmland Fragmentation',
    builtUp2015Ha: 980,
    builtUp2020Ha: 1215,
    builtUp2025Ha: 1428,
    builtUpGrowthHa: 448,
    builtUpGrowthPct: 45.71,
    annualizedGrowthHa: 44.8,
    agri2015Ha: 1085,
    agri2020Ha: 862,
    agri2025Ha: 668,
    agriConversionHa: 417,
    agriConversionPct: 38.43,
    vegetation2025Ha: 72,
    vegetationPct: 3.28,
    water2025Ha: 29,
    waterPct: 1.32,
    developmentPressureScore: 89.2,
    developmentPressureCategory: 'Sangat Tinggi',
    builtWithin100mPct: 41.2,
    builtWithin250mPct: 69.8,
    builtWithin500mPct: 88.5,
    morphology: {
      infillPct: 41.5,
      edgeExpansionPct: 46.8,
      leapfrogPct: 11.7,
    },
    fragmentation: {
      patchCount2015: 42,
      patchCount2025: 118,
      meanPatchSizeHa2015: 25.8,
      meanPatchSizeHa2025: 5.66,
      edgeDensityMPerHa: 79.4,
    },
    environmentalConstraintHa: 142,
    environmentalConstraintPct: 6.46,
    floodSusceptibilityHa: 98,
  },
  gatak: {
    id: 'gatak',
    name: 'Kecamatan Gatak',
    kabupaten: 'Kabupaten Sukoharjo',
    totalAreaHa: 1947,
    bpsCode: '3311070',
    villagesCount: 14,
    hypothesizedCharacter: 'Agro-Industrial / Productive Landscape',
    confirmedCharacter: 'Agro-Industrial Cluster & Rail-Corridor Oriented Settlement',
    builtUp2015Ha: 574,
    builtUp2020Ha: 692,
    builtUp2025Ha: 825,
    builtUpGrowthHa: 251,
    builtUpGrowthPct: 43.73,
    annualizedGrowthHa: 25.1,
    agri2015Ha: 1220,
    agri2020Ha: 1114,
    agri2025Ha: 996,
    agriConversionHa: 224,
    agriConversionPct: 18.36,
    vegetation2025Ha: 94,
    vegetationPct: 4.83,
    water2025Ha: 32,
    waterPct: 1.64,
    developmentPressureScore: 61.8,
    developmentPressureCategory: 'Sedang',
    builtWithin100mPct: 34.6,
    builtWithin250mPct: 62.4,
    builtWithin500mPct: 81.3,
    morphology: {
      infillPct: 22.4,
      edgeExpansionPct: 58.8,
      leapfrogPct: 18.8,
    },
    fragmentation: {
      patchCount2015: 36,
      patchCount2025: 64,
      meanPatchSizeHa2015: 33.9,
      meanPatchSizeHa2025: 15.6,
      edgeDensityMPerHa: 41.6,
    },
    environmentalConstraintHa: 118,
    environmentalConstraintPct: 6.06,
    floodSusceptibilityHa: 84,
  },
};

// Summary across all 3 WPs
export const TOTAL_STUDY_AREA = {
  totalAreaHa: 7698,
  builtUp2015Ha: 2578,
  builtUp2020Ha: 3135,
  builtUp2025Ha: 3715,
  builtUpGrowthHa: 1137,
  builtUpGrowthPct: 44.1,
  agri2015Ha: 4417,
  agri2025Ha: 3378,
  agriConversionHa: 1039,
  agriConversionPct: 23.52,
};

// Official GeoJSON boundaries for the 3 Kecamatan in Sukoharjo, Central Java
// Sourced directly from Webportal Resmi Penyusunan RDTR (petainteraktif.github.io/rdtrsukoharjo)
// Coordinate Reference: EPSG:4326 (WGS84)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WP_GEOJSON_BOUNDARIES: Record<'mojolaban' | 'baki' | 'gatak', any> = {
  mojolaban: getKecFeature('Mojolaban'),
  baki: getKecFeature('Baki'),
  gatak: getKecFeature('Gatak'),
};

export * from './infrastructureLayers';

// Backward compatibility with real alignments
import { REAL_ROADS, REAL_RAILWAYS, REAL_RIVERS } from './infrastructureLayers';

export const KEY_CORRIDORS = [
  ...REAL_ROADS.map(r => ({
    name: r.name,
    type: r.category === 'arteri' ? 'Arteri' : r.category === 'kolektor' ? 'Kolektor' : 'Lingkungan',
    wp: r.wp,
    coords: r.coordinates,
  })),
  ...REAL_RAILWAYS.map(rw => ({
    name: rw.name,
    type: 'Rel Kereta Api',
    wp: rw.corridor,
    coords: rw.coordinates,
  })),
];

export const RIVER_NETWORK = REAL_RIVERS.map(rv => ({
  name: rv.name,
  wp: rv.wp,
  coords: rv.coordinates,
}));

