const http = require('http');

const PORT = 3999;
let server;

function startServer() {
  return new Promise((resolve) => {
    process.env.PORT = PORT;
    server = require('./server.js');
    // Give server time to start
    setTimeout(resolve, 500);
  });
}

function request(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Health endpoint
  try {
    const res = await request('/health');
    const body = JSON.parse(res.body);
    if (res.status === 200 && body.status === 'ok' && body.timestamp) {
      console.log('PASS: /health returns status ok with timestamp');
      passed++;
    } else {
      console.log('FAIL: /health unexpected response', body);
      failed++;
    }
  } catch (e) {
    console.log('FAIL: /health error', e.message);
    failed++;
  }

  // Test 2: Root endpoint
  try {
    const res = await request('/');
    if (res.status === 200 && res.body.includes('Marshall Code Demo')) {
      console.log('PASS: / returns demo page');
      passed++;
    } else {
      console.log('FAIL: / unexpected response');
      failed++;
    }
  } catch (e) {
    console.log('FAIL: / error', e.message);
    failed++;
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
