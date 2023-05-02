#!/usr/bin/env ruby

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"
puts "<html>"
puts "<head>"
puts "<title>Hello, Ruby!</title>"
puts "</head>"
puts "<body>"

puts "<h1>Avalanche was here - Hello, Ruby!</h1>"
puts "<p>This page was generated with the Ruby programming language</p>"

date = Time.now
puts "<p>Current Time: #{date}</p>"

address = ENV['REMOTE_ADDR']
puts "<p>Your IP Address: #{address}</p>"

puts "</body>"
puts "</html>"
