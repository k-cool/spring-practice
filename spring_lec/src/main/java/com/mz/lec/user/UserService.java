package com.mz.lec.user;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<UserVO> getAllUser() {
        return userMapper.selectAll();
    }

    public void deleteUser(String id) {
        userMapper.deleteUser(id);
    }

    public void insertUser(UserVO userVO) {
        userMapper.insertUser(userVO);
    }

    public UserVO getUser(String id) {
        return userMapper.selectOne(id);
    }
}
