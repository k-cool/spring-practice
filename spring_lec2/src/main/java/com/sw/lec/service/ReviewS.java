package com.sw.lec.service;

import com.sw.lec.mapper.ReviewMapper;
import com.sw.lec.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReviewS {

    @Autowired
    private ReviewMapper reviewMapper;

    public List<ReviewVO> getReviews() {
        return reviewMapper.selectAll();
    }

    public ReviewVO getReview(int no) {
        return reviewMapper.selectOne(no);
    }

    public int add(ReviewVO review) {
        Date now = new Date();

        review.setR_date(now);

        int row = reviewMapper.add(review);

        if (row == 1) {
            System.out.println("INSERT SUCCESS");
        }

        return row;
    }

    public int updateReview(ReviewVO review) {
        int row = reviewMapper.update(review);

        if (row == 1) {
            System.out.println("UPDATE SUCCESS");
        }

        return row;
    }

    public int deleteReview(int no) {
        int row = reviewMapper.delete(no);

        if (row == 1) {
            System.out.println("DELETE SUCCESS");
        }

        return row;
    }
}
