package com.sw.lec.controller;

import com.sw.lec.service.ProductS;
import com.sw.lec.vo.ProductVO;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/products")
public class ProductC2 {

    /*

        url 이쁘게 만들자

        /product/all
        /product/detail
        /product/create
        /product/update
        /product/delete

        REST API

        GET /products
        GET /products/{id}
        POST /products/{id}
        PUT /products/{id}
        DELETE /products/{id}


    */

    @Autowired
    private ProductS productS;

    @GetMapping
    public String getAll(Model model) {
        model.addAttribute("products", productS.getProducts());
        return "product/products2";
    }

    @GetMapping("/{id}")
    public String getProduct(@PathVariable int id, Model model) {
        model.addAttribute("product", productS.getProduct(id));
        return "product/detail";
    }

    @PostMapping
    public String createProduct(ProductVO productVO) {
        productS.add(productVO);
        return "redirect:/products";
    }

    @DeleteMapping
    public String deleteProduct(@RequestParam int no) {
        System.out.println("delete product " + no);
        productS.delete(no);
        return "redirect:/products";
    }

    @PutMapping
    public String updateProduct(ProductVO productVO) {
        System.out.println("update product " + productVO);
        productS.update(productVO);
        return "redirect:/products";
    }

    @GetMapping("/json/{id}")
    @ResponseBody
    public ProductVO getProductJSON(@PathVariable int id) {
        return productS.getProduct(id);
    }
}
