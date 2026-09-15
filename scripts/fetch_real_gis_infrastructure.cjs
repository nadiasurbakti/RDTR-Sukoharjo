const https = require('https');
const fs = require('fs');
const path = require('path');

function queryOverpass(query) {
  return new Promise((resolve, reject) => {
    const postData = 'data=' + encodeURIComponent(query);
    const options = {
      hostname: 'overpass.kumi.systems',
      port: 443,
      path: '/api/interpreter',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'SukoharjoRDTRGIS/1.0 (spatial.studio@sukoharjo.go.id)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(new Error('Parse error: ' + err.message + '\n' + data.substring(0, 200)));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.setTimeout(45000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.write(postData);
    req.end();
  });
}

// Bounding box covering Mojolaban, Baki, Gatak, and connections in Sukoharjo/Solo:
// south: -7.66, west: 110.71, north: -7.54, east: 110.93
async function run() {
  console.log('Fetching Railway tracks & stations...');
  const railQuery = `[out:json][timeout:35];
    (
      way["railway"="rail"](-7.66,110.71,-7.54,110.93);
      node["railway"="station"](-7.66,110.71,-7.54,110.93);
    );
    out geom;`;
  
  const railResult = await queryOverpass(railQuery);
  console.log('Rail ways/nodes count:', railResult.elements?.length || 0);

  console.log('Fetching River & Waterways (Bengawan Solo, etc.)...');
  const riverQuery = `[out:json][timeout:35];
    (
      way["waterway"~"river|canal"](-7.66,110.71,-7.54,110.93);
    );
    out geom;`;
  
  const riverResult = await queryOverpass(riverQuery);
  console.log('River ways count:', riverResult.elements?.length || 0);

  console.log('Fetching Primary & Trunk Roads (Jalan Arteri)...');
  const arteriQuery = `[out:json][timeout:35];
    (
      way["highway"~"primary|trunk"](-7.66,110.71,-7.54,110.93);
    );
    out geom;`;
  
  const arteriResult = await queryOverpass(arteriQuery);
  console.log('Arteri ways count:', arteriResult.elements?.length || 0);

  console.log('Fetching Secondary & Tertiary Roads (Jalan Kolektor / Lokal)...');
  const lokalQuery = `[out:json][timeout:35];
    (
      way["highway"~"secondary|tertiary"](-7.66,110.71,-7.54,110.93);
    );
    out geom;`;
  
  const lokalResult = await queryOverpass(lokalQuery);
  console.log('Lokal/Kolektor ways count:', lokalResult.elements?.length || 0);

  console.log('Fetching Representative Residential / Village Streets in 3 WP...');
  const lingkunganQuery = `[out:json][timeout:35];
    (
      way["highway"~"residential|unclassified"](-7.62,110.73,-7.57,110.78);
      way["highway"~"residential|unclassified"](-7.63,110.77,-7.58,110.82);
      way["highway"~"residential|unclassified"](-7.63,110.84,-7.56,110.91);
    );
    out geom;`;
  
  const lingkunganResult = await queryOverpass(lingkunganQuery);
  console.log('Lingkungan ways count:', lingkunganResult.elements?.length || 0);

  fs.writeFileSync('scripts/raw_osm_data.json', JSON.stringify({
    rail: railResult,
    river: riverResult,
    arteri: arteriResult,
    lokal: lokalResult,
    lingkungan: lingkunganResult
  }));

  console.log('Raw data successfully saved!');
}

run().catch(err => {
  console.error('Failed:', err);
});
