<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
	<title>Hello World</title>
</head>
<body>
	<h1>Hello World!</h1>
    <p>This page was generated with the JSP programming language.</p>
	<p>Current Time: <%= new java.util.Date() %></p>
	<p>User's IP address: <%= request.getRemoteAddr() %></p>
</body>
</html>
