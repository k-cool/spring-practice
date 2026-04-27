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
<h1>mypage</h1>


<div>
    <h3>user</h3>
    <div>id: ${user.l_id}</div>
    <div>name: ${user.l_name}</div>
    <div>pw: ${user.l_pw}</div>
</div>

<hr>

${user}

<div>
    <h3>userVO</h3>
    <div>id: ${userVO.l_id}</div>
    <div>name: ${userVO.l_name}</div>
    <div>pw: ${userVO.l_pw}</div>
</div>

<hr>

${userVO}

</body>
</html>