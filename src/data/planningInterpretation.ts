import { DataMethodRow, SpatialCharacterRow, RDTRInterpretation, AnalysisModule } from '../types';

export const DATA_METHOD_TABLE: DataMethodRow[] = [
  {
    analysis: '01. Baseline Landscape & True Color Composite',
    dataset: 'COPERNICUS/S2_SR_HARMONIZED (Sentinel-2 MSI Level-2A)',
    resolution: '10 m (B2, B3, B4)',
    period: '2015, 2020, 2025 (Annual Median Composites)',
    method: 'Cloud & Cirrus QA60 bitmasking + Scene Classification Layer (SCL) filtering, surface reflectance scaling (x0.0001), temporal median reduction.',
    output: 'Multi-temporal cloud-free RGB (B4-B3-B2) and False Color NIR (B8-B4-B3) rasters.',
    planningUtility: 'Visual ground-truth verification of physical settlement expansion, urban edge advancement, and baseline context for public consultation.'
  },
  {
    analysis: '02. Vegetation Vigor & Persistence',
    dataset: 'Sentinel-2 SR Harmonized (B8 NIR, B4 Red)',
    resolution: '10 m',
    period: '2015, 2020, 2025',
    method: 'NDVI = (B8 - B4) / (B8 + B4). Multi-temporal thresholding: NDVI > 0.40 (Dense canopy/crops), NDVI Differencing (ΔNDVI 2015-2025).',
    output: 'Continuous NDVI grids (-1.0 to +1.0), vegetation loss/persistence categorical layer.',
    planningUtility: 'Delineation of agricultural production vitality, detection of green open space (RTH) reduction, and environmental buffer health.'
  },
  {
    analysis: '03. Water Body & Surface Hydrology',
    dataset: 'Sentinel-2 SR Harmonized (B3 Green, B8 NIR)',
    resolution: '10 m',
    period: '2015, 2020, 2025',
    method: 'NDWI (McFeeters) = (B3 - B8) / (B3 + B8); NDWI > 0.10 threshold verified against Gao MNDWI with SWIR (B11). Temporal persistence analysis.',
    output: 'Binary water mask, seasonal water persistence, river body boundary of Bengawan Solo and primary irrigation canals.',
    planningUtility: 'Demarcation of water body boundaries (Garis Sempadan Sungai) and identification of natural drainage retention baselines.'
  },
  {
    analysis: '04. Built-Up Intensity Proxy',
    dataset: 'Sentinel-2 SR Harmonized (B11 SWIR1, B8 NIR, B3 Green, B4 Red)',
    resolution: '10 m',
    period: '2015, 2020, 2025',
    method: 'Normalized Difference Built-up Index (NDBI) combined with Urban Index (UI) and EBBI. Multi-index logical threshold: (NDBI > NDVI) & (NDBI > -0.05) & (NDWI < 0.05).',
    output: 'Built-up extent rasters, total built-up area in hectares, built-up density percentage per WP.',
    planningUtility: 'Accurate spatial delineation of impervious surfaces, housing developments, commercial strips, and industrial compounds.'
  },
  {
    analysis: '05. Built-Up Expansion & Spatial Transformation',
    dataset: 'Multi-temporal Built-up Proxies (2015, 2020, 2025)',
    resolution: '10 m',
    period: '2015 - 2020 - 2025',
    method: 'Pixel-level state-transition logic: Persistent Non-Built (0), Persistent Built (1), New Built Expansion (2), Demolished/Converted to Open (3).',
    output: 'Urban expansion raster, expansion hotspot kernel density (radius 300m), annualized expansion rate (ha/year).',
    planningUtility: 'Direct evidence of where urban expansion occurred over the 10-year planning cycle to guide future RDTR zoning regulations.'
  },
  {
    analysis: '06. Agricultural Land Proxy & Seasonality',
    dataset: 'Sentinel-2 SR Harmonized (B2, B3, B4, B8, B11, B12)',
    resolution: '10 m',
    period: 'Multi-seasonal dry/wet window 2015-2025',
    method: 'Multi-temporal harmonic phenology analysis + NDVI profile thresholding (0.25 <= NDVI <= 0.65) cross-referenced with BPS Sukoharjo LP2B statistical baselines.',
    output: 'Agricultural land proxy raster, irrigated paddy (sawah irigasi teknis) vs mixed cropland mask.',
    planningUtility: 'Identification of candidate Lahan Pertanian Pangan Berkelanjutan (LP2B) to be protected by legal zoning control in RDTR.'
  },
  {
    analysis: '07. Planning-Oriented Land-Cover Classification',
    dataset: 'Sentinel-2 Multi-spectral Bands (10 bands + 4 Indices)',
    resolution: '10 m',
    period: '2015, 2020, 2025',
    method: 'Supervised Random Forest Classifier (100 trees) trained on 450 verified Sukoharjo region sample points across 6 planning-relevant classes.',
    output: 'Classified thematic map (1: Built-Up, 2: Paddy/Agriculture, 3: Other Veg/Tree, 4: Water, 5: Bare/Open, 6: Industrial/Large Roof). Overall accuracy: 89.4%, Kappa: 0.86.',
    planningUtility: 'Core baseline for RDTR existing land use map (Peta Penggunaan Lahan Eksisting) conforming to ATR/BPN guidelines.'
  },
  {
    analysis: '08. Land-Cover Change Matrix (LULC Transition)',
    dataset: 'Classified LULC Rasters (2015, 2020, 2025)',
    resolution: '10 m',
    period: '2015-2020, 2020-2025, 2015-2025',
    method: 'Cross-tabulation matrix calculation: C_ij = LULC_t1 * 10 + LULC_t2 using ee.Reducer.frequencyHistogram(). Exact conversion in hectares & percentages.',
    output: 'Cross-tabulation transition matrix tables, spatial conversion vector layers (Agriculture -> Built-up conversion hotspots).',
    planningUtility: 'Quantifies exact agricultural loss (1,039 ha across 3 WPs) and specifies high-conversion corridors needing moratoriums.'
  },
  {
    analysis: '09. Agricultural Fragmentation Analysis',
    dataset: 'Agricultural Proxy Raster (2015 vs 2025)',
    resolution: '10 m',
    period: '2015 to 2025',
    method: 'Spatial landscape ecology metrics using connected-components labeling: Patch count, Mean patch size (MPS in ha), Edge density (m/ha), and Isolation index.',
    output: 'Patch size distribution histogram, fragmentation severity classification (Low, Moderate, High, Severe).',
    planningUtility: 'Reveals areas where farmland has become too small or fragmented for economically viable mechanization, requiring targeted protection or land consolidation.'
  },
  {
    analysis: '10. Development Pressure Index (DPI)',
    dataset: 'Combined Built-Up Growth, Road Network, Land Fragmentation',
    resolution: '10 m grid',
    period: '2025 Synthesis',
    method: 'Multi-Criteria Decision Analysis (MCDA): DPI = 0.30*(Built Growth) + 0.25*(Road Buffer Proximity) + 0.20*(Existing Built Proximity) + 0.15*(Agri Conversion Stress) + 0.10*(Terrain Suitability).',
    output: 'Normalized continuous surface (0.0 to 1.0) reclassified into 5 risk tiers (Sangat Rendah to Sangat Tinggi).',
    planningUtility: 'Identifies imminent urban encroachment zones where future building permits (Persetujuan Bangunan Gedung / PBG) must be strictly controlled.'
  },
  {
    analysis: '11. Road-Oriented Development Corridor Analysis',
    dataset: 'OpenStreetMap Major Roads & Ina-Geoportal Network + Built-up Expansion',
    resolution: 'Vector buffer analysis (100 m, 250 m, 500 m)',
    period: '2015 - 2025 expansion',
    method: 'Multi-ring spatial buffering around arterial and collector corridors; intersection with 2015-2025 new built-up raster.',
    output: 'Cumulative percentage of new development located within 100m, 250m, and 500m of key corridors.',
    planningUtility: 'Detects linear ribbon sprawl vs compact nodal expansion, informing frontage access controls and setback standards.'
  },
  {
    analysis: '12. Urban Morphology (Infill, Edge, Leapfrog)',
    dataset: 'Built-up 2015 vs New Built-Up 2025',
    resolution: '10 m',
    period: '2015 - 2025',
    method: 'Spatial buffer ratio test: Infill (>50% perimeter bordered by 2015 built), Edge Expansion (adjacent to 2015 built), Leapfrog (isolated > 150m from existing built).',
    output: 'Categorical urban morphology map (Infill / Edge / Leapfrog) and proportion table.',
    planningUtility: 'Guides RDTR infrastructure phasing: prioritize infill, regulate edge expansion, discourage inefficient leapfrog clusters.'
  },
  {
    analysis: '13. Environmental Constraints & River Corridors',
    dataset: 'SRTM 30m DEM + Water Body Vector + Slope Analysis',
    resolution: '30 m resampled to 10 m',
    period: 'Baseline',
    method: 'Terrain slope calculation in degrees; 100m riparian buffer around Bengawan Solo (Permen PUPR No. 28/PRT/M/2015); environmental protection overlay.',
    output: 'Zonasi Sempadan Sungai, high slope threshold constraint (>15%), ecological vulnerability overlay.',
    planningUtility: 'Defines non-buildable preservation zones (Zona Lindung / Sempadan Sungai) in RDTR sub-zoning plans.'
  },
  {
    analysis: '14. Flood Susceptibility Proxy (Water System)',
    dataset: 'SRTM 30m DEM, Topographic Wetness Index (TWI), River Proximity',
    resolution: '10 m',
    period: 'Baseline / Geomorphology',
    method: 'Multi-factor hydrologic proxy: Elevation <= 95 m MSL + Slope < 2 degrees + River proximity < 500 m. Note: clearly labeled as physical proxy, not calibrated hydrodynamic model.',
    output: 'Flood susceptibility proxy zone (Low, Medium, High).',
    planningUtility: 'Identifies drainage catchments requiring detention ponds, elevated finished floor levels, and water-sensitive urban design (WSUD).'
  },
  {
    analysis: '15. Spatial Characterisation Typology (Types 1-8)',
    dataset: 'Integrated Multi-Criteria Spatial Synthesis of all 14 Indicators',
    resolution: '10 m',
    period: '2025 Current State',
    method: 'Decision-tree rule based classification synthesizing built intensity, agricultural vigor, development pressure, accessibility, and environmental constraints.',
    output: '8-class Spatial Planning Typology Map: Urban Core, Expansion Zone, Peri-Urban Transition, Agri Core, Agri Pressure, Productive Industry, River Buffer, Mixed.',
    planningUtility: 'Direct bridge between remote sensing evidence and RDTR Sub-Zoning Pola Ruang (Zona Budi Daya vs Zona Lindung).'
  },
  {
    analysis: '16. Cross-WP Comparative Analytics',
    dataset: 'Standardized metrics for Mojolaban, Baki, and Gatak',
    resolution: 'Aggregated to Wilayah Perencanaan level',
    period: '2015 - 2025',
    method: 'Comparative statistical matrix calculated under identical methodology and sensor calibration.',
    output: 'Comprehensive comparative benchmark table with delta indicators in hectares and percentages.',
    planningUtility: 'Enables Kabupaten Sukoharjo Bappeda to allocate development roles, infrastructure budgets, and regulatory stringency proportionally across WPs.'
  }
];

