const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><head><title>Hello NodeJS World</title></head>');
  res.write('<body>');
  res.write('<h1>Hello NodeJS World!</h1>');
  res.write(`<p>Current Time: ${new Date()}</p>`);
  res.write(`<p>User's IP address: ${req.socket.remoteAddress}</p>`);
  res.write('</body></html>');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
