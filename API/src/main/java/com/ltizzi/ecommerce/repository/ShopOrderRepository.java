package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderEntity;
import com.ltizzi.ecommerce.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface ShopOrderRepository extends JpaRepository<ShopOrderEntity, Long> {

    List<ShopOrderEntity> findByUser(UserEntity user);
}
