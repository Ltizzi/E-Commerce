package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.cart.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
}
