#!/usr/bin/env python3

import os
import cgi
import http.cookies
import html
from pathlib import Path

# Access Python Session
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

# Access Stored Data
name = None
if session_path.exists():
    with session_path.open("r") as session_file:
        name = session_file.read().strip()

print("Content-Type: text/html\n")

print("<html>")
print("<head>")
print("<title>Python Sessions</title>")
print("</head>")
print("<body>")

print("<h1>Python Sessions Page 2</h1>")

if name:
    print(f"<p><b>Name:</b> {html.escape(name)}")
else:
    print("<p><b>Name:</b> You do not have a name set</p>")
print("<br/><br/>")
print("<a href=\"/cgi-bin/Python/py-sessions-1.py\">Session Page 1</a><br/>")
print("<a href=\"/cgi-forms/py-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/Python/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")
print("</html>")

