#!/usr/bin/env python3
import os
import cgi
import http.cookies
import html
from pathlib import Path

# Create a new Python Session
from http import cookies
from tempfile import gettempdir
from uuid import uuid4


session_dir = Path(gettempdir()) / "python_sessions"
session_dir.mkdir(parents=True, exist_ok=True)


cookie = cookies.SimpleCookie()
cookie.load(os.environ.get("HTTP_COOKIE", ""))
session_id = None


if "PYSESSID" in cookie:
    session_id = cookie["PYSESSID"].value
else:
    session_id = str(uuid4())


session_path = session_dir / session_id


# Store Data in that Python Session
form = cgi.FieldStorage()
name = form.getvalue("username", None)


if name is not None:
    with session_path.open("w") as session_file:
        session_file.write(name)
elif session_path.exists():
    with session_path.open("r") as session_file:
        name = session_file.read().strip()


# Create a new Cookie from the Session ID
cookie["PYSESSID"] = session_id
print(cookie.output())
print("Content-Type: text/html\n")


print("<html>")
print("<head>")
print("<title>Python Sessions</title>")
print("</head>")
print("<body>")


print("<h1>Python Sessions Page 1</h1>")

if name:
    print(f"<p><b>Name:</b> {html.escape(name)}")
else:
    print("<p><b>Name:</b> You do not have a name set</p>")
print("<br/><br/>")
print("<a href=\"/cgi-bin/Python/py-sessions-2.py\">Session Page 2</a><br/>")
print("<a href=\"/cgi-forms/py-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/Python/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")
print("</body>")
print("</html>")