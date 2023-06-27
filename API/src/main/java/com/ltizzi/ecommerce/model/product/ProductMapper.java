package com.ltizzi.ecommerce.model.product;

import com.ltizzi.ecommerce.model.productType.ProductTypeMapper;
import com.ltizzi.ecommerce.model.productType.ProductTypeResponse;
import com.ltizzi.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ProductMapper {

    @Autowired
    private ProductTypeMapper prodTypeMapper;

    @Autowired
    private ProductRepository prodRepo;


    public ProductResponse toProductResponse(ProductEntity prod) {
        ProductResponse prodRes = new ProductResponse();
        prodRes.setId(prod.getProduct_id());
        prodRes.setName(prod.getName());
        prodRes.setBrand(prod.getBrand());
        prodRes.setAbout(prod.getAbout());
        prodRes.setPrice(prod.getPrice());
        prodRes.setImageUrl(prod.getImageUrl());
        ProductTypeResponse prodType = prodTypeMapper.toProductTypeResponse(prod.getProduct_type());
        prodRes.setProd_type(prodType);
        return prodRes;
    }

    public ProductEntity toProductEntity(ProductRequest prodReq) {
        ProductEntity product = new ProductEntity();
        if (prodReq.getId() != null) {
            product = prodRepo.findById(prodReq.getId()).orElse(null);
            assert product != null;
            product.setProduct_id(prodReq.getId());
        }
        product.setName(prodReq.getName());
        product.setBrand(prodReq.getBrand());
        product.setPrice(prodReq.getPrice());
        product.setAbout(prodReq.getAbout());
        product.setImageUrl(prodReq.getImageUrl());
        product.setProduct_type(prodTypeMapper.toProductTypeEntity(prodReq.getProd_type()));

        return product;
    }

    public ProductEntity toProductEntity(ProductResponse prodRes) {
        ProductEntity product = new ProductEntity();
        if (prodRes.getId() != null) {
            product = prodRepo.findById(product.getProduct_id()).orElse(null);
            assert product != null;
            product.setProduct_id(prodRes.getId());
        }
        product.setName(prodRes.getName());
        product.setBrand(prodRes.getBrand());
        product.setPrice(prodRes.getPrice());
        product.setAbout(prodRes.getAbout());
        product.setImageUrl(prodRes.getImageUrl());
        product.setProduct_type(prodTypeMapper.toProductTypeEntity(prodRes.getProd_type()));
        return product;
    }

    public List<ProductResponse> toArrayProductResponse(List<ProductEntity> products) {
        List<ProductResponse> prodsRes = new ArrayList<>();
        products.forEach(prod -> {
            prodsRes.add(toProductResponse(prod));
        });
        return prodsRes;
    }
}
