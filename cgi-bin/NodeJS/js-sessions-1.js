#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Headers
process.stdout.write("Cache-Control: no-cache\n");

// Get Name from Environment
rl.question('Username: ', (username) => {
  // Check to see if a proper name was sent
  let name = "";
  if (username)
  {
    name = username;
  }

  // Set the cookie using a header, add extra \n to end headers
  if (name.length > 0)
  {
    process.stdout.write("Content-type: text/html\n");
    process.stdout.write(`Set-Cookie: ${name}\n\n`);
  }
  else
  {
    process.stdout.write("Content-type: text/html\n\n");
  }

  // Body - HTML
  process.stdout.write("<html>");
  process.stdout.write("<head><title>NodeJS Sessions</title></head>\n");
  process.stdout.write("<body>");
  process.stdout.write("<h1>NodeJS Sessions Page 1</h1>");
  process.stdout.write("<table>");

  // First check for new Cookie, then Check for old Cookie
  if (name.length > 0)
  {
    process.stdout.write(`<tr><td>Cookie:</td><td>${name}</td></tr>\n`);
  }
  else if (process.env.HTTP_COOKIE !== null && process.env.HTTP_COOKIE !== "destroyed")
  {
    process.stdout.write(`<tr><td>Cookie:</td><td>${process.env.HTTP_COOKIE}</td></tr>\n`);
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

  // Destroy Cookie button
  process.stdout.write('<form action="/cgi-bin/NodeJS/js-destroy-session.js" method="get">');
  process.stdout.write('<button type="submit">Destroy Session</button>');
  process.stdout.write('</form>');

  process.stdout.write("</body>");
  process.stdout.write("</html>");
});