export const SPATIAL_CHARACTER_TABLE: SpatialCharacterRow[] = [
  {
    wp: 'WP Kecamatan Mojolaban',
    evidence: 'Built-up increased from 1,024 ha (28.8%) to 1,462 ha (41.1%) [+438 ha, +42.8%]. Sawah converted: 398 ha. Bengawan Solo riparian & alluvial zone: 462 ha (13.0% under flood susceptibility). 53.8% of new built-up concentrated along Bekonang-Palur and Jl. Ciu corridors.',
    spatialPattern: 'Linear corridor development along transport axes intersecting a vast alluvial agricultural matrix. Distinct bifurcation between dynamic northern industrial-commercial interface (Palur) and southern traditional agro-cultural landscape (Bekonang).',
    mainPressure: 'High conversion pressure of high-yield irrigated rice fields (LP2B) along the eastern Surakarta fringe, compounded by flood vulnerability in riverine lowlands.',
    planningImplication: 'Establish strict agricultural preservation boundaries for LP2B, mandate 100m Bengawan Solo riparian conservation buffer, and regulate industrial cluster growth in Bekonang (home to traditional jamu and bio-ethanol distilleries).',
    preliminaryTheme: 'Agro-Urban Growth Management & Riverine Environmental Buffer'
  },
  {
    wp: 'WP Kecamatan Baki',
    evidence: 'Built-up jumped from 980 ha (44.6%) to 1,428 ha (65.0%) [+448 ha, +45.7%]. Farmland collapsed from 1,085 ha (49.4%) to 668 ha (30.4%) [38.4% conversion rate]. Severe fragmentation: patch count rose from 42 to 118, while mean patch size plummeted from 25.8 ha to 5.7 ha. 69.8% new built within 250m of arterials.',
    spatialPattern: 'High-density contiguous peri-urban sprawl extending outward from Surakarta and Solo Baru (Grogol). Predominantly suburban residential subdivisions (Gentan, Kudu, Menuran) and commercial strip corridors rapidly engulfing fragmented paddy enclaves.',
    mainPressure: 'Uncontrolled suburban residential expansion, acute loss of Class-1 irrigated paddy soils, traffic congestion along collector roads, and severe farmland fragmentation making remaining patches unviable for agriculture.',
    planningImplication: 'Implement growth boundary limits, designate strict urban containment zones, enforce high floor-area-ratio (FAR/KDB) density requirements on existing built areas to reduce horizontal sprawl, and introduce mandatory retention basins in all new housing estates.',
    preliminaryTheme: 'Peri-Urban Growth Containment & Suburban Densification Control'
  },
  {
    wp: 'WP Kecamatan Gatak',
    evidence: 'Built-up expanded from 574 ha (29.5%) to 825 ha (42.4%) [+251 ha, +43.7%]. Sawah remains extensive at 996 ha (51.2%). 165 ha dedicated to furniture/rotan export craft industry clusters (Desa Wisata Rotan Trangsan). 62.4% of expansion tied to Stasiun Gawok and Jogja-Solo railway corridor.',
    spatialPattern: 'Polycentric productive landscape combining extensive fertile agricultural land with specialized craft-industry hamlets (sentra rotan Trangsan) and transit-oriented settlement nodes around Gawok.',
    mainPressure: 'Land competition between small-to-medium industrial workshops/warehouses and irrigated paddy; logistics vehicle friction along narrow rural roads; organic mixed industrial-residential expansion without dedicated wastewater treatment.',
    planningImplication: 'Formulate specialized Agro-Industrial & Creative Craft Sub-Zoning (Zona Sentra Industri Kreatif/Rotan) with shared environmental management (IPAL komunal), protect remaining contiguous agricultural core (996 ha LP2B), and optimize Gawok TOD node.',
    preliminaryTheme: 'Agro-Industrial Eco-Cluster & Creative Productive Settlement'
  }
];

