<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>user list</h1>

<form action="user" method="post">
    <input type="text" name="l_id">
    <input type="text" name="l_name">
    <input type="text" name="l_pw">
    <button>sign up</button>
</form>


<div>
    <c:forEach items="${users}" var="user">
        <h2>ID: ${user.l_id} NAME: ${user.l_name} / PW: ${user.l_pw}</h2>
        <button onclick="location.href='/user/delete?id=${user.l_id}'">delete</button>
        <button onclick="location.href='/user/${user.l_id}'">mypage</button>
        <button onclick="location.href='/user/detail?l_id=${user.l_id}&l_pw=${user.l_pw}&l_name=${user.l_name}'">mypage2
        </button>
    </c:forEach>
</div>

</body>
</html>