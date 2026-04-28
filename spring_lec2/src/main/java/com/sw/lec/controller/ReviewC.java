package com.sw.lec.controller;

import com.sw.lec.service.ReviewS;
import com.sw.lec.vo.ProductVO;
import com.sw.lec.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewC {

    @Autowired
    private ReviewS reviewS;

    @GetMapping("/all")
    public String getAll(Model model) {
        List<ReviewVO> reviews = reviewS.getReviews();
        model.addAttribute("reviews", reviews);
        return "review/reviews";
    }

    @GetMapping("/detail")
    public String getReviewDetail(@RequestParam int no, Model model) {
        ReviewVO review = reviewS.getReview(no);
        model.addAttribute("review", review);
        return "review/review_detail";
    }

    @GetMapping("/detail2")
    public String getReviewDetail2(@RequestParam int no, Model model) {
        ReviewVO review = reviewS.getReview(no);
        model.addAttribute("review", review);
        return "review/review_detail2";
    }

    @GetMapping("/create")
    public String create(Model model) {
        return "review/review_add";
    }

    @PostMapping("/create")
    public String createReview(@ModelAttribute ReviewVO review) {
        reviewS.add(review);
        return "redirect:/review/all";
    }

    @GetMapping("/update")
    public String update(@RequestParam int no, Model model) {
        reviewS.getReview(no);
        model.addAttribute("review", reviewS.getReview(no));
        return "review/review_update";
    }

    @PostMapping("/update")
    public String updateReview(@ModelAttribute ReviewVO review) {
        reviewS.updateReview(review);
        return "redirect:/review/detail?no=" + review.getR_no();
    }

    @GetMapping("/delete")
    public String delete(@RequestParam int no) {
        reviewS.deleteReview(no);
        return "redirect:/review/all";
    }

}
