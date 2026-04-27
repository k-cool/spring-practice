package com.sw.lec.controller;

import com.sw.lec.service.ProductS;
import com.sw.lec.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductC {

    /*
        url 이쁘게 만들자

        /product/all
        /product/detail
        /product/create
        /product/update
        /product/delete

    */

    @Autowired
    private ProductS productS;

    @GetMapping("/all")
    public String getAll(Model model) {

        List<ProductVO> products = productS.getProducts();

        model.addAttribute("products", products);

        return "product/products";
    }

    @GetMapping("/detail/{no}")
    public String getAll(@PathVariable int no, Model model) {

        ProductVO product = productS.getProduct(no);

        model.addAttribute("product", product);

        return "product/detail";
    }

    @PostMapping("/create")
    public String create(@ModelAttribute ProductVO product) {

        productS.add(product);

        return "redirect:/product/all";
    }

    @PostMapping("/update")
    public String update(@ModelAttribute ProductVO product) {

        productS.update(product);

        System.out.println(product);

        return "redirect:/product/detail/" + product.getP_no();
    }

    @GetMapping("/delete/{no}")
    public String deleteByPath(@PathVariable() int no) {

        productS.delete(no);

        return "redirect:/product/all";
    }

    @GetMapping("/delete")
    public String deleteByQuery(@RequestParam() int no) {
        
        productS.delete(no);

        return "redirect:/product/all";
    }
}
