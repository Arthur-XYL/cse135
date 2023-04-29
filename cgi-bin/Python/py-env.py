#!/usr/bin/python3

import os

# print HTTP header
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# print HTML file top
print("<!DOCTYPE html>")
print("<html><head><title>Environment Variables</title>")
print("</head><body><h1 align='center'>Environment Variables</h1>")
print("<hr>")

# Loop over the environment variables and print each variable and its value
for variable, value in os.environ.items():
    print("<b>" + variable + ":</b> " + value + "<br/>")

# Print the HTML file bottom
print("</body></html>")

