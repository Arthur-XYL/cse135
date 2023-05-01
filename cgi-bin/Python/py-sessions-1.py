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

name = None
flag = 3

if "PYSESSID" in cookie: #have session before, why does it check that?
    flag = cookie["PYSESSID"].value
    session_id = cookie["PYSESSID"].value
    
else: #creates new session; reads from form
    flag = 2
    session_id = str(uuid4())
    
    # Store Data in that Python Session
    form = cgi.FieldStorage()
    name = form.getvalue("username", None)

session_path = session_dir / session_id

if flag == 2:
    with session_path.open("w") as session_file:
        session_file.write(name)
if (flag == 1) and (session_path.exists()):
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
print(flag)

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