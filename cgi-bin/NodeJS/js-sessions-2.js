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

// Check process.env to set HTTP_COOKIE
process.env.HTTP_COOKIE = '_ga_7MLVG9484E=GS1.1.1682807569.1.1.1682808683.0.0.0; _gid=GA1.2.1833726376.1682818191; PHPSESSID=vf02718gel9ujt3oti8au6abvv; _lr_uf_-uj6ecf=fb04faf1-fbed-4f7f-a663-02ae7f4f2075; _ga_GLD2WPQ9HC=GS1.1.1682829225.3.0.1682829227.0.0.0; _ga=GA1.2.58097484.1681610498; _lr_hb_-uj6ecf%2Fcse135cloud={%22heartbeat%22:1682833465971}; _lr_tabs_-uj6ecf%2Fcse135cloud={%22sessionID%22:0%2C%22recordingID%22:%225-e3fc141d-fbc0-48d8-a0e6-2298e0e679ac%22%2C%22lastActivity%22:1682833467222}';
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
