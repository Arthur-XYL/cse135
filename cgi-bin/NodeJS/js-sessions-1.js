#!/usr/bin/env node

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/cgi-bin/NodeJS/js-sessions-1.js') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const name = body.split('=')[1];
      if (name && name.length > 0) {
        app.locals.username = name;
      }
      res.writeHead(302, { 'Location': '/cgi-bin/NodeJS/js-sessions-1.js' });
      res.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><head><title>NodeJS Sessions</title></head><body><h1>NodeJS Sessions Page 1</h1>');
    res.write('<table><tr><td>Cookie:</td><td>' + req.headers.cookie + '</td></tr></table><br />');
    res.write('<a href="/cgi-bin/NodeJS/js-sessions-2.js">Session Page 2</a><br />');
    res.write('<a href="/cgi-forms/js-cgiform.html">NodeJS CGI Form</a><br /><br />');
    res.write('<form action="/cgi-bin/NodeJS/js-destroy-session.js" method="get">');
    res.write('<button type="submit">Destroy Session</button></form></body></html>');
    res.end();
  }
});

server.listen(3000);
console.log('Server running on port 3000');
