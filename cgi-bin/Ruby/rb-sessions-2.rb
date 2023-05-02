#!/usr/bin/env ruby
require 'cgi'
require 'tempfile'

SESSION_DIR = '/tmp'

def get_session_value(session_id, key)
  session_file = File.join(SESSION_DIR, session_id)
  return nil unless File.exist?(session_file)

  File.open(session_file, 'r') do |f|
    f.each_line do |line|
      k, v = line.chomp.split(':', 2)
      return v if k == key
    end
  end
  nil
end

cgi = CGI.new
session_id = cgi.cookies['CGISESSID'].first || SecureRandom.hex
cookie = CGI::Cookie.new('name' => 'CGISESSID', 'value' => session_id)

username = get_session_value(session_id, 'username')

puts cgi.header('cookie' => cookie)
puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 2</h1>"

if !username.nil? && !username.empty?
    puts "<p><b>Name:</b> #{username}"
else
    puts "<p><b>Name:</b> You do not have a name set</p>"
end

puts "<br/><br/>"
puts "<a href=\"/cgi-bin/Ruby/rb-sessions-1.rb\">Session Page 1</a><br/>"
puts "<a href=\"/cgi-forms/rb-cgiform.html\">Ruby CGI Form</a><br/>"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/Ruby/rb-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"