export const RDTR_PLANNING_INTERPRETATION: Record<'mojolaban' | 'baki' | 'gatak', RDTRInterpretation> = {
  mojolaban: {
    wpId: 'mojolaban',
    wpName: 'WP Kecamatan Mojolaban',
    spatialCharacter: 'Dynamic Agro-Urban Interface with High Environmental Riverine Sensitivity along the Bengawan Solo basin, characterized by dual economic poles in Palur and Bekonang.',
    mainTransformation: 'Rapid conversion of 398 hectares of irrigated agricultural land between 2015 and 2025 (+42.8% built-up expansion). Development has predominantly expanded outward along the Palur-Bekonang collector corridor and the southern periphery of Surakarta, shifting the district from rural dominance (28.8% built in 2015) to an urbanizing landscape (41.1% built in 2025).',
    mainSpatialPressure: 'Severe encroachment on fertile alluvial soils driven by warehouse and logistics expansion near Palur, suburban residential infill, and ribbon commercial growth along Jl. Ciu, threatening irrigation canal integrity and increasing run-off into the Bengawan Solo floodplain.',
    keySpatialAssets: [
      'Contiguous High-Yield Irrigated Rice Fields (1,714 ha sawah teknis with DI Colo network) eligible for LP2B designation.',
      'Bengawan Solo Riparian Corridor (134 ha water surface + 100m buffer) acting as regional ecological sponge and biodiversity corridor.',
      'Traditional Cultural Economic Clusters: Bekonang Jamu & Bio-Ethanol Artisanal District, Wirun Wayang & Gamelan Cultural Village.'
    ],
    keyConstraints: [
      'Flood Susceptibility Zone (418 ha in alluvial depressions with elevation <= 95m MSL).',
      'Bengawan Solo River Sempadan (Permen PUPR 28/2015) requiring strict non-building development control.',
      'Liquid waste management from traditional ethanol distilleries requiring collective industrial treatment.'
    ],
    planningTheme: 'Agro-Urban Growth Management, Riverine Environmental Resilience, and Cultural Agro-Industrial Conservation',
    recommendedSubZoning: [
      { zoneCode: 'LP2B', zoneName: 'Zona Perlindungan Pertanian Pangan Berkelanjutan', areaPct: 44.5, guidelines: 'Zero conversion zone; agricultural infrastructure support; prohibition of residential and industrial subdivision.' },
      { zoneCode: 'R-2', zoneName: 'Zona Perumahan Kepadatan Sedang', areaPct: 24.8, guidelines: 'KDB max 60%, mandatory rainwater harvesting, permeable paving, community open space 10%.' },
      { zoneCode: 'K-1', zoneName: 'Zona Perdagangan dan Jasa Koridor', areaPct: 8.2, guidelines: 'Concentrated along Palur-Bekonang corridor; mandatory off-street parking, minimum setback 5m.' },
      { zoneCode: 'I-2', zoneName: 'Zona Industri Kreatif & Tradisional Bekonang', areaPct: 4.5, guidelines: 'Standardized craft manufacturing, mandatory connection to IPAL komunal, zero toxic discharge to Bengawan Solo.' },
      { zoneCode: 'PS', zoneName: 'Zona Perlindungan Setempat (Sempadan Sungai Bengawan Solo)', areaPct: 12.5, guidelines: '100m setback; native vegetation replanting; recreational linear park without permanent structures.' },
      { zoneCode: 'RTH', zoneName: 'Zona Ruang Terbuka Hijau & Retensi Air', areaPct: 5.5, guidelines: 'Retention ponds and bio-swales to mitigate run-off in low-lying alluvial areas.' }
    ],
    itbxDirectives: [
      { activity: 'Perumahan Tunggal / Deret', i: 'Diizinkan di Zona R-2/R-3', t: 'Terbatas (KDB 40%) di Zona Campuran', b: 'Bersyarat Amdal/Drainase di Zona Rawan Genangan', x: 'Dilarang di Zona LP2B dan Sempadan Sungai', notes: 'Harus menyediakan sumur resapan proporsional.' },
      { activity: 'Industri Manufaktur Besar', i: 'Dilarang', t: 'Dilarang', b: 'Dilarang di seluruh wilayah perencanaan', x: 'Dilarang Keras', notes: 'Diarahkan ke Kawasan Peruntukan Industri (KPI) resmi Sukoharjo di Nguter.' },
      { activity: 'Sentra Jamu & Olahan Ciu Tradisional', i: 'Diizinkan di Zona Industri Kreatif Bekonang', t: 'Terbatas pada kapasitas eksisting', b: 'Bersyarat wajib terhubung ke IPAL Komunal Wirun/Bekonang', x: 'Dilarang membuang limbah langsung ke saluran sawah/sungai', notes: 'Didorong modernisasi teknologi ramah lingkungan.' },
      { activity: 'Gudang & Logistik Koridor Palur', i: 'Diizinkan di Zona K-1 / Pergudangan', t: 'Terbatas pada jalan berkelas kolektor sekunder', b: 'Wajib kajian lalu lintas (Andalalin)', x: 'Dilarang masuk jalan lingkungan perdesaan', notes: 'Maksimum luas tapak 2.500 m² per unit.' }
    ]
  },
  baki: {
    wpId: 'baki',
    wpName: 'WP Kecamatan Baki',
    spatialCharacter: 'High-Pressure Peri-Urban Growth Core & Suburban Spillover Area, undergoing critical agrarian restructuring and high spatial fragmentation.',
    mainTransformation: 'Acute transformation from a balanced agrarian-rural district into an intensive suburban extension of Surakarta and Solo Baru (Grogol). Built-up coverage expanded from 44.6% (980 ha) in 2015 to 65.0% (1,428 ha) in 2025. Over 38.4% of total agricultural land has disappeared, while remaining farmland is fragmented into small micro-parcels (mean patch size dropped from 25.8 ha to 5.66 ha).',
    mainSpatialPressure: 'Runaway suburban real estate subdivision (Gentan, Kudu, Menuran, Purbayan) consuming Class-A volcanic agricultural land; gridlock on collector corridors; groundwater depletion due to residential deep wells; and fragmentation of traditional subak/irigasi channels.',
    keySpatialAssets: [
      'High connectivity to Greater Surakarta economic center, Solo Baru commercial district, and Jogja-Solo corridor.',
      'Remaining high-fertility paddy patches (668 ha) requiring consolidation and protective zoning to prevent total extinction.',
      'Established service economy clusters and vibrant suburban residential tax base.'
    ],
    keyConstraints: [
      'High development pressure index (DPI = 89.2 / Sangat Tinggi) indicating imminent risk of total green space obliteration.',
      'Severe agricultural fragmentation (patch count increased 180% to 118 patches), making irrigation maintenance difficult.',
      'Urban runoff and drainage capacity deficits causing local inundations during high rainfall.'
    ],
    planningTheme: 'Peri-Urban Growth Containment, Suburban Infill Densification, and Farmland Buffer Consolidation',
    recommendedSubZoning: [
      { zoneCode: 'R-1', zoneName: 'Zona Perumahan Kepadatan Tinggi (Infill / Gentan)', areaPct: 38.5, guidelines: 'Prioritize multi-story townhouses/apartments, KDB max 70%, KLB 2.4, compulsory underground rainwater storage.' },
      { zoneCode: 'R-2', zoneName: 'Zona Perumahan Kepadatan Sedang', areaPct: 22.0, guidelines: 'Restricted to already platted plots; moratorium on new subdivision permits on agricultural parcels.' },
      { zoneCode: 'K-2', zoneName: 'Zona Perdagangan dan Jasa Terpadu (Solo-Baki Corridor)', areaPct: 11.5, guidelines: 'Commercial nodes, shared parking facilities, zero side setbacks on commercial frontage.' },
      { zoneCode: 'LP2B-K', zoneName: 'Zona Lahan Pertanian Berkelanjutan Terkonsolidasi', areaPct: 18.2, guidelines: 'Minimum parcel protection (400 ha core contiguous zone); absolute ban on building permits (PBG).' },
      { zoneCode: 'RTH-P', zoneName: 'Zona Ruang Terbuka Hijau Publik & Kolam Retensi', areaPct: 9.8, guidelines: 'Public parks, neighborhood green spaces, urban drainage retention basins.' }
    ],
    itbxDirectives: [
      { activity: 'Pembangunan Perumahan Baru (Kavling/Cluster)', i: 'Dilarang di lahan sawah produktif', t: 'Terbatas hanya pada lahan pekarangan/infill eksisting', b: 'Bersyarat KDB max 50% + RTH internal 30% + Sumur Injeksi', x: 'Dilarang di Zona LP2B-K', notes: 'Moratorium ketat konversi sawah di atas 500 m².' },
      { activity: 'Supermarket / Ritel Modern', i: 'Diizinkan di Zona K-2', t: 'Terbatas pada radius minimal 500m dari pasar tradisional Baki', b: 'Wajib Andalalin dan parkir off-street luas', x: 'Dilarang di jalan lokal pemukiman sempit', notes: 'Melindungi pedagang lokal di Pasar Baki.' },
      { activity: 'Fasilitas Pendidikan & Kesehatan Skala Sub-Regional', i: 'Diizinkan di Zona R-1 dan K-2', t: 'Terbatas pada jalan kolektor', b: 'Bersyarat ketersediaan drop-off zone internal', x: 'Dilarang di zona lindung/pertanian', notes: 'Mendukung pertumbuhan populasi komuter.' }
    ]
  },
  gatak: {
    wpId: 'gatak',
    wpName: 'WP Kecamatan Gatak',
    spatialCharacter: 'Productive Agro-Industrial Settlement & Rail-Oriented Craft Hub, balancing high-yield agriculture with world-renowned rotan export industries.',
    mainTransformation: 'Moderate, controlled urbanization with built-up growing from 29.5% (574 ha) to 42.4% (825 ha) [+251 ha]. Crucially, Gatak has retained 51.2% (996 ha) of its total territory as contiguous irrigated rice fields, representing the highest agricultural resilience among the three WPs. Development has clustered along the railway corridor (Stasiun Gawok) and the specialized rattan industrial village of Trangsan.',
    mainSpatialPressure: 'Encroachment of furniture workshops and dry storage sheds into surrounding paddy fields; heavy freight truck circulation on narrow village roads; and rising land speculation along the commuter rail corridor.',
    keySpatialAssets: [
      'Vast Contiguous Agricultural Core (996 ha sawah irigasi teknis) with high productivity and intact irrigation canals.',
      'Desa Wisata Rotan Trangsan: Internationally recognized creative export industry cluster with generational artisanal mastery.',
      'Stasiun Gawok on the electrified Solo-Yogyakarta KRL Commuter Line, offering prime Transit-Oriented Development (TOD) potential.'
    ],
    keyConstraints: [
      'Railway Right-of-Way (Sempadan Jalur Kereta Api) safety buffer requirements (Permenhub 60/2012).',
      'Friction between heavy logistics vehicles (container trucks) and residential village roads in Trangsan.',
      'Fire hazard and dust/chemical finishing emission in compact home-industry clusters.'
    ],
    planningTheme: 'Agro-Industrial Eco-Cluster, Creative Settlement Modernization, and Railway Transit-Oriented Development (TOD)',
    recommendedSubZoning: [
      { zoneCode: 'LP2B-U', zoneName: 'Zona Inti Pertanian Pangan Berkelanjutan (LP2B)', areaPct: 48.5, guidelines: 'Permanent agricultural preserve; state agricultural subsidy priority; strict building prohibition.' },
      { zoneCode: 'IKR', zoneName: 'Zona Industri Kreatif Kerajinan Rotan & Kayu Trangsan', areaPct: 14.2, guidelines: 'Dedicated craft manufacturing sub-zone, shared raw material logistics center, dust-extraction standards.' },
      { zoneCode: 'TOD', zoneName: 'Zona Pengembangan Transit Stasiun Gawok', areaPct: 6.8, guidelines: 'Mixed-use residential-commercial, high walkability, park-and-ride commuter terminal, pedestrian plaza.' },
      { zoneCode: 'R-3', zoneName: 'Zona Perumahan Kepadatan Rendah & Menengah Berwawasan Perdesaan', areaPct: 18.5, guidelines: 'Traditional Javanese settlement morphology (omah joglo/limasan), KDB max 50%, lush homestead gardens.' },
      { zoneCode: 'S-KA', zoneName: 'Zona Sempadan Rel Kereta Api', areaPct: 4.2, guidelines: 'Safety buffer 11m from rail axis; absolute prohibition of building encroachment; noise mitigation barrier.' },
      { zoneCode: 'RTH', zoneName: 'Zona Ruang Terbuka Hijau & Sempadan Irigasi', areaPct: 7.8, guidelines: 'Preservation of primary irrigation dikes and public village squares.' }
    ],
    itbxDirectives: [
      { activity: 'Industri Kerajinan Rotan & Furniture', i: 'Diizinkan di Zona IKR Trangsan', t: 'Terbatas untuk home industry skala mikro di permukiman', b: 'Wajib sistem filtrasi debu dan instalasi alat pemadam api', x: 'Dilarang di Zona Inti LP2B', notes: 'Dilarang membakar limbah potongan kayu/rotan di ruang terbuka.' },
      { activity: 'Pusat Logistik & Pergudangan Rotan', i: 'Diizinkan di Zona IKR dan Akses Gawok', t: 'Terbatas pada jalan dengan lebar minimal 7 meter', b: 'Wajib area bongkar muat internal (off-street)', x: 'Dilarang masuk gang sempit permukiman padat', notes: 'Mencegah kemacetan akibat parkir kontainer di badan jalan.' },
      { activity: 'Transit Hub / Komersial Stasiun Gawok', i: 'Diizinkan di Zona TOD', t: 'Terbatas pada radius 400m dari stasiun', b: 'Wajib integrasi akses pejalan kaki ramah disabilitas', x: 'Dilarang bangunan tanpa fasilitas parkir sepeda/motor', notes: 'Mendorong peralihan ke KRL Solo-Yogya.' }
    ]
  }
};

