<%@ page import="org.json.JSONObject" %>
<%
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("title", "Hello, JSP!");
    jsonObject.put("message", "This page was generated with the JSP programming language");
    jsonObject.put("time", new java.util.Date());
    jsonObject.put("ip", request.getRemoteAddr());
    jsonObject.put("heading", "Hello, JSP!");
    out.print(jsonObject);
%>