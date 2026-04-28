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
<form action="update" method="post">


    <div class="detail-container">
        <div class="detail-header">
            <h2>Update View</h2>
        </div>

        <div class="detail-group">
            <div class="detail-label">No</div>
            <div class="detail-value">${review.r_no}</div>
        </div>

        <div class="detail-group">
            <div class="detail-label">Title</div>
            <div class="detail-value title"><input value="${review.r_title}" name="r_title"></div>
        </div>

        <div class="detail-group">
            <div class="detail-label">Content</div>
            <div class="detail-value"><input value="${review.r_txt}" name="r_txt"></div>
        </div>

        <div class="detail-group">
            <div class="detail-label">Date</div>
            <div class="detail-value">
                <fmt:formatDate value="${review.r_date}" pattern="yyyy-MM-dd"/>
            </div>
        </div>

        <div class="back-btn">
            <button type="button" onclick="history.back()">Go Back</button>
            <button onclick="location.href='review-update'" name="r_no" value="${review.r_no}">Done
            </button>
            <button type="button" onclick="location.href='all'">List</button>
        </div>
    </div>

</form>
</body>
<script>
    function edit() {

    }

    function deleteReview(pk) {
        let ok = confirm("ok?");
        if (ok) {
            location.href = 'delete?no=' + pk;
        }
    }
</script>

</html>