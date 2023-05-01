#!/usr/bin/ruby
puts "Cache-Control: no-cache\n"
puts "Content-type: text/html \n\n"

puts <<END

<!DOCTYPE html>
<html><head><title>GET Request Echo</title>
</head><body><h1 align="center">Get Request Echo</h1>
<hr>
END

puts "<b>Query String:</b> #{ENV['QUERY_STRING']}<br />\n"


parsed_query = {}
require 'cgi'
cgi = CGI.new(ENV['QUERY_STRING'])
parsed_query = cgi.params

parsed_query.each do |key, value|
puts "#{key} = #{value[0]}<br/>\n"
end

puts "</body></html>"




