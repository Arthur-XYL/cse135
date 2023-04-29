#!/usr/bin/env python3
import cgi

print("Cache-Control: no-cache")
print("Content-type: text/html\n")

print("<html><head><title>POST Message Body</title></head>")
print("<body><h1 align=center>POST Message Body</h1><hr/>")

form = cgi.FieldStorage()
if form:
    for field in form.keys():
        print("<b>{}</b>: {}<br/>".format(field, form.getvalue(field)))
else:
    print("<p>No message body.</p>")

print("</body></html>")

