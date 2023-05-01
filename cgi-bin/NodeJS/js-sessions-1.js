#!/usr/bin/env node

const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use express-session middleware
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.locals.username = '';

// Headers
process.stdout.write("Cache-Control: no-cache\n");
process.stdout.write("Content-type: text/html\n\n"); // Add Content-type header

// Get Name from Environment
app.post('../cgi-bin/NodeJS/js-sessions-1.js', (req, res) => {
  const name = req.body.username;
  // Set the app.locals variable
  if (name) {
    app.locals.username = name;
  }
  // Redirect to the same page to display the username
  res.redirect('../cgi-bin/NodeJS/js-sessions-1.js');
});

// Body - HTML
process.stdout.write("<html>");
process.stdout.write("<head><title>NodeJS Sessions</title></head>\n");
process.stdout.write("<body>");
process.stdout.write("<h1>NodeJS Sessions Page 1</h1>");
process.stdout.write("<table>");

// Check for the app.locals variable
if (app.locals.username) {
  process.stdout.write(`<tr><td>Cookie:</td><td>${app.locals.username}</td></tr>\n`);
}
else {
  process.stdout.write("<tr><td>Cookie:</td><td>None</td></tr>\n");
}

process.stdout.write("</table>");

// Links for other pages
process.stdout.write("<br />");
process.stdout.write('<a href="/cgi-bin/NodeJS/js-sessions-2.js">Session Page 2</a>');
process.stdout.write("<br />");
process.stdout.write('<a href="/cgi-forms/js-cgiform.html">NodeJS CGI Form</a>');
process.stdout.write("<br /><br />");
// Destroy Session button
process.stdout.write('<form action="/cgi-bin/NodeJS/js-destroy-session.js" method="get">');
process.stdout.write('<button type="submit">Destroy Session</button>');
process.stdout.write('</form>');

process.stdout.write("</body>");
process.stdout.write("</html>");







// const cgi = require('node-cgi');

// cgi(async (req, res) => {
//   if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
//     try {
//       const body = await new Promise((resolve, reject) => {
//         let data = '';
//         req.on('data', chunk => {
//           data += chunk.toString();
//         });
//         req.on('end', () => {
//           resolve(data);
//         });
//         req.on('error', reject);
//       });

//       const jsonData = JSON.parse(body);
//       const name = jsonData.name;

//       // Set headers
//       res.setHeader('Cache-Control', 'no-cache');
//       res.setHeader('Content-Type', 'text/html');

//       // Set the cookie using a header
//       if (name) {
//         res.setHeader('Set-Cookie', `name=${name}`);
//       }

//       // Generate HTML response
//       generateHTML(res, req.headers.cookie, name);
//       res.end();
//     } catch (error) {
//       res.statusCode = 400;
//       res.setHeader('Content-Type', 'text/plain');
//       res.end('Bad Request');
//     }
//   } else {
//     res.statusCode = 405;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Method Not Allowed');
//   }
// });

// function generateHTML(res, oldCookie, newName) {
//   // Body - HTML
//   res.write('<html>');
//   res.write('<head><title>C Sessions</title></head>\n');
//   res.write('<body>');
//   res.write('<h1>C Sessions Page 1</h1>');
//   res.write('<table>');

//   // First check for new Cookie, then check for old Cookie
//   if (newName) {
//     res.write(`<tr><td>Cookie:</td><td>${newName}</td></tr>\n`);
//   } else if (oldCookie && oldCookie !== 'destroyed') {
//     res.write(`<tr><td>Cookie:</td><td>${oldCookie}</td></tr>\n`);
//   } else {
//     res.write('<tr><td>Cookie:</td><td>None</td></tr>\n');
//   }

//   res.write('</table>');

//   // Links for other pages
//   res.write('<br />');
//   res.write('<a href="/c-sessions-2">Session Page 2</a>');
//   res.write('<br />');
//   res.write('<a href="/c-cgiform.html">C CGI Form</a>');
//   res.write('<br /><br />');

//   // Destroy Cookie button
//   res.write('<form action="/c-destroy-session" method="get">');
//   res.write('<button type="submit">Destroy Session</button>');
//   res.write('</form>');

//   // Submit name form
//   res.write('<form action="/" method="post">');
//   res.write('<label for="name">Name:</label>');
//   res.write('<input type="text" id="name" name="name">');
//   res.write('<button type="submit">Submit</button>');
//   res.write('</form>');

//   res.write('</body>');
//   res.write('</html>');
// }

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
