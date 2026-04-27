<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Products</title>
    <link rel="stylesheet" href="/resources/css/product.css">
</head>
<body>


<div>

    <%--    <c:forEach items="${products}" var="product">--%>
    <%--        <h2>NO: ${product.p_no} NAME: ${product.p_name} / PRICE: ${product.p_price}</h2>--%>
    <%--        <button onclick="location.href='detail/${product.p_no}'">detail</button>--%>
    <%--    </c:forEach>--%>

    <h1>- product reg -</h1>
    <form action="/products" method="post">
        name: <input type="text" name="p_name">
        price: <input type="text" name="p_price">
        <button>add</button>
    </form>

    <hr>

    <h1>- product list -</h1>
    <div>
        <div class="item">
            <div>no.</div>
            <div>name</div>
            <div>price</div>
        </div>

        <c:forEach items="${products}" var="p">
            <div class="item">
                <div>${p.p_no}</div>
                <div>${p.p_name}</div>
                <div>${p.p_price}</div>
                <div style="display: flex; align-items: center">
                    <div>
                        <button onclick="location.href='/products/${p.p_no}'">detail</button>
                    </div>

                    <div>
                        <form action="/products" method="post">
                            <input hidden name="_method" value="delete">
                            <input hidden name="no" value="${p.p_no}">
                            <button onclick="location.href='/products/${p.p_no}'">del</button>
                        </form>
                    </div>

                    <div>
                        <button onclick="location.href='/products/json/${p.p_no}'">get JSON</button>
                    </div>
                </div>
            </div>
        </c:forEach>

        <h1>- product update -</h1>

        <form action="/products" method="post">
            <input hidden name="_method" value="put">
            <div>
                <div>
                    <select name="p_no">
                        <c:forEach items="${products}" var="p">
                            <option value="${p.p_no}">no. ${p.p_no}</option>
                        </c:forEach>
                    </select>
                </div>
                <div><input type="text" placeholder="name" name="p_name"></div>
                <div><input type="text" placeholder="price" name="p_price"></div>
                <div>
                    <button>update</button>
                </div>
            </div>
        </form>

        <hr>

        <h1>- product delete -</h1>

        <form action="/products" method="post">
            <input hidden name="_method" value="delete">
            <input type="text" name="no">
            <button>delete</button>
        </form>

        <hr>

    </div>

</body>
</html>