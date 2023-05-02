#!/usr/bin/env node

const http = require('http');

process.stdout.write('Cache-Control: no-cache\n');
process.stdout.write('Content-Type: text/html\n\n');

const date = new Date().toLocaleString();
const address = process.env.REMOTE_ADDR || 'Unknown';

process.stdout.write('<html>');
process.stdout.write('<head>');
process.stdout.write('<title>Hello, Node.js!</title>');
process.stdout.write('</head>');
process.stdout.write('<body>');

process.stdout.write('<h1>Avalanche was here - Hello, Node.js!</h1>');
process.stdout.write('<p>This page was generated with the Node.js programming language</p>');

process.stdout.write(`<p>Current Time: ${date}</p>`);
process.stdout.write(`<p>Your IP Address: ${address}</p>`);

process.stdout.write('</body>');
process.stdout.write('</html>');
