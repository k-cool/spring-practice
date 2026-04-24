package com.mz.lec;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MenuC {

    @GetMapping("/menu")
    public String menu() {
        return "index";
    }

//    @PostMapping("/menu")
//    public String addMenu(@RequestParam String name, @RequestParam int price) {
//        System.out.println(name);
//        System.out.println(price);
//        return "index";
//    }
    @PostMapping("/menu")
    public String addMenu(@ModelAttribute MenuVO menuVO) {
        System.out.println(menuVO);

        return "index";
    }


}
