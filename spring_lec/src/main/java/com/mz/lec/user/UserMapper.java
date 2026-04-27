package com.mz.lec.user;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM LOGIN_TEST")
    List<UserVO> selectAll();

    @Delete("DELETE LOGIN_TEST WHERE l_id = #{id}")
    void deleteUser(String id);

    @Insert("INSERT INTO LOGIN_TEST VALUES (#{l_id}, #{l_name}, #{l_pw})")
    void insertUser(UserVO userVO);

    @Select("SELECT * FROM LOGIN_TEST WHERE l_id = #{id}")
    UserVO selectOne(String id);
}
