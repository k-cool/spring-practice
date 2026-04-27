package com.sw.lec.service;

import com.sw.lec.mapper.ProductMapper;
import com.sw.lec.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductS {

    @Autowired
    private ProductMapper productMapper;

    public List<ProductVO> getProducts() {
        return productMapper.selectAll();
    }

    public ProductVO getProduct(int no) {
        return productMapper.selectOne(no);
    }

    public int add(ProductVO product) {
        int row = productMapper.add(product);

        if (row == 1) {
            System.out.println("INSERT SUCCESS");
        }

        return row;
    }

    public int update(ProductVO product) {
        int row = productMapper.update(product);

        if (row == 1) {
            System.out.println("UPDATE SUCCESS");
        }

        return row;
    }

    public int delete(int no) {
        int row = productMapper.delete(no);

        if (row == 1) {
            System.out.println("DELETE SUCCESS");
        }
        
        return row;
    }
}
