process.stdout.write("Cache-Control: no-cache\n");
process.stdout.write("Set-Cookie: destroyed\n");
process.stdout.write("Content-type: text/html\n\n");

process.stdout.write("<html>");
process.stdout.write("<head><title>NodeJS Session Destroyed</title></head>");
process.stdout.write("<body>");
process.stdout.write("<h1>NodeJS Session Destroyed</h1>");

process.stdout.write("<a href=\"/cgi-bin/NodeJS/js-sessions-1.js\">Back to Page 1</a>");
process.stdout.write("<br />");
process.stdout.write("<a href=\"/cgi-bin/NodeJS/js-sessions-2.js\">Back to Page 2</a>");
process.stdout.write("<br />");
process.stdout.write("<a href=\"/cgi-forms/js-cgiform.html\">NodeJS CGI Form</a>");

process.stdout.write("</body>");
process.stdout.write("</html>");
