package com.sw.lec.controller;

import com.sw.lec.service.ProductS;
import com.sw.lec.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
    동일 URL 다른 METHOD 요청방식
   -> GET, POST, PUT, DELETE ...
*/

@RestController
@RequestMapping("/api/product")
public class ProductAPIC {

    @Autowired
    ProductS productS;

    @GetMapping("/all")
    public List<ProductVO> getAll() {
        return productS.getProducts();
    }

    @PostMapping
    public int addProduct(@RequestBody ProductVO productVO) {
        return productS.add(productVO);
    }

    @DeleteMapping("/{pk}")
    public int deleteProduct(@PathVariable int pk) {
        return productS.delete(pk);
    }

    @PutMapping("/{pk}")
    public int updateProduct(@PathVariable int pk, @RequestBody ProductVO productVO) {
        return productS.update(productVO);
    }
}
