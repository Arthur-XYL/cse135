#!/usr/bin/env python3

import os
from datetime import datetime

# Print HTTP header
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# Print HTML content
print("<html>")
print("<head>")
print("<title>Hello, Python!</title>")
print("</head>")
print("<body>")
print("<h1>Arthur was here - Hello, Python!</h1>")
print("<p>This page was generated with the Python programming language</p>")
print("<p>Current Time: {}</p>".format(datetime.now()))
print("<p>Your IP Address: {}</p>".format(os.environ['REMOTE_ADDR']))
print("</body>")
print("</html>")