<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/resources/css/review.css">
</head>
<body>

<div class="board-container">
    <div style="position: relative; height: 50px">
        <button class="add-btn" onclick="location.href='/review/create'">write</button> </div>
    <div class="board-header">
        <div class="header-item">No</div>
        <div class="header-item">Title</div>
        <div class="header-item">Date</div>
    </div>
<c:forEach items="${reviews}" var="r" varStatus="st">
        <div class="board-row">
        <div class="board-item">${st.count}</div>
        <div class="board-item"><span onclick="location.href='/review/detail?no=${r.r_no}'">${r.r_title} [동기]</span>
       <span onclick="location.href='/review/detail2?no=${r.r_no}'">${r.r_title} [비동기]</span></div>
        <div class="board-item"> <fmt:formatDate value="${r.r_date}" /> </div>
    </div>
</c:forEach>
</div>
</body>
</html>