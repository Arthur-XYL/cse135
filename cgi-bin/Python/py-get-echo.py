#!/usr/bin/env python3

import os

# Print HTTP headers
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# Start HTML document
print("<html><head><title>GET Request Echo</title></head>")
print("<body><h1 align=\"center\">GET Request Echo</h1><hr>")

# Parse the query string
query_string = os.environ.get("QUERY_STRING", "")
query_dict = {}
for item in query_string.split("&"):
    if "=" in item:
        key, value = item.split("=", 1)
        query_dict[key] = value

# Print the query string
print("<b>Query String:</b> %s<br><br>" % query_string)
print("<table><tr><th>Variable</th><th>Value</th></tr>")
for key, value in query_dict.items():
    print("<tr><td>%s</td><td>%s</td></tr>" % (key, value))
print("</table>")

# End HTML document
print("</body></html>")

