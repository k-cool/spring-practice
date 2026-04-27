package com.mz.lec.menu;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MenuMapper {

    @Select("select * from menu_test")
    List<MenuVO> selectAll();

    @Delete("delete menu_test where m_no = #{no}")
    void deleteMenu(int no);

    @Insert("INSERT INTO menu_test VALUES (MENU_TEST_SEQ.nextval, #{m_name}, #{m_price})")
    void insertMenu(MenuVO menuVO);

    @Update("UPDATE menu_test SET m_price = #{m_price} WHERE m_no = #{m_no}")
    void editMenu(MenuVO menuVO);

    @Select("select * from menu_test WHERE m_no=#{no}")
    MenuVO selectOne(int no);

    @Update("UPDATE menu_test SET m_name = #{m_name}, m_price = #{m_price} WHERE m_no = #{m_no}")
    void updateMenu(MenuVO menuVO);
}
