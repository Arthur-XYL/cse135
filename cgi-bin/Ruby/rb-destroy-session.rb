#!/usr/bin/env ruby

require 'cgi'

SESSION_DIR = '/tmp'

def delete_session(session_id)
  session_file = File.join(SESSION_DIR, session_id)
  File.delete(session_file) if File.exist?(session_file)
end

cgi = CGI.new
session_id = cgi.cookies['CGISESSID'].first

delete_session(session_id) if session_id

cookie = CGI::Cookie.new('name' => 'CGISESSID', 'value' => '', 'expires' => Time.now - 3600)

puts cgi.header('cookie' => cookie)
puts "<html>"
puts "<head>"
puts "<title>Ruby Session Destroyed</title>"
puts "</head>"
puts "<body>"
puts "<h1>Session Destroyed</h1>"
puts "<a href=\"/cgi-forms/rb-cgiform.html\">Back to the Ruby CGI Form</a><br />"
puts "<a href=\"/cgi-bin/Ruby/rb-sessions-1.rb\">Back to Page 1</a><br />"
puts "<a href=\"/cgi-bin/Ruby/rb-sessions-2.rb\">Back to Page 2</a>"
puts "</body>"
puts "</html>"


