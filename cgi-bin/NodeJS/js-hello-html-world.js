const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  const now = new Date().toUTCString();

  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-type', 'text/html');
  res.write('<html><head><title>Hello NodeJS World</title></head><body>');
  res.write(`<h1>Hello NodeJS World</h1><hr/>`);
  res.write(`Hello World<br/>`);
  res.write(`This program was generated at: ${now}<br/>`);
  res.write(`Your current IP address is: ${req.socket.remoteAddress}<br/>`);
  res.write(`</body></html>`);
  res.end();
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
