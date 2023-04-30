#!/usr/bin/env node

const http = require('http');

process.stdout.write('Cache-Control: no-cache\n');
process.stdout.write('Content-Type: text/html\n\n');

process.stdout.write('<!DOCTYPE html>');
process.stdout.write('<html><head><title>Environment Variables</title>');
process.stdout.write('</head><body><h1 align="center">Environment Variables</h1>');
process.stdout.write('<hr>');

// Loop over the environment variables and print each variable and its value
for (const variable in process.env) {
    process.stdout.write(`<p><strong>${variable}:</strong> ${process.env[variable]}</p>`);
}

process.stdout.write('</body>');
process.stdout.write('</html>');