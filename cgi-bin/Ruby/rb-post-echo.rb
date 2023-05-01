#!/usr/bin/ruby
puts "Cache-Control: no-cache\n"
puts "Content-type: text/html \n\n"

puts <<END

<!DOCTYPE html>
<html><head><title>POST Request Echo</title>
</head><body><h1 align="center">POST Request Echo</h1>
<hr>
END

puts "<b>Message Body:</b><br />\n"
puts "<ul>\n"

form_data = STDIN.read
parsed_data = CGI.parse(form_data)

parsed_data.each do |key, value|
puts "<li>#{key} = #{value[0]}</li>\n"
end

puts "</ul>\n"
puts "</body></html>"