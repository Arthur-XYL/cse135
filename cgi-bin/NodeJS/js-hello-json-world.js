#!/usr/bin/env node

const http = require('http');

process.stdout.write('Cache-Control: no-cache\n');
process.stdout.write('Content-Type: application/json\n\n');

const date = new Date().toLocaleString();
const address = process.env.REMOTE_ADDR || 'Unknown';

const responseData = {
  message: 'Hello, Node.js!',
  time: date,
  ipAddress: address
};

process.stdout.write(JSON.stringify(responseData));
