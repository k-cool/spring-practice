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
<h1>menu page</h1>

<div>
    <c:forEach items="${menus}" var="menu">
        <h2>메뉴명: ${menu.m_name} / 가격: ${menu.m_price}</h2>
        <button onclick="deleteMenu(${menu.m_no})">delete</button>
        <button onclick="updateMenu(${menu.m_no})">update</button>
        <button onclick="location.href='menu/update?no=${menu.m_no}'">update(jsp)</button>
        <button onclick="location.href='menu/detail?no=${menu.m_no}'">detail</button>
        <button onclick="location.href='menu/${menu.m_no}'">detail path</button>
        <button onclick="location.href='menu/json?m_no=${menu.m_no}'">detail json</button>
        <button onclick="location.href='menu/json/all'">detail json</button>
    </c:forEach>
</div>

<script>
    function updateMenu(no) {
        const price = prompt("edit price?");

        location.href = "menu/edit?m_no=" + no + "&m_price=" + price;
    }

    function deleteMenu(no) {
        let ok = confirm("for real??...");

        if (ok) {
            location.href = "menu/delete?no=" + no;
        }
    }
</script>

</body>
</html>