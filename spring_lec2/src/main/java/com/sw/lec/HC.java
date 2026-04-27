package com.sw.lec;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HC {

    @GetMapping("/")
    public String getMainPage() {
        System.out.println("main");
        return "index";
    }

    @GetMapping("/api/product")
    public String getProductAsync() {
        return "product/product_async";
    }

}
