#!/usr/bin/env python3
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
print("Hello, Python!")
print("Emily was here - Hello, Python!")
print("This page was generated with the Python programming language")
print("Current Time = " + today_day + " " + today_date + " " + current_time + " " + today_year)
hostName=socket.gethostname()   
IPAddress=socket.gethostbyname(hostName)   
print("Your Computer IP Address is:"+IPAddress)