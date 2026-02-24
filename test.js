const http = require('http');
const pkg = require('./package.json');

const BASE = `http://localhost:${process.env.PORT || 3000}`;
let server;
let passed = 0;
let failed = 0;

function test(name, fn) {
  return fn().then(() => { passed++; console.log(`  PASS: ${name}`); })
    .catch(e => { failed++; console.log(`  FAIL: ${name} — ${e.message}`); });
}

function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get(BASE + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  // Start server
  server = require('./server.js');
  await new Promise(r => setTimeout(r, 500));

  console.log('Running tests...');

  await test('GET /health returns 200', async () => {
    const r = await fetch('/health');
    if (r.status !== 200) throw new Error(`status ${r.status}`);
    const j = JSON.parse(r.body);
    if (j.status !== 'ok') throw new Error(`status field: ${j.status}`);
  });

  await test('GET /version returns version and uptime', async () => {
    const r = await fetch('/version');
    if (r.status !== 200) throw new Error(`status ${r.status}`);
    const j = JSON.parse(r.body);
    if (j.version !== pkg.version) throw new Error(`version mismatch: ${j.version}`);
    if (typeof j.uptime !== 'number') throw new Error(`uptime not a number: ${j.uptime}`);
  });

  await test('GET / returns HTML', async () => {
    const r = await fetch('/');
    if (r.status !== 200) throw new Error(`status ${r.status}`);
    if (!r.body.includes('Marshall Code Demo')) throw new Error('missing title');
  });

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
