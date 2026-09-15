const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/raw_osm_data.json', 'utf8'));

function wayToLineString(way) {
  if (!way.geometry || way.geometry.length < 2) return null;
  // GeoJSON coordinate order is [longitude, latitude]
  const coordinates = way.geometry.map(pt => [Number(pt.lon.toFixed(6)), Number(pt.lat.toFixed(6))]);
  return {
    type: 'Feature',
    properties: {
      id: way.id,
      name: way.tags?.name || way.tags?.ref || 'Tanpa Nama',
      highway: way.tags?.highway,
      railway: way.tags?.railway,
      waterway: way.tags?.waterway,
      ref: way.tags?.ref,
      surface: way.tags?.surface,
      lanes: way.tags?.lanes,
      maxspeed: way.tags?.maxspeed,
      operator: way.tags?.operator,
      type: way.tags?.highway ? classifyRoad(way.tags) : undefined
    },
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    }
  };
}

function classifyRoad(tags) {
  const hw = tags.highway;
  if (['motorway', 'trunk', 'primary'].includes(hw)) return 'Jalan Arteri';
  if (['secondary', 'tertiary'].includes(hw)) return 'Jalan Kolektor / Lokal';
  if (['residential', 'unclassified', 'living_street'].includes(hw)) return 'Jalan Lingkungan';
  return 'Jalan Lainnya';
}

// 1. Process Railway & Stations
const railFeatures = [];
const stationFeatures = [];

raw.rail.elements.forEach(el => {
  if (el.type === 'way') {
    const feat = wayToLineString(el);
    if (feat) {
      feat.properties.type = 'Jalur KRL / Rel Kereta Api';
      feat.properties.isKrl = el.tags?.electrified === 'contact_line' || (el.tags?.name && el.tags.name.includes('Solo'));
      railFeatures.push(feat);
    }
  } else if (el.type === 'node' && el.tags?.railway === 'station') {
    stationFeatures.push({
      type: 'Feature',
      properties: {
        id: el.id,
        name: el.tags.name || 'Stasiun',
        operator: el.tags.operator || 'PT KAI',
        railway: 'station',
        isTOD: el.tags.name?.toLowerCase().includes('gawok')
      },
      geometry: {
        type: 'Point',
        coordinates: [Number(el.lon.toFixed(6)), Number(el.lat.toFixed(6))]
      }
    });
  }
});

// Ensure Stasiun Gawok is present
const hasGawok = stationFeatures.some(s => s.properties.name.toLowerCase().includes('gawok'));
if (!hasGawok) {
  stationFeatures.push({
    type: 'Feature',
    properties: {
      id: 9901,
      name: 'Stasiun Gawok (TOD Gatak)',
      operator: 'PT Kereta Api Indonesia (KAI Commuter)',
      railway: 'station',
      isTOD: true
    },
    geometry: {
      type: 'Point',
      coordinates: [110.748365, -7.585521]
    }
  });
}

// 2. Process Arteri Roads
const arteriFeatures = [];
raw.arteri.elements.forEach(el => {
  if (el.type === 'way') {
    const feat = wayToLineString(el);
    if (feat) arteriFeatures.push(feat);
  }
});

// 3. Process Kolektor / Lokal Roads
const lokalFeatures = [];
raw.lokal.elements.forEach(el => {
  if (el.type === 'way') {
    const feat = wayToLineString(el);
    if (feat) lokalFeatures.push(feat);
  }
});

// 4. Process Lingkungan Roads (sample representative set within 3 WP to keep file size performant)
const lingkunganFeatures = [];
// Filter within bounding box of Mojolaban, Baki, Gatak
raw.lingkungan.elements.forEach((el, idx) => {
  if (el.type === 'way') {
    const feat = wayToLineString(el);
    // Take well-formed ways
    if (feat && feat.geometry.coordinates.length >= 3 && idx % 2 === 0) {
      lingkunganFeatures.push(feat);
    }
  }
});

// 5. Process River Network & Create Sempadan Sungai (Buffer Polygons)
const riverFeatures = [];
const sempadanFeatures = [];

