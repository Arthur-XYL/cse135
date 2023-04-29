<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Hello JSP</title>
</head>
<body>
    <h1>Hello, JSP!</h1>
    <p>Today is <%= new java.util.Date() %></p>
</body>
</html>
<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Hello JSP World</title>
</head>
<body>
	<h1>Hello Ruoqian JSP World</h1>
	<hr/>
	
	<%
		java.util.Date currentDate = new java.util.Date();
		
		out.println("Hello World<br/>");
		
		out.println("This program was generated at: " + currentDate + "<br/>");
		
		out.println("Your current IP address is: " + request.getRemoteAddr() + "<br/>");
	%>
	
</body>
</html>
 -->
