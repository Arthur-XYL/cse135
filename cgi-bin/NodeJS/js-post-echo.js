#!/usr/bin/env node

const readline = require('readline');

// Print HTTP headers
process.stdout.write('Cache-Control: no-cache\n');
process.stdout.write('Content-type: text/html\n\n');

// Start HTML document
process.stdout.write('<html><head><title>POST Message Body</title></head>');
process.stdout.write('<body><h1 align="center">POST Message Body</h1><hr>');

process.stdout.write('<b>Message Body: </b>');

// Read and print POST data
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    process.stdout.write(input + '<br/>');
});

// End HTML document
process.stdout.write('</body></html>');
