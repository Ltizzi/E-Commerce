package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.model.product.ProductRequest;
import com.ltizzi.ecommerce.model.productType.ProductTypeEntity;
import com.ltizzi.ecommerce.model.productType.ProductTypeMapper;
import com.ltizzi.ecommerce.model.productType.ProductTypeRequest;
import com.ltizzi.ecommerce.model.productType.ProductTypeResponse;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.repository.ProductTypeRepository;
import com.ltizzi.ecommerce.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    @Autowired
    private ProductTypeRepository typeRepo;

    @Autowired
    private ProductTypeMapper typeMapper;


    @Override
    public List<ProductTypeResponse> getProductTypes() {
        return typeMapper.toArrayProductTypeResponse(typeRepo.findAll());
    }

    @Override
    public CountTable countTypes() {
        long totalTypes = typeRepo.countBy();
        return new CountTable((int) totalTypes);
    }

    @Override
    public ProductTypeResponse getProductTypeById(Long id) {
        return typeMapper.toProductTypeResponse(typeRepo.findById(id).orElseThrow());
    }

    @Override
    public ProductTypeResponse saveProductType(ProductTypeRequest prodReq) {
        ProductTypeEntity product = typeRepo.save(typeMapper.toProductTypeEntity(prodReq));
        return typeMapper.toProductTypeResponse(product);
    }

    @Override
    public void deleteProductTypeById(Long id) {
        typeRepo.deleteById(id);
    }

    @Override
    public ProductTypeResponse updateProductType(Long type_id, ProductTypeRequest typeReq) {
        ProductTypeEntity type = typeRepo.findById(type_id).orElseThrow();
        type.setName(typeReq.getName());
        type = typeRepo.save(type);
        return typeMapper.toProductTypeResponse(type);
    }
}
