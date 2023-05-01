#!/usr/bin/env python3

import os
import cgi
import http.cookies
from pathlib import Path

# Destroy Python Session
from http import cookies
from tempfile import gettempdir

session_dir = Path(gettempdir()) / "python_sessions"
session_dir.mkdir(parents=True, exist_ok=True)

cookie = cookies.SimpleCookie()
cookie.load(os.environ.get("HTTP_COOKIE", ""))
session_id = None

if "PYSESSID" in cookie:
    session_id = cookie["PYSESSID"].value
else:
    print("Content-Type: text/html\n")
    print("<html>")
    print("<head>")
    print("<title>Error</title>")
    print("</head>")
    print("<body>")
    print("<h1>Error: Session not found</h1>")
    print("<p>No session was found. Please go to <a href=\"/cgi-bin/Python/python-sessions-1.py\">Session Page 1</a> to create a session.</p>")
    print("</body>")
    print("</html>")
    exit()

session_path = session_dir / session_id
if session_path.exists():
    session_path.unlink()

print("Content-Type: text/html\n")

print("<html>")
print("<head>")
print("<title>Python Session Destroyed</title>")
print("</head>")
print("<body>")
print("<h1>Session Destroyed</h1>")
print("<a href=\"/cgi-forms/py-cgiform.html\">Back to the Python CGI Form</a><br />")
print("<a href=\"/cgi-bin/Python/py-sessions-1.py\">Back to Page 1</a><br />")
print("<a href=\"/cgi-bin/Python/py-sessions-2.py\">Back to Page 2</a>")
print("</body>")
print("</html>")

