package com.sw.lec.mapper;

import com.sw.lec.vo.ProductVO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductMapper {

    /*

        Mybatis의 쿼리실행 반환값
        - 여러개 -> List<VO>
        - 한개 -> VO
        - c,u,d -> int

    */

    @Select("SELECT * FROM PRODUCT_TEST2 ORDER BY p_no")
    List<ProductVO> selectAll();

    @Select("SELECT * FROM PRODUCT_TEST2 WHERE p_no = #{no}")
    ProductVO selectOne(int no);

    @Insert("INSERT INTO PRODUCT_TEST2 VALUES (product_test2_seq.nextval, #{p_name}, #{p_price} )")
    int add(ProductVO product);

    @Update("UPDATE PRODUCT_TEST2 SET p_name = #{p_name}, p_price = #{p_price} WHERE p_no = #{p_no}")
    int update(ProductVO product);

    @Delete("DELETE PRODUCT_TEST2 WHERE p_no = #{no}")
    int delete(int no);
}
