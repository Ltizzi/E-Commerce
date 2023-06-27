package com.ltizzi.ecommerce.model.productType;

import com.ltizzi.ecommerce.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class ProductTypeMapper {

    @Autowired
    private ProductTypeRepository typeRepo;

    public ProductTypeResponse toProductTypeResponse(ProductTypeEntity tipo) {
        ProductTypeResponse productType = new ProductTypeResponse();
        productType.setId(tipo.getProd_type_id());
        productType.setName(tipo.getName());
        return productType;
    }

    public ProductTypeEntity toProductTypeEntity(ProductTypeRequest typeReq) {
        ProductTypeEntity type = new ProductTypeEntity();
        if (typeReq.getId() != null) {
            type = typeRepo.findById(typeReq.getId()).orElse(null);
            assert type != null;
            type.setProd_type_id(typeReq.getId());
        }
        type.setName(typeReq.getName());
        return type;
    }

    public ProductTypeEntity toProductTypeEntity(ProductTypeResponse typeRes) {
        ProductTypeEntity type = new ProductTypeEntity();
        if (typeRes.getId() != null) {
            type = typeRepo.findById(typeRes.getId()).get();
            assert type != null;
            type.setProd_type_id(typeRes.getId());
        }
        type.setName(typeRes.getName());
        return type;
    }

    public List<ProductTypeResponse> toArrayProductTypeResponse(List<ProductTypeEntity> tipos) {
        List<ProductTypeResponse> tiposRes = new ArrayList<>();
        tipos.forEach(tipo -> {
            tiposRes.add(toProductTypeResponse(tipo));
        });
        return tiposRes;
    }

    public List<ProductTypeEntity> toArrayProductTypeEntity(List<ProductTypeRequest> tiposReq) {
        List<ProductTypeEntity> tipos = new ArrayList<>();
        tiposReq.forEach(req -> {
            tipos.add(toProductTypeEntity(req));
        });
        return tipos;
    }
}
