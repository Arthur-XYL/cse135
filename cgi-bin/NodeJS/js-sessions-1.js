#!/usr/bin/env node

const readline = require('readline');
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
app.post('/', (req, res) => {
    const name = req.body.username;
    // Set the app.locals variable
    if (name && name.length > 0) {
    app.locals.username = name;
    }
    // Redirect to the same page to display the username
    res.redirect('/');
});

  // Body - HTML
  process.stdout.write("<html>");
  process.stdout.write("<head><title>NodeJS Sessions</title></head>\n");
  process.stdout.write("<body>");
  process.stdout.write("<h1>NodeJS Sessions Page 1</h1>");
  process.stdout.write("<table>");
  
  // Check for the app.locals variable
  if (app.locals.username)
  {
    process.stdout.write(`<tr><td>Cookie:</td><td>${app.locals.username}</td></tr>\n`);
  }
  else
  {
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