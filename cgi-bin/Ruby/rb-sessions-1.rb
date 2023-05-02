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

def set_session_value(session_id, key, value)
  session_file = File.join(SESSION_DIR, session_id)
  data = []
  data << "#{key}:#{value}"
  File.open(session_file, 'a') do |f|
    f.puts data.join("\n")
  end
end

cgi = CGI.new
session_id = cgi.cookies['CGISESSID'].first || SecureRandom.hex
cookie = CGI::Cookie.new('name' => 'CGISESSID', 'value' => session_id)

username_param = cgi.params['username'].first

if !get_session_value(session_id, 'username') && !username_param.nil? && !username_param.empty?
  set_session_value(session_id, 'username', username_param)
end

username = get_session_value(session_id, 'username')

puts cgi.header('cookie' => cookie)
puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 1</h1>"

if !username.nil? && !username.empty?
    puts "<p><b>Name:</b> #{username}"
else
    puts "<p><b>Name:</b> You do not have a name set</p>"
end

puts "<br/><br/>"
puts "<a href=\"/cgi-bin/Ruby/rb-sessions-2.rb\">Session Page 2</a><br/>"
puts "<a href=\"/cgi-forms/rb-cgiform.html\">Ruby CGI Form</a><br/>"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/Ruby/rb-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"






# #!/usr/bin/env ruby
# require 'cgi'
# require 'cgi/session'

# # Create a new Ruby Session
# session = CGI::Session.new(CGI.new, :session_key => 'CGISESSID', :session_expires => Time.now + 3600, :tmpdir => '/tmp')

# # Create a new Cookie from the Session ID
# cookie = CGI::Cookie.new('name' => 'CGISESSID', 'value' => session.session_id)

# #Store Data in that Ruby Session
# name = session['username'] || CGI.new['username']
# session['username'] = name

# puts CGI.new.header('cookie' => cookie)
# puts "<html>"
# puts "<head>"
# puts "<title>Ruby Sessions</title>"
# puts "</head>"
# puts "<body>"

# puts "<h1>Ruby Sessions Page 1</h1>"

# if name
#     puts "<p><b>Name:</b> #{name}"
# else
#     puts "<p><b>Name:</b> You do not have a name set</p>"
# end

# puts "<br/><br/>"
# puts "<a href=\"/cgi-bin/Ruby/rb-sessions-2.rb\">Session Page 2</a><br/>"
# puts "<a href=\"/cgi-forms/rb-cgiform.html\">Ruby CGI Form</a><br/>"
# puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/Ruby/rb-destroy-session.rb\" method=\"get\">"
# puts "<button type=\"submit\">Destroy Session</button>"
# puts "</form>"

# puts "</body>"
# puts "</html>"
