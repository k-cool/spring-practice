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
<form action="create" method="post">

    <div class="form-container">
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" name="r_title" placeholder="Enter title">
        </div>

        <div class="form-group">
            <label for="content">Content</label>
            <input type="text" id="content" name="r_txt" placeholder="Enter content">
        </div>

        <button class="submit-btn">Add</button>
    </div>
</form>

</body>
</html>