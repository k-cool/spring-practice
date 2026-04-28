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

<div class="detail-container">
    <div class="detail-header">
        <h2>Detail View2</h2>
    </div>

    <div class="detail-group">
        <div class="detail-label">No</div>
        <div class="detail-value" id="pk" data-no="${review.r_no}">${review.r_no}

        </div>
    </div>

    <div class="detail-group">
        <div class="detail-label">Title</div>
        <div class="detail-value detail show">${review.r_title}</div>
        <div class="detail-value edit"><input maxlength="20" type="text" name="title" value="${review.r_title}"></div>
    </div>

    <div class="detail-group">
        <div class="detail-label">Content</div>
        <div class="detail-value detail show">${review.r_txt}</div>
        <div class="detail-value edit"><input type="text" name="txt" value="${review.r_txt}"></div>
    </div>

    <div class="detail-group">
        <div class="detail-label">Date</div>
        <div class="detail-value">
            <fmt:formatDate value="${review.r_date}" pattern="yyyy-MM-dd"/>
        </div>
    </div>

    <div class="back-btn">
        <span class="detail-btns show">
            <button onclick="history.back()">Go Back</button>
            <button  onclick="edit()">Update</button>
            <button onclick="deleteReview('${param.no}')">Delete</button>
            <button onclick="location.href='all'">List</button>
        </span>
        <span class="edit-btns">
             <button onclick="editReq();">Done</button>
             <button onclick="edit()">Cancel</button>
            <button onclick="location.href='all'">List</button>
        </span>
    </div>
</div>


</body>
<script>
    let editFlag = false;

    function edit() {
        editFlag = !editFlag;
        const details = document.querySelectorAll('.detail');
        const edits = document.querySelectorAll('.edit');
        const detailBtns = document.querySelector(".detail-btns");
        const editBtns = document.querySelector(".edit-btns");

        if (editFlag) {
            details.forEach((element) => {
                element.classList.remove('show');
            })
            edits.forEach((element) => {
                element.classList.add('show');
            })
            detailBtns.classList.remove('show');
            editBtns.classList.add('show');
        } else {
            details.forEach((element) => {
                element.classList.add('show');
            })
            edits.forEach((element) => {
                element.classList.remove('show');
            })
            detailBtns.classList.add('show');
            editBtns.classList.remove('show');
        }


    }

    function editReq() {
        const pkDiv = document.querySelector("#pk").dataset;
        const titleVal = document.querySelector("input[name='title']").value;
        const txtVal = document.querySelector("input[name='txt']").value;
        console.log(pkDiv);
        console.log(pkDiv.no);
        let url = 'api/update?r_no='+pkDiv.no+'&r_title='+titleVal+'&r_txt='+txtVal;
        console.log(url)
        fetch(url,{
            method : "POST",
        }).then(response => response.json()) // 응답을 JSON 형식으로 처리
            .then(data => {
                console.log(data);
               if (data){
                   edit();
                 document.querySelectorAll(".detail")[0].innerText=titleVal;
                 document.querySelectorAll(".detail")[1].innerText=txtVal;
               }
            })
    }
    
    
    function deleteReview(pk) {
        let ok = confirm("ok?");
        if (ok) {
            location.href = 'delete?no=' + pk;
        }
    }
</script>

</html>