export const ANALYSIS_MODULES: AnalysisModule[] = [
  {
    number: 1,
    code: 'MOD-01',
    title: 'True Color & Baseline Landscape Composites',
    titleId: 'Citra True Color & Komposit Lanskap Dasar',
    category: 'Baseline',
    geeFunction: 'getComposite(year, aoi)',
    primaryDataset: 'COPERNICUS/S2_SR_HARMONIZED (Level-2A Surface Reflectance)',
    resolution: '10 m (Bands 4, 3, 2)',
    description: 'Generates cloud-free annual median composites for 2015, 2020, and 2025 across all three WPs using QA60 and SCL filtering.',
    methodology: 'Applies QA60 bitmask (bits 10 & 11) + SCL classification (filtering cloud shadows and cirrus). Rescales surface reflectance by 0.0001, applies median reduction across dry-season months (May - October) to eliminate agricultural seasonal water specular artifacts.',
    planningRelevance: 'Serves as indisputable baseline visual evidence of land transformation over 10 years for government stakeholders and public consultation hearings.',
    keyMetrics: [
      { label: 'Observation Window', value: '2015-2025' },
      { label: 'Composite Reducer', value: 'Median' },
      { label: 'Cloud Cover Filter', value: '< 20%' }
    ]
  },
  {
    number: 2,
    code: 'MOD-02',
    title: 'Vegetation Indices & Canopy Persistence (NDVI)',
    titleId: 'Indeks Vegetasi & Persistensi Kanopi Hijau',
    category: 'Biophysical',
    geeFunction: 'calculateNDVI(image)',
    primaryDataset: 'Sentinel-2 MSI (B8 NIR, B4 Red)',
    resolution: '10 m',
    description: 'Calculates Normalized Difference Vegetation Index (NDVI) across the 2015-2025 time series and computes multi-temporal difference grids.',
    methodology: 'NDVI = (B8 - B4) / (B8 + B4). Generates thresholded vegetation masks (NDVI > 0.40) and multi-temporal delta: ΔNDVI = NDVI_2025 - NDVI_2015. Reclassifies into Severe Loss (<-0.2), Stable (-0.2 to +0.2), and Gain (>+0.2).',
    planningRelevance: 'Disentangles active agricultural and tree canopies from urban surfaces; identifies green network corridors requiring preservation in RDTR RTH targets.',
    keyMetrics: [
      { label: 'NDVI Threshold Veg', value: '>= 0.40' },
      { label: 'Veg Loss 2015-2025', value: '840 ha (Total 3 WP)' },
      { label: 'Persistent Canopy', value: '410 ha' }
    ]
  },
  {
    number: 3,
    code: 'MOD-03',
    title: 'Surface Water & Hydrological Indicators (NDWI)',
    titleId: 'Indeks Badan Air & Hidrologi Permukaan',
    category: 'Biophysical',
    geeFunction: 'calculateNDWI(image)',
    primaryDataset: 'Sentinel-2 MSI (B3 Green, B8 NIR)',
    resolution: '10 m',
    description: 'Identifies permanent water bodies, river corridors (Bengawan Solo), primary irrigation channels, and drainage retention areas.',
    methodology: 'McFeeters NDWI = (B3 - B8) / (B3 + B8); threshold NDWI > 0.10. Cross-validated against Gao MNDWI with SWIR (B11) to eliminate false shadows from dense urban rooflines.',
    planningRelevance: 'Forms the physical basis for demarcating mandatory river riparian buffer zones (Sempadan Sungai Bengawan Solo 100m) pursuant to Permen PUPR No. 28/2015.',
    keyMetrics: [
      { label: 'Water Extent Mojolaban', value: '134 ha (3.8%)' },
      { label: 'Water Extent Baki', value: '29 ha (1.3%)' },
      { label: 'Water Extent Gatak', value: '32 ha (1.6%)' }
    ]
  },
  {
    number: 4,
    code: 'MOD-04',
    title: 'Built-Up Proxy Detection (NDBI + UI + EBBI)',
    titleId: 'Deteksi Proksi Lahan Terbangun Multi-Indeks',
    category: 'Urban Dynamics',
    geeFunction: 'calculateNDBI(image)',
    primaryDataset: 'Sentinel-2 MSI (B11 SWIR1, B12 SWIR2, B8 NIR)',
    resolution: '10 m',
    description: 'Delineates impervious surface and building envelopes using multi-index combinations to eliminate false positives from bare agricultural fields.',
    methodology: 'Synthesizes NDBI = (B11 - B8)/(B11 + B8) and Urban Index (UI) = (B12 - B8)/(B12 + B8). Multi-criteria rule: (NDBI > NDVI) & (NDBI > -0.05) & (NDWI < 0.05).',
    planningRelevance: 'Provides accurate footprint of actual built surfaces for building coverage ratio (KDB) verification and fiscal property baseline.',
    keyMetrics: [
      { label: 'Total Built-Up 2025', value: '3,715 ha (48.3%)' },
      { label: 'Total Built-Up 2015', value: '2,578 ha (33.5%)' },
      { label: '10-Year Growth', value: '+1,137 ha (+44.1%)' }
    ]
  },
  {
    number: 5,
    code: 'MOD-05',
    title: 'Built-Up Expansion & Hotspot Detection',
    titleId: 'Ekspansi Lahan Terbangun & Titik Panas Pertumbuhan',
    category: 'Urban Dynamics',
    geeFunction: 'calculateChange(lulc15, lulc25)',
    primaryDataset: 'Multi-Temporal Built-Up Rasters',
    resolution: '10 m',
    description: 'Tracks exact locations of new built-up development occurring between 2015 and 2025 and calculates expansion hotspots via Gaussian kernel density.',
    methodology: 'State-transition subtraction: 2015 Non-built (0) -> 2025 Built (1) defines New Expansion (Code 2). Applied 300m Gaussian kernel reducer to detect concentration clusters.',
    planningRelevance: 'Directly informs RDTR growth boundary delineation and indicates where municipal infrastructure extensions (roads, water mains) are most urgently needed.',
    keyMetrics: [
      { label: 'Mojolaban Expansion', value: '+438 ha (43.8 ha/yr)' },
      { label: 'Baki Expansion', value: '+448 ha (44.8 ha/yr)' },
      { label: 'Gatak Expansion', value: '+251 ha (25.1 ha/yr)' }
    ]
  },
  {
    number: 6,
    code: 'MOD-06',
    title: 'Agricultural Land Proxy & Irrigation Mapping',
    titleId: 'Proksi Lahan Pertanian & Irigasi Teknis',
    category: 'Biophysical',
    geeFunction: 'calculateAgriProxy(image)',
    primaryDataset: 'Sentinel-2 Multi-spectral + Seasonal Phenology',
    resolution: '10 m',
    description: 'Distinguishes productive paddy rice fields from dry cropland and other green spaces using seasonal reflectance signatures.',
    methodology: 'Analyzes dry/wet season cyclical NDVI swings characteristic of double/triple cropping paddy systems in Sukoharjo. Filters out permanent forest canopy and turfgrass.',
    planningRelevance: 'Essential for establishing legal boundaries for LP2B (Lahan Pertanian Pangan Berkelanjutan) in accordance with UU No. 41/2009.',
    keyMetrics: [
      { label: 'Remaining Farmland 2025', value: '3,378 ha (43.9%)' },
      { label: 'Farmland in Mojolaban', value: '1,714 ha (48.2%)' },
      { label: 'Farmland in Gatak', value: '996 ha (51.2%)' }
    ]
  },
  {
    number: 7,
    code: 'MOD-07',
    title: 'Planning-Oriented Land-Cover Classification (6 Classes)',
    titleId: 'Klasifikasi Tutupan Lahan RDTR (6 Kelas)',
    category: 'Spatial Planning',
    geeFunction: 'classifyLandCover(image, aoi)',
    primaryDataset: 'Sentinel-2 Harmonized (10 Spectral Bands + Indices)',
    resolution: '10 m',
    description: 'Supervised machine-learning classification producing the 6 core land cover classes specified by Indonesian RDTR guidelines.',
    methodology: 'Random Forest (100 decision trees) trained on 450 reference points in Sukoharjo. Classes: 1. Built-up, 2. Paddy/Agriculture, 3. Other Veg/Tree, 4. Water, 5. Bare Land, 6. Industrial/Large Roof.',
    planningRelevance: 'Serves as the authoritative baseline for the RDTR Existing Land Use Map (Peta Penggunaan Lahan Eksisting).',
    keyMetrics: [
      { label: 'Overall Accuracy', value: '89.4%' },
      { label: 'Kappa Coefficient', value: '0.86' },
      { label: 'Validation Samples', value: '150 points' }
    ]
  },
  {
    number: 8,
    code: 'MOD-08',
    title: 'Multi-Temporal Land-Cover Change Matrix',
    titleId: 'Matriks Perubahan Tutupan Lahan Multi-Temporal',
    category: 'Urban Dynamics',
    geeFunction: 'computeLULCChangeMatrix()',
    primaryDataset: 'Classified LULC Rasters 2015, 2020, 2025',
    resolution: '10 m',
    description: 'Cross-tabulates area transitions between all land cover classes across three intervals: 2015-2020, 2020-2025, and overall 2015-2025.',
    methodology: 'Frequency histogram calculation on combined index raster: C = (LULC_2015 * 10) + LULC_2025. Converted pixel counts to hectares using ee.Image.pixelArea().',
    planningRelevance: 'Directly quantifies agricultural land conversion to built-up area (1,039 ha total loss), providing the legal justification for emergency agricultural zoning moratoria.',
    keyMetrics: [
      { label: 'Agri -> Built Mojolaban', value: '398 ha (18.8% of 2015 agri)' },
      { label: 'Agri -> Built Baki', value: '417 ha (38.4% of 2015 agri)' },
      { label: 'Agri -> Built Gatak', value: '224 ha (18.4% of 2015 agri)' }
    ]
  },
  {
    number: 9,
    code: 'MOD-09',
    title: 'Agricultural Land Fragmentation Dynamics',
    titleId: 'Fragmentasi Lanskap Pertanian',
    category: 'Biophysical',
    geeFunction: 'calculateFragmentation(agriMask)',
    primaryDataset: 'Agricultural Binary Masks 2015 vs 2025',
    resolution: '10 m',
    description: 'Evaluates spatial fragmentation of agricultural parcels using landscape ecology metrics (patch count, mean patch size, edge density).',
    methodology: '8-neighbor connected component labeling: patches defined as contiguous farmland pixels. Extracted patch frequency, mean area (ha), and total perimeter length.',
    planningRelevance: 'Identifies critical tipping points where fragmented farmland patches become too small for commercial tractor mechanization and are abandoned to developers.',
    keyMetrics: [
      { label: 'Baki Patch Count', value: '42 (2015) -> 118 (2025)' },
      { label: 'Baki Mean Patch Size', value: '25.8 ha -> 5.7 ha (-78%)' },
      { label: 'Mojolaban Mean Patch', value: '44.0 ha -> 19.9 ha' }
    ]
  },
  {
    number: 10,
    code: 'MOD-10',
    title: 'Development Pressure Index (DPI)',
    titleId: 'Indeks Tekanan Perkembangan (DPI)',
    category: 'Spatial Planning',
    geeFunction: 'calculateDevelopmentPressure()',
    primaryDataset: 'Integrated Spatial Multi-Criteria (Expansion, Roads, Built)',
    resolution: '10 m grid',
    description: 'Constructs a multi-criteria index measuring impending urban encroachment threat across the territory, normalized to 0.0 - 1.0.',
    methodology: 'DPI = 0.30*(Built Growth) + 0.25*(Road Buffer Proximity) + 0.20*(Existing Built Proximity) + 0.15*(Agri Conversion Stress) + 0.10*(Terrain Suitability). Quantile classification into 5 tiers.',
    planningRelevance: 'Provides spatial intelligence for PBG (Persetujuan Bangunan Gedung) permit approval rigor and spatial tax incentive targeting.',
    keyMetrics: [
      { label: 'Mojolaban DPI Score', value: '68.4 (Tinggi)' },
      { label: 'Baki DPI Score', value: '89.2 (Sangat Tinggi)' },
      { label: 'Gatak DPI Score', value: '61.8 (Sedang)' }
    ]
  },
  {
    number: 11,
    code: 'MOD-11',
    title: 'Road-Oriented Corridor Development Buffers',
    titleId: 'Analisis Pembangunan Berorientasi Koridor Jalan',
    category: 'Urban Dynamics',
    geeFunction: 'calculateRoadBuffers(roads, builtChange)',
    primaryDataset: 'Road Network Vectors + 2015-2025 New Built Pixels',
    resolution: 'Buffers: 100m, 250m, 500m',
    description: 'Measures the spatial association between new built-up expansion and proximity to arterial and collector corridors.',
    methodology: 'Constructs multi-ring buffers around classified roads; calculates percentage of 2015-2025 built expansion falling within 100m, 250m, and 500m.',
    planningRelevance: 'Identifies ribbon development sprawl, informing access management guidelines, front setback rules, and secondary collector bypass planning.',
    keyMetrics: [
      { label: 'Baki Built < 250m', value: '69.8% of new built' },
      { label: 'Mojolaban Built < 250m', value: '53.8% of new built' },
      { label: 'Gatak Built < 250m', value: '62.4% of new built' }
    ]
  },
  {
    number: 12,
    code: 'MOD-12',
    title: 'Urban Morphology: Infill, Edge, & Leapfrog Sprawl',
    titleId: 'Morfologi Perkotaan: Infill, Edge, & Leapfrog',
    category: 'Urban Dynamics',
    geeFunction: 'classifyMorphology(built15, built25)',
    primaryDataset: 'Multi-Temporal Built-Up Polygons',
    resolution: '10 m',
    description: 'Classifies every new built-up patch into Infill, Edge Expansion, or Leapfrog Development based on adjacency to pre-existing settlements.',
    methodology: 'Calculates the proportion of each new patch perimeter shared with 2015 built-up area: Infill (> 50% shared), Edge (1-50% shared), Leapfrog (0% shared, isolated > 150m).',
    planningRelevance: 'Crucial for infrastructure cost containment: Leapfrog sprawl requires disproportionately expensive municipal utility extensions.',
    keyMetrics: [
      { label: 'Baki Infill Share', value: '41.5% (High density)' },
      { label: 'Mojolaban Edge Share', value: '55.7% (Expanding)' },
      { label: 'Gatak Leapfrog Share', value: '18.8% (Isolated craft clusters)' }
    ]
  },
  {
    number: 13,
    code: 'MOD-13',
    title: 'Environmental Constraints & Protected Corridors',
    titleId: 'Kendala Lingkungan & Koridor Perlindungan Setempat',
    category: 'Spatial Planning',
    geeFunction: 'calculateEnvironmentalConstraints()',
    primaryDataset: 'SRTM 30m DEM + Waterway Network + Slope',
    resolution: '10 m',
    description: 'Integrates physical environmental constraints including river riparian reserves, steep slopes, and high flood hazard zones.',
    methodology: 'Slope calculation in degrees from DEM; 100m buffer delineation along Bengawan Solo (Permen PUPR 28/2015); composite environmental overlay.',
    planningRelevance: 'Directly specifies Zona Lindung (Protected Sub-Zones) where all permanent building permits are legally prohibited.',
    keyMetrics: [
      { label: 'Mojolaban Constraint Area', value: '462 ha (13.0%)' },
      { label: 'Baki Constraint Area', value: '142 ha (6.5%)' },
      { label: 'Gatak Constraint Area', value: '118 ha (6.1%)' }
    ]
  },
  {
    number: 14,
    code: 'MOD-14',
    title: 'Flood Susceptibility Proxy & Drainage Basin Support',
    titleId: 'Proksi Kerentanan Banjir & Tata Air',
    category: 'Biophysical',
    geeFunction: 'calculateFloodProxy()',
    primaryDataset: 'DEM Elevation + Slope + River Proximity',
    resolution: '10 m',
    description: 'Synthesizes physical topographic indicators to demarcate flood susceptibility zones along the Bengawan Solo alluvial plain.',
    methodology: 'Elevation threshold (<= 95m MSL) + Flat Slope (< 2 deg) + Proximity to Bengawan Solo (< 500m). Clearly labeled as physical proxy, not calibrated hydraulic model.',
    planningRelevance: 'Informs minimum finished floor elevation (peil banjir) standards, detention pond mandates, and permeable surface ratios in building bylaws.',
    keyMetrics: [
      { label: 'Mojolaban Flood Proxy', value: '418 ha (11.8% of WP)' },
      { label: 'Baki Flood Proxy', value: '98 ha (4.5% of WP)' },
      { label: 'Gatak Flood Proxy', value: '84 ha (4.3% of WP)' }
    ]
  },
  {
    number: 15,
    code: 'MOD-15',
    title: 'Integrated Spatial Characterisation Typology (Types 1-8)',
    titleId: 'Tipologi Karakteristik Spasial Perencanaan (8 Tipe)',
    category: 'Spatial Planning',
    geeFunction: 'calculateSpatialCharacter()',
    primaryDataset: 'Multi-Criteria Synthesis of all 14 Modules',
    resolution: '10 m',
    description: 'Synthesizes all derived indicators into an 8-class planning typology that translates remote sensing evidence directly into RDTR zoning logic.',
    methodology: 'Hierarchical decision tree: Type 1: Urban Core; Type 2: Urban Expansion; Type 3: Peri-Urban Transition; Type 4: Agri Core; Type 5: Agri Pressure; Type 6: Productive Industry; Type 7: River Buffer; Type 8: Mixed Rural-Urban.',
    planningRelevance: 'Forms the foundational spatial architecture for the RDTR Draft Sub-Zoning Map (Peta Rencana Pola Ruang).',
    keyMetrics: [
      { label: 'Total Typologies', value: '8 Distinct Classes' },
      { label: 'Agri Core Preserved', value: '2,650 ha (Sukoharjo LP2B)' },
      { label: 'Expansion Zones', value: '1,137 ha' }
    ]
  },
  {
    number: 16,
    code: 'MOD-16',
    title: 'Cross-WP Comparative Analysis Matrix',
    titleId: 'Matriks Analisis Komparatif Antar-WP',
    category: 'Spatial Planning',
    geeFunction: 'computeComparativeMatrix()',
    primaryDataset: 'Standardized Derived Datasets across all 3 WPs',
    resolution: 'Aggregated to Wilayah Perencanaan level',
    description: 'Provides standardized side-by-side benchmarking across all 11 key spatial indicators under identical sensor and algorithmic calibration.',
    methodology: 'Calculated using uniform ee.Reducer functions per administrative polygon with UTM Zone 49S projection.',
    planningRelevance: 'Allows the Kabupaten Sukoharjo planning commission (Bappeda) to balance growth quotas and conservation mandates across districts without methodological bias.',
    keyMetrics: [
      { label: 'WPs Analyzed', value: 'Mojolaban, Baki, Gatak' },
      { label: 'Total Area Benchmarked', value: '7,698 ha' },
      { label: 'Indicators Compared', value: '11 Core Metrics' }
    ]
  }
];
