#!/usr/bin/env node

const readline = require('readline');

// Print HTTP headers
process.stdout.write("Cache-Control: no-cache");
process.stdout.write("Content-type: text/html\n");

// Start HTML document
process.stdout.write("<html><head><title>General Request Echo</title></head>");
process.stdout.write("<body><h1 align=\"center\">General Request Echo</h1><hr>");

// From process.env we can set the environment variables:
process.env.SERVER_PROTOCOL = 'HTTP/1.1';
process.env.REQUEST_METHOD = 'GET';
process.env.QUERY_STRING = '';

// Print HTTP protocol, method and query string
process.stdout.write(`<p><b>HTTP Protocol:</b> ${process.env.SERVER_PROTOCOL}</p>`);
process.stdout.write(`<p><b>HTTP Method:</b> ${process.env.REQUEST_METHOD}</p>`);
process.stdout.write(`<p><b>Query String:</b> ${process.env.QUERY_STRING}</p>`);

// Read and print message body from standard input
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

process.stdout.write(`<b>Message Body:</b>`);
rl.on('line', (line) => {
    process.stdout.write(line + + '<br/>');
});

// End HTML document
process.stdout.write("</body></html>");