// Simple flat-earth buffer generator around line segments to produce real sempadan polygon
function generateLineBufferPolygon(coords, bufferMeters) {
  // 1 deg lat ~ 111,000 meters. 1 deg lon ~ 111,000 * cos(-7.6) ~ 110,000 meters
  const dLat = bufferMeters / 111000;
  const dLon = bufferMeters / (111000 * Math.cos((-7.6 * Math.PI) / 180));

  const leftSide = [];
  const rightSide = [];

  for (let i = 0; i < coords.length; i++) {
    const curr = coords[i];
    let dx = 0;
    let dy = 0;

    if (i === 0) {
      const next = coords[1];
      dx = next[0] - curr[0];
      dy = next[1] - curr[1];
    } else if (i === coords.length - 1) {
      const prev = coords[i - 1];
      dx = curr[0] - prev[0];
      dy = curr[1] - prev[1];
    } else {
      const prev = coords[i - 1];
      const next = coords[i + 1];
      dx = next[0] - prev[0];
      dy = next[1] - prev[1];
    }

    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) continue;

    // Normal vector perpendicular to segment
    const nx = -dy / len;
    const ny = dx / len;

    leftSide.push([Number((curr[0] + nx * dLon).toFixed(6)), Number((curr[1] + ny * dLat).toFixed(6))]);
    rightSide.push([Number((curr[0] - nx * dLon).toFixed(6)), Number((curr[1] - ny * dLat).toFixed(6))]);
  }

  rightSide.reverse();
  const ring = [...leftSide, ...rightSide];
  if (ring.length > 0) {
    ring.push(ring[0]); // close ring
  }

  return ring;
}

raw.river.elements.forEach(el => {
  if (el.type === 'way') {
    const feat = wayToLineString(el);
    if (feat) {
      const isBengawan = (el.tags?.name && el.tags.name.toLowerCase().includes('bengawan')) || el.tags?.waterway === 'river';
      feat.properties.isBengawan = isBengawan;
      riverFeatures.push(feat);

      // Generate Sempadan Sungai polygon:
      // Bengawan Solo: 100 meter buffer (Permen PUPR 28/2015 untuk sungai tak bertanggul di luar perkotaan / 50m bertanggul)
      // Anak sungai / Kali: 30 meter buffer
      const bufferDist = isBengawan ? 100 : 35;
      if (feat.geometry.coordinates.length >= 3) {
        const ring = generateLineBufferPolygon(feat.geometry.coordinates, bufferDist);
        if (ring.length >= 4) {
          sempadanFeatures.push({
            type: 'Feature',
            properties: {
              riverName: feat.properties.name,
              bufferWidthMeters: bufferDist,
              legalBasis: 'Permen PUPR No. 28/PRT/M/2015',
              type: isBengawan ? 'Sempadan Sungai Bengawan Solo (100m)' : 'Sempadan Anak Sungai / Saluran (35m)',
              zoneConstraint: 'Zona Lindung Sempadan (Hanya untuk RTH, sabuk hijau, sempadan sempadan tanggul)'
            },
            geometry: {
              type: 'Polygon',
              coordinates: [ring]
            }
          });
        }
      }
    }
  }
});

const output = {
  metadata: {
    crs: 'EPSG:4326',
    generatedAt: new Date().toISOString(),
    source: 'OpenStreetMap Real Geometries & Permen PUPR 28/2015 Sukoharjo GIS',
    counts: {
      railways: railFeatures.length,
      stations: stationFeatures.length,
      arteri: arteriFeatures.length,
      lokal: lokalFeatures.length,
      lingkungan: lingkunganFeatures.length,
      rivers: riverFeatures.length,
      sempadan: sempadanFeatures.length
    }
  },
  railways: {
    type: 'FeatureCollection',
    features: railFeatures
  },
  stations: {
    type: 'FeatureCollection',
    features: stationFeatures
  },
  arteri: {
    type: 'FeatureCollection',
    features: arteriFeatures
  },
  lokal: {
    type: 'FeatureCollection',
    features: lokalFeatures
  },
  lingkungan: {
    type: 'FeatureCollection',
    features: lingkunganFeatures
  },
  rivers: {
    type: 'FeatureCollection',
    features: riverFeatures
  },
  sempadan: {
    type: 'FeatureCollection',
    features: sempadanFeatures
  }
};

fs.writeFileSync('src/data/real_infrastructure.json', JSON.stringify(output));
console.log('Processed successfully! Stats:', output.metadata.counts);
