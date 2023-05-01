#!/usr/bin/python
import os
import cgi
import cgitb
from http.cookies import SimpleCookie

# Enable CGI error reporting
cgitb.enable()

# Create a new session or load an existing one
session_id = os.environ.get('HTTP_COOKIE')
if session_id:
    session_id = session_id.split('=')[1]
else:
    session_id = str(os.getpid()) + str(os.times()[-1])
session_file = open('/tmp/sess_' + session_id, 'w+')

# Store/retrieve data in/from the session
form = cgi.FieldStorage()
name = form.getvalue('username') or session_file.read()
session_file.seek(0)
session_file.write(name)
session_file.truncate()

# Create a new cookie using the session ID
cookie = SimpleCookie()
cookie['CGISESSID'] = session_id
print(cookie.output())

# Output the HTML content
print('Content-Type: text/html\n')
print('<html>')
print('<head>')
print('<title>Python Sessions</title>')
print('</head>')
print('<body>')
print('<h1>Python Sessions Page 1</h1>')

if name:
    print('<p><b>Name:</b> ' + name + '</p>')
else:
    print('<p><b>Name:</b> You do not have a name set</p>')

print('<br/><br/>')
print('<a href="/cgi-bin/Python/py-sessions-2.py">Session Page 2</a><br/>')
print('<a href="/cgi-forms/py-cgiform.html">Python CGI Form</a><br/>')
print('<form style="margin-top:30px" action="/cgi-bin/Python/py-destroy-session.py" method="get">')
print('<button type="submit">Destroy Session</button>')
print('</form>')
print('</body>')
print('</html>')
