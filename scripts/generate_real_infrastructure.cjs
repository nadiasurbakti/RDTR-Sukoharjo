const https = require('https');
const fs = require('fs');
const path = require('path');

const query = `[out:json][timeout:60];
(
  way["railway"="rail"](-7.66,110.71,-7.54,110.92);
  node["railway"="station"](-7.66,110.71,-7.54,110.92);
  way["waterway"~"river|canal"](-7.66,110.71,-7.54,110.92);
  way["highway"~"primary|trunk|motorway"](-7.66,110.71,-7.54,110.92);
  way["highway"~"secondary|tertiary"](-7.64,110.72,-7.56,110.91);
  way["highway"~"residential|unclassified"](-7.62,110.73,-7.57,110.78);
  way["highway"~"residential|unclassified"](-7.63,110.77,-7.58,110.82);
  way["highway"~"residential|unclassified"](-7.63,110.84,-7.56,110.91);
);
out geom;`;

function run() {
  console.log('Sending Overpass query for real roads, railway, and rivers...');
  const postData = 'data=' + encodeURIComponent(query);
  const req = https.request({
    hostname: 'overpass-api.de',
    port: 443,
    path: '/api/interpreter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'SukoharjoGISRealInfrastructure/2.0'
    }
  }, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const osmData = JSON.parse(body);
        console.log('Downloaded elements count:', osmData.elements ? osmData.elements.length : 0);
        processAndSave(osmData);
      } catch (err) {
        console.error('Failed to parse Overpass response:', err.message, body.substring(0, 200));
      }
    });
  });

  req.on('error', err => console.error('Request error:', err));
  req.write(postData);
  req.end();
}

function classifyRoad(tags) {
  const hw = tags.highway;
  if (['motorway', 'trunk', 'primary'].includes(hw)) return 'Jalan Arteri';
  if (['secondary', 'tertiary'].includes(hw)) return 'Jalan Kolektor / Lokal';
  if (['residential', 'unclassified', 'living_street'].includes(hw)) return 'Jalan Lingkungan';
  return 'Jalan Lainnya';
}

function wayToLineString(way) {
  if (!way.geometry || way.geometry.length < 2) return null;
  const coordinates = way.geometry.map(pt => [Number(pt.lon.toFixed(6)), Number(pt.lat.toFixed(6))]);
  return {
    type: 'Feature',
    properties: {
      id: way.id,
      name: way.tags?.name || way.tags?.ref || 'Tanpa Nama',
      highway: way.tags?.highway,
      railway: way.tags?.railway,
      waterway: way.tags?.waterway,
      ref: way.tags?.ref || '',
      surface: way.tags?.surface || '',
      lanes: way.tags?.lanes || '',
      maxspeed: way.tags?.maxspeed || '',
      operator: way.tags?.operator || '',
      roadClass: way.tags?.highway ? classifyRoad(way.tags) : undefined
    },
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    }
  };
}

// Flat-earth buffer generator to produce Sempadan Sungai polygon
function generateLineBufferPolygon(coords, bufferMeters) {
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

    const nx = -dy / len;
    const ny = dx / len;

    leftSide.push([Number((curr[0] + nx * dLon).toFixed(6)), Number((curr[1] + ny * dLat).toFixed(6))]);
    rightSide.push([Number((curr[0] - nx * dLon).toFixed(6)), Number((curr[1] - ny * dLat).toFixed(6))]);
  }

  rightSide.reverse();
  const ring = [...leftSide, ...rightSide];
  if (ring.length > 0) {
    ring.push(ring[0]);
  }
  return ring;
}

