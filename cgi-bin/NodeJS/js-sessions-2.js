#!/usr/bin/env node

const process = require('process');

// Headers
process.stdout.write("Cache-Control: no-cache\n");
process.stdout.write("Content-type: text/html\n\n");

// Body - HTML
process.stdout.write("<html>");
process.stdout.write("<head><title>NodeJS Sessions</title></head>\n");
process.stdout.write("<body>");
process.stdout.write("<h1>NodeJS Sessions Page 2</h1>");
process.stdout.write("<table>");

const cookie = process.env.HTTP_COOKIE;

if (cookie && cookie !== "destroyed") {
  process.stdout.write("<tr><td>Cookie:</td><td>" + cookie + "</td></tr>\n");
} else {
  process.stdout.write("<tr><td>Cookie:</td><td>None</td></tr>\n");
}

process.stdout.write("</table>");

// Links for other pages
process.stdout.write("<br />");
process.stdout.write("<a href=\"/cgi-bin/NodeJS/js-sessions-1.js\">Session Page 1</a>");
process.stdout.write("<br />");
process.stdout.write("<a href=\"/cgi-forms/js-cgiform.html\">NodeJS CGI Form</a>");
process.stdout.write("<br /><br />");

// Destroy Cookie button
process.stdout.write("<form action=\"/cgi-bin/NodeJS/js-destroy-session.js\" method=\"get\">");
process.stdout.write("<button type=\"submit\">Destroy Session</button>");
process.stdout.write("</form>");

process.stdout.write("</body>");
process.stdout.write("</html>");
