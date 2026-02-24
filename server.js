const http = require('http');
const pkg = require('./package.json');

const PORT = process.env.PORT || 3000;
const startTime = Date.now();

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
    return;
  }

  if (req.url === '/version') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      version: pkg.version,
      uptime: Math.floor((Date.now() - startTime) / 1000)
    }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Marshall Code Demo</h1><p>Pipeline test project.</p>');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
