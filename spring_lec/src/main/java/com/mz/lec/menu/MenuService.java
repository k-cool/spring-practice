package com.mz.lec.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/*
     Service 어노테이션을 등록해주어야 @Autowired 로 끌어다 쓸수 있음.
 */
@Service
public class MenuService {
    // DI(Dependency Injection) - 객체 만들어서 집어 넣어준거.
    @Autowired
    private MenuMapper menuMapper;

    // db -> mybatis(db erver, sql) => .xml(config.xml, mapper.xml)
    public List<MenuVO> selectAllMenu() {
        return menuMapper.selectAll();
    }

    public void deleteMenu(int no) {
        menuMapper.deleteMenu(no);
    }

    public void addMenu(MenuVO menuVO) {
        menuMapper.insertMenu(menuVO);
    }

    public void editMenu(MenuVO menuVO) {
        menuMapper.editMenu(menuVO);
    }

    public MenuVO getMenu(int no) {
        return menuMapper.selectOne(no);
    }

    public void updateMenu(MenuVO menuVO) {
        menuMapper.updateMenu(menuVO);
    }
}
