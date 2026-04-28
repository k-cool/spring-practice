package com.sw.lec.mapper;

import com.sw.lec.vo.ReviewVO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ReviewMapper {

    @Select("SELECT * FROM REVIEW_TEST ORDER BY r_no")
    List<ReviewVO> selectAll();

    @Select("SELECT * FROM REVIEW_TEST WHERE r_no = #{no}")
    ReviewVO selectOne(int no);

    @Insert("INSERT INTO REVIEW_TEST VALUES (review_test_seq.nextval, #{r_title}, #{r_txt}")
    int add(ReviewVO review);

    @Update("UPDATE REVIEW_TEST SET r_title = #{r_title}, r_txt = #{r_txt} WHERE r_no = #{r_no}")
    int update(ReviewVO review);

    @Delete("DELETE REVIEW_TEST WHERE r_no = #{no}")
    int delete(int no);
}
