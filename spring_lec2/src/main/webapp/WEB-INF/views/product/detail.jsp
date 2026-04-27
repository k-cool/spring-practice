<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product | ${product.p_name}</title>
</head>
<body>

<h2>ID: ${product.p_no} / NAME: ${product.p_name} / PRICE: ${product.p_price}</h2>

<form action="/product/update" method="post">
    <div>
        <div><input type="text" name="p_no" value="${product.p_no}" hidden></div>
        <div><input type="text" placeholder="name" name="p_name" value="${product.p_name}"></div>
        <div><input type="text" placeholder="price" name="p_price" value="${product.p_price}"></div>
        <div>
            <button type="button" onclick="location.href = '/product/all'">list</button>
            <button>update</button>
        </div>
    </div>
</form>

</body>
</html>