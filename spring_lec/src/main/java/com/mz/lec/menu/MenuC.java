package com.mz.lec.menu;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/menu")
@Controller
public class MenuC {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public String menu(Model model) {
        // db 에서 메뉴 테이블 전체조회
        List<MenuVO> menus = menuService.selectAllMenu();

        System.out.println(menus);

        model.addAttribute("menus", menus);

        return "select";
    }

//    @PostMapping("/menu")
//    public String addMenu(@RequestParam() String m_name, @RequestParam() int m_price) {
//        System.out.println(m_name);
//        System.out.println(m_price);
//        return "index";
//    }

    @PostMapping
    public String addMenu(@ModelAttribute MenuVO menuVO) {
        System.out.println(menuVO);

        menuService.addMenu(menuVO);

        return "redirect:/menu";
    }

    @GetMapping("/delete")
    public String deleteMenu(@RequestParam int no) {
        System.out.println(no);

        menuService.deleteMenu(no);

        return "redirect:/";
    }

    @GetMapping("/edit")
    public String editMenu(@ModelAttribute MenuVO menuVO) {
        System.out.println(menuVO);

        menuService.editMenu(menuVO);

        return "redirect:/menu";
    }

    @GetMapping("/detail")
    public String detailMenu(@RequestParam int no, Model model) {
        MenuVO menu = menuService.getMenu(no);

        model.addAttribute("menu", menu);

        return "detail";
    }

    @GetMapping("/{id}")
    public String detailMenuPath(@PathVariable int id, Model model) {
        MenuVO menu = menuService.getMenu(id);

        model.addAttribute("menu", menu);

        return "detail";
    }

    @GetMapping("/update")
    public String updateMenu(@RequestParam int no, Model model) {
        MenuVO menu = menuService.getMenu(no);

        model.addAttribute("menu", menu);

        return "update";
    }

    @PostMapping("/update")
    public String updateMenu(@ModelAttribute MenuVO menuVO) {
        menuService.updateMenu(menuVO);

        return "redirect:/menu/detail?no=" + menuVO.getM_no();
    }

    @GetMapping("/json")
    @ResponseBody
    public MenuVO jsonMenu(@RequestParam int m_no) {
        return menuService.getMenu(m_no);
    }

    @GetMapping("/json/all")
    @ResponseBody
    public List<MenuVO> jsonMenuAll() {
        return menuService.selectAllMenu();
    }

}