function processAndSave(osmData) {
  const elements = osmData.elements || [];

  const railFeatures = [];
  const stationFeatures = [];
  const arteriFeatures = [];
  const lokalFeatures = [];
  const lingkunganFeatures = [];
  const riverFeatures = [];
  const sempadanFeatures = [];

  elements.forEach((el, index) => {
    if (el.type === 'node' && el.tags?.railway === 'station') {
      const isGawok = (el.tags.name || '').toLowerCase().includes('gawok');
      stationFeatures.push({
        type: 'Feature',
        properties: {
          id: el.id,
          name: el.tags.name || 'Stasiun Kereta Api',
          railway: 'station',
          operator: el.tags.operator || 'PT Kereta Api Indonesia',
          isTOD: isGawok,
          zone: isGawok ? 'TOD Gawok (Kecamatan Gatak)' : 'Stasiun Sekitar'
        },
        geometry: {
          type: 'Point',
          coordinates: [Number(el.lon.toFixed(6)), Number(el.lat.toFixed(6))]
        }
      });
      return;
    }

    if (el.type !== 'way' || !el.geometry || el.geometry.length < 2) return;

    const feat = wayToLineString(el);
    if (!feat) return;

    // Railway
    if (el.tags?.railway === 'rail') {
      const isKrl = el.tags?.electrified === 'contact_line' || (el.tags?.name && el.tags.name.includes('Solo'));
      feat.properties.isKrl = isKrl;
      feat.properties.lineName = el.tags?.name || (isKrl ? 'KRL Commuter Line Solo-Yogya' : 'Jalur Rel Kereta Api');
      railFeatures.push(feat);
      return;
    }

    // River & Waterway
    if (el.tags?.waterway === 'river' || el.tags?.waterway === 'canal') {
      const nameLower = (el.tags.name || '').toLowerCase();
      const isBengawan = nameLower.includes('bengawan') || el.tags.name === 'Bengawan Solo' || el.tags.waterway === 'river';
      feat.properties.isBengawan = isBengawan;
      riverFeatures.push(feat);

      // Buffer Sempadan Sungai (100m for Bengawan Solo, 40m for others)
      const bufferDist = isBengawan ? 100 : 40;
      if (feat.geometry.coordinates.length >= 3) {
        const ring = generateLineBufferPolygon(feat.geometry.coordinates, bufferDist);
        if (ring.length >= 4) {
          sempadanFeatures.push({
            type: 'Feature',
            properties: {
              riverName: feat.properties.name,
              bufferWidthMeters: bufferDist,
              legalBasis: 'Permen PUPR No. 28/PRT/M/2015',
              type: isBengawan ? 'Sempadan Sungai Bengawan Solo (100 Meter)' : 'Sempadan Saluran / Kali (40 Meter)',
              rules: 'Zona Perlindungan Sempadan Air (Non-Terbangun, Sabuk Hijau & Perlindungan Banjir)'
            },
            geometry: {
              type: 'Polygon',
              coordinates: [ring]
            }
          });
        }
      }
      return;
    }

    // Highway / Roads
    if (el.tags?.highway) {
      const hw = el.tags.highway;
      if (['motorway', 'trunk', 'primary'].includes(hw)) {
        arteriFeatures.push(feat);
      } else if (['secondary', 'tertiary'].includes(hw)) {
        lokalFeatures.push(feat);
      } else if (['residential', 'unclassified', 'living_street'].includes(hw)) {
        // Keep sampling of residential to maintain high performance
        if (index % 2 === 0) {
          lingkunganFeatures.push(feat);
        }
      }
    }
  });

  // Ensure Stasiun Gawok is present if missing
  const hasGawok = stationFeatures.some(s => s.properties.name.toLowerCase().includes('gawok'));
  if (!hasGawok) {
    stationFeatures.push({
      type: 'Feature',
      properties: {
        id: 9901,
        name: 'Stasiun Gawok (TOD Gatak)',
        railway: 'station',
        operator: 'PT Kereta Api Indonesia (KAI Commuter)',
        isTOD: true,
        zone: 'Kawasan Transit-Oriented Development (TOD) Gawok - Gatak'
      },
      geometry: {
        type: 'Point',
        coordinates: [110.748365, -7.585521]
      }
    });
  }

  const result = {
    metadata: {
      crs: 'EPSG:4326',
      extractedAt: new Date().toISOString(),
      source: 'OpenStreetMap Real Geometries (Tracing Riil) & Permen PUPR No. 28/2015',
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
    railways: { type: 'FeatureCollection', features: railFeatures },
    stations: { type: 'FeatureCollection', features: stationFeatures },
    arteri: { type: 'FeatureCollection', features: arteriFeatures },
    lokal: { type: 'FeatureCollection', features: lokalFeatures },
    lingkungan: { type: 'FeatureCollection', features: lingkunganFeatures },
    rivers: { type: 'FeatureCollection', features: riverFeatures },
    sempadan: { type: 'FeatureCollection', features: sempadanFeatures }
  };

  const outputPath = path.resolve(__dirname, '../src/data/real_infrastructure.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('SUCCESS! Real Infrastructure GeoJSON saved to:', outputPath);
  console.log('Features count:', result.metadata.counts);
}

run();
