#!/usr/bin/ruby
puts "Cache-Control: no-cache\n"
puts "Content-type: text/html \n\n"

puts <<END

<!DOCTYPE html>
<html><head><title>General Request Echo</title>
</head><body><h1 align="center">General Request Echo</h1>
<hr>
END

puts "<p><b>HTTP Protocol:</b> #{ENV['SERVER_PROTOCOL']}</p>"
puts "<p><b>HTTP Method:</b> #{ENV['REQUEST_METHOD']}</p>"
puts "<p><b>Query String:</b> #{ENV['QUERY_STRING']}</p>"

form_data = $stdin.read(ENV['CONTENT_LENGTH'].to_i)
puts "<p><b>Message Body:</b> #{form_data}</p>"

puts "</body></html>\n"
