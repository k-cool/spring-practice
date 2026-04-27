<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Products</title>
    <link rel="stylesheet" href="/resources/css/product.css">
    <script src="/resources/js/product.js" defer></script>
</head>
<body>

<div>

    <h1>- product reg -</h1>
    <div>
        name: <input id="name-input" type="text" name="p_name">
        price: <input id="price-input" type="text" name="p_price">
        <button id="add-btn">add</button>
    </div>

    <hr>

    <h1>- product list -</h1>
    <div>
        <div class="item">
            <div>no.</div>
            <div>name</div>
            <div>price</div>
        </div>

        <%--첨부하길 원하는 템플릿--%>
        <div class="item temp">
            <div class="no"></div>
            <div class="name"></div>
            <div class="price"></div>
            <div class="delete">
                <button>del</button>
            </div>
        </div>

        <div id="product-list"></div>

        <h1>- product update -</h1>

        <form action="/product/update" method="post">
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

        <form action="/product/delete">
            <input type="text" name="no">
            <button>delete</button>
        </form>

        <hr>

    </div>

</body>
</html>