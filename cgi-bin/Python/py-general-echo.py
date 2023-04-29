#!/usr/bin/env python3

import os
import sys

# Print HTTP headers
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# Print HTML file top
print("<html><head><title>General Request Echo</title></head> \
      <body><h1 align=center>General Request Echo</h1> \
      <hr/>")

# Get environment variables
http_protocol = os.environ.get('SERVER_PROTOCOL', '')
http_method = os.environ.get('REQUEST_METHOD', '')
query_string = os.environ.get('QUERY_STRING', '')
content_length = int(os.environ.get('CONTENT_LENGTH', 0))
message_body = sys.stdin.read(content_length)

# Print received information
print(f"<p><b>HTTP Protocol:</b> {http_protocol}</p>")
print(f"<p><b>HTTP Method:</b> {http_method}</p>")
print(f"<p><b>Query String:</b> {query_string}</p>")
print(f"<p><b>Message Body:</b> {message_body}</p>")

# Print HTML file bottom
print("</body>")
print("</html>")