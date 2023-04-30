#!/usr/bin/env node

const http = require('http');
const url = require('url');

// Set HTTP headers
process.stdout.write('Cache-Control: no-cache\n');
process.stdout.write('Content-type: text/html\n\n');

// Start HTML document
process.stdout.write('<html><head><title>GET Request Echo</title></head>');
process.stdout.write('<body><h1 align="center">GET Request Echo</h1><hr>');

// Parse the query string
const query = url.parse(process.env.REQUEST_URI, true).query;

// Print the query string
process.stdout.write('<b>Query String:</b> ' + process.env.QUERY_STRING + '<br><br>');
process.stdout.write('<table><tr><th>Variable</th><th>Value</th></tr>');
for (const key in query) {
    const value = query[key];
    process.stdout.write('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
}
process.stdout.write('</table>');

// End HTML document
process.stdout.write('</body></html>');