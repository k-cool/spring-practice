<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update | ${product.p_name} </title>
</head>
<body>

<div>
    <h2>ID: ${product.p_no} NAME: ${product.p_name} / PW: ${product.p_price}</h2>

    <input type="text" name="p_no" value="${product.p_no}" hidden>
    <input type="text" name="p_name" value="${product.p_name}">
    <input type="text" name="p_price" value="${product.p_price}">
</div>

</body>
</html>