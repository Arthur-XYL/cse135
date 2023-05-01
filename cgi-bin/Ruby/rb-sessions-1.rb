#!/usr/bin/ruby

require 'cgi'
require 'cgi/session'

session = CGI::Session.new(CGI.new, :session_key => 'cgisessid', :session_expires => Time.now + 3600, :database_manager => CGI::Session::FileStore, :tmpdir => '/tmp')

cgi = CGI.new

cookie = CGI::Cookie.new('name' => 'CGISESSID', 'value' => session.session_id, 'expires' => Time.now + 3600)
puts cgi.header('cookie' => cookie)

name = session['username'] || cgi.params['username']
session['username'] = name

puts "Cache-Control: no-cache\n"
puts "Content-type: text/html \n\n"

puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 1</h1>"

if name
  puts "<p><b>Name:</b> #{name}"
else
  puts "<p><b>Name:</b> You do not have a name set</p>"
end

puts "<br/><br/>"
puts "<a href=\"/cgi-bin/Ruby/rb-sessions-2.rb\">Session Page 2</a><br/>"
puts "<a href=\"/cgi-forms/rb-cgiform.html\">Ruby CGI Form</a><br />"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/Ruby/rb-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"
