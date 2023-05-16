package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface StockRepository extends JpaRepository<StockEntity, Long> {

    StockEntity findByProduct(ProductEntity product);

    Long countBy();
}
