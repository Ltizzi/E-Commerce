package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface ShopOrderRepository extends JpaRepository<ShopOrderEntity, Long> {
}
