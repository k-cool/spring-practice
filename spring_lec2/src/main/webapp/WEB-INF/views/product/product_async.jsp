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

        <div>
            <div>
                <select id="update-select" name="p_no"></select>
            </div>
            <div><input id="update-name" type="text" placeholder="name" name="p_name"></div>
            <div><input id="update-price" type="text" placeholder="price" name="p_price"></div>
            <div>
                <button id="update-btn">update</button>
            </div>
        </div>

        <hr>

        <h1>- product delete -</h1>

        <div>
            <input id="delete-input" type="text" name="no">
            <button id="delete-btn">delete</button>
        </div>

        <hr>

    </div>

    <button id="openModal">Open Modal</button>


    <dialog id="myModal">
        <h2>Product Modal</h2>
        <div>
            <div class="modal-no"></div>
            <div class="modal-name"></div>
            <div class="modal-price"></div>
        </div>
        <button id="closeModal">Close</button>
    </dialog>
</div>
</body>
</html>