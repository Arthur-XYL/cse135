#!/usr/bin/env ruby

puts "Cache-Control: no-cache"
puts "Content-type: text/html \n\n"

# print HTML file top
puts <<END
<!DOCTYPE html>
<html>
  <head>
    <title>Environment Variables</title>
  </head>
  <body>
    <h1 align="center">Environment Variables</h1>
    <hr>
END

# Loop over the environment variables and print each variable and its value
ENV.sort.each do |variable, value|
  puts "<b>#{variable}:</b> #{value}<br />\n"
end

# Print the HTML file bottom
puts "</body></html>"
