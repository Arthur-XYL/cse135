#!/usr/bin/env ruby

require 'json'

puts "Cache-Control: no-cache"
puts "Content-type: application/json\n\n"

date = Time.now.localtime
address = ENV['REMOTE_ADDR']

message = {
  title: 'Hello, Ruby!',
  heading: 'Hello, Ruby!',
  message: 'This page was generated with the Ruby programming language',
  time: date,
  IP: address
}

json = JSON.generate(message)
puts json
