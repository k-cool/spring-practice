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
<h1>menu detail page</h1>

<form action="/menu/update" method="post">
    <div>
        <div>No. ${menu.m_no}</div>
        <input type="text" name="m_no" value="${menu.m_no}" hidden>
        <div>Name. <input type="text" name="m_name" value="${menu.m_name}"></div>
        <div>Price. <input type="text" name="m_price" value="${menu.m_price}"></div>

        <div>
            <button>done</button>
        </div>
    </div>
</form>

<script>

</script>

</body>
</html>