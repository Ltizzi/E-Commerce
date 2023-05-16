package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.productType.ProductTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductTypeEntity, Long> {

    Long countBy();
}
