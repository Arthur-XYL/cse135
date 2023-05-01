#!/usr/bin/env node

const SESSION_COOKIE_NAME = 'sessionID';
const USERNAME_COOKIE_NAME = 'username';

process.stdout.write('Content-Type: text/html\r\n');

// Delete session and username cookies
process.stdout.write(`Set-Cookie: ${SESSION_COOKIE_NAME}=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT\r\n`);
process.stdout.write(`Set-Cookie: ${USERNAME_COOKIE_NAME}=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT\r\n`);

process.stdout.write('\r\n');

process.stdout.write(`
  <html>
    <head><title>NodeJS Session Destroyed</title></head>
    <body>
      <h1>Session Destroyed</h1>
      <a href="/cgi-forms/js-cgiform.html">Back to the NodeJS CGI Form</a><br />
      <a href="/cgi-bin/NodeJS/js-sessions-1.js">Back to Page 1</a><br />
      <a href="/cgi-bin/NodeJS/js-sessions-2.js">Back to Page 2</a>
    </body>
  </html>
`);






// #!/usr/bin/env node

// process.stdout.write("Cache-Control: no-cache\n");
// process.stdout.write("Set-Cookie: destroyed\n");
// process.stdout.write("Content-type: text/html\n\n");

// process.stdout.write("<html>");
// process.stdout.write("<head><title>NodeJS Session Destroyed</title></head>");
// process.stdout.write("<body>");
// process.stdout.write("<h1>NodeJS Session Destroyed</h1>");

// process.stdout.write("<a href=\"/cgi-bin/NodeJS/js-sessions-1.js\">Back to Page 1</a>");
// process.stdout.write("<br />");
// process.stdout.write("<a href=\"/cgi-bin/NodeJS/js-sessions-2.js\">Back to Page 2</a>");
// process.stdout.write("<br />");
// process.stdout.write("<a href=\"/cgi-forms/js-cgiform.html\">NodeJS CGI Form</a>");

// process.stdout.write("</body>");
// process.stdout.write("</html>");
