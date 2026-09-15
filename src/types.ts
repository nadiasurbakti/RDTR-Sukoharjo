export type WPId = 'all' | 'mojolaban' | 'baki' | 'gatak';

export type TemporalYear = '2015' | '2020' | '2025';

export type LayerMode = 
  | 'delineation_status'
  | 'desa_boundaries'
  | 'delineation_scenario_1'
  | 'delineation_scenario_2'
  | 'delineation_scenario_3'
  | 'lulc'
  | 'change_detection'
  | 'development_pressure'
  | 'built_up'
  | 'ndvi'
  | 'ndwi'
  | 'road_buffers'
  | 'environmental'
  | 'typology'
  | 'satellite'
  | 'true_color'
  | 'gee_m01'
  | 'gee_m02'
  | 'gee_m03'
  | 'gee_m04'
  | 'gee_m05'
  | 'gee_m06'
  | 'gee_m07'
  | 'gee_m08'
  | 'gee_m09'
  | 'gee_m10'
  | 'gee_m11'
  | 'gee_m12'
  | 'gee_m13'
  | 'gee_m14'
  | 'gee_m15'
  | 'gee_m16';

export interface WPStats {
  id: WPId;
  name: string;
  kabupaten: string;
  totalAreaHa: number;
  bpsCode: string;
  villagesCount: number;
  hypothesizedCharacter: string;
  confirmedCharacter: string;
  // Built up
  builtUp2015Ha: number;
  builtUp2020Ha: number;
  builtUp2025Ha: number;
  builtUpGrowthHa: number; // 2015-2025
  builtUpGrowthPct: number;
  annualizedGrowthHa: number;
  // Agriculture
  agri2015Ha: number;
  agri2020Ha: number;
  agri2025Ha: number;
  agriConversionHa: number; // to built up
  agriConversionPct: number;
  // Vegetation & Water
  vegetation2025Ha: number;
  vegetationPct: number;
  water2025Ha: number;
  waterPct: number;
  // Development pressure
  developmentPressureScore: number; // 0 - 100
  developmentPressureCategory: 'Sangat Rendah' | 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  // Road corridor development
  builtWithin100mPct: number;
  builtWithin250mPct: number;
  builtWithin500mPct: number;
  // Morphology
  morphology: {
    infillPct: number;
    edgeExpansionPct: number;
    leapfrogPct: number;
  };
  // Fragmentation
  fragmentation: {
    patchCount2015: number;
    patchCount2025: number;
    meanPatchSizeHa2015: number;
    meanPatchSizeHa2025: number;
    edgeDensityMPerHa: number;
  };
  // Environmental constraint
  environmentalConstraintHa: number;
  environmentalConstraintPct: number;
  floodSusceptibilityHa: number;
}

export interface AnalysisModule {
  number: number;
  code: string;
  title: string;
  titleId: string;
  category: 'Baseline' | 'Biophysical' | 'Urban Dynamics' | 'Spatial Planning';
  geeFunction: string;
  primaryDataset: string;
  resolution: string;
  description: string;
  methodology: string;
  planningRelevance: string;
  keyMetrics: { label: string; value: string; note?: string }[];
}

export interface DataMethodRow {
  analysis: string;
  dataset: string;
  resolution: string;
  period: string;
  method: string;
  output: string;
  planningUtility: string;
}

export interface SpatialCharacterRow {
  wp: string;
  evidence: string;
  spatialPattern: string;
  mainPressure: string;
  planningImplication: string;
  preliminaryTheme: string;
}

export interface RDTRInterpretation {
  wpId: 'mojolaban' | 'baki' | 'gatak';
  wpName: string;
  spatialCharacter: string;
  mainTransformation: string;
  mainSpatialPressure: string;
  keySpatialAssets: string[];
  keyConstraints: string[];
  planningTheme: string;
  recommendedSubZoning: {
    zoneCode: string;
    zoneName: string;
    areaPct: number;
    guidelines: string;
  }[];
  itbxDirectives: {
    activity: string;
    i: string; // Izin
    t: string; // Terbatas
    b: string; // Bersyarat
    x: string; // Dilarang
    notes: string;
  }[];
}
