package com.mz.lec;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HC {

    @GetMapping("/test")
    public String test() {
        System.out.println("test");
        return "index"; // forward
    }

    @GetMapping("/")
    public String aaaaaaaaaaaaa() {
        System.out.println("aaaaaaa");
        return "index";
    }

    @GetMapping("/qq")
    public String aaaaaaaaaaaaa(@RequestParam int a) {
    System.out.println("qqq");
        System.out.println(a - 2);
        return "index";
    }

}
