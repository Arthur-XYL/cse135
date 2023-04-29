#!/usr/bin/env python3
import json
import os
import time

print("Cache-Control: no-cache")
print("Content-type: application/json\n")

current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
remote_addr = os.environ.get("REMOTE_ADDR")

response = {
    "message": "Hello, Python!",
    "date": current_time,
    "currentIP": remote_addr
}

print(json.dumps(response))

