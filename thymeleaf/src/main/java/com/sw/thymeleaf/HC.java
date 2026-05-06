package com.sw.thymeleaf;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HC {

    @GetMapping
    public String hc(Model model) {
        model.addAttribute("title", "HC");
        model.addAttribute("a", "<a href='https://www.google.com'> 링크 </a>");
        model.addAttribute("b", "차이점 <b> 확인 </b>");

        model.addAttribute("name", "sw");
        model.addAttribute("age", "10");

        return "index";
    }
}
