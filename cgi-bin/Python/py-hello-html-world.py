#!/usr/bin/env python3

print("Content-Type: text/html") # Set the content type of the response
print() # Print a blank line to indicate the end of the header

import socket   
from datetime import datetime
from datetime import date
today = date.today()
now = datetime.now()
current_time = now.strftime("%H:%M:%S")
today_date = today.strftime("%B %d")
today_year = today.strftime("%Y")
today_day = now.strftime('%A')[:3]

# Print HTML content
print("<html>")
print("<head><title>Hello World</title></head>")
print("<body>")
print("<h1>Hello, Python!</h1>")
print("<p>Emily was here - Hello, Python!</p>")
print("<p>This page was generated with the Python programming language</p>")
print("<p>Current Time = " + today_day + " " + today_date + " " + current_time + " " + today_year + "</p>")
hostName=socket.gethostname()   
IPAddress=socket.gethostbyname(hostName)   
print("<p>Your Computer IP Address is:"+IPAddress+"</p>")
print("</body>")
print("</html>")