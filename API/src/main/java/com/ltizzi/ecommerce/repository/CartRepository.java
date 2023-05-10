package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {

    ArrayList<CartEntity> findByUser(UserEntity user);
}
