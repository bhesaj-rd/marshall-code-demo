const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
    return;
  }

  if (req.url === '/about') {
    const aboutPath = path.join(__dirname, 'about.html');
    const html = fs.readFileSync(aboutPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Marshall Code Demo</h1><p>Pipeline test project.</p><p><a href="/about">About</a></p>');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
