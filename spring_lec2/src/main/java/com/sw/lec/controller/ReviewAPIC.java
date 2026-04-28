package com.sw.lec.controller;

import com.sw.lec.service.ReviewS;
import com.sw.lec.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review/api")
public class ReviewAPIC {

    @Autowired
    ReviewS reviewS;

    @PostMapping("/update")
    public ReviewVO update(@RequestParam int r_no, @RequestParam String r_title, @RequestParam String r_txt) {
        ReviewVO review = new ReviewVO();
        review.setR_no(r_no);
        review.setR_title(r_title);
        review.setR_txt(r_txt);
        reviewS.updateReview(review);
        return review;
    }
}
