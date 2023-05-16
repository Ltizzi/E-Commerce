package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.purchase.PurchaseEntity;
import com.ltizzi.ecommerce.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Long>, PagingAndSortingRepository<PurchaseEntity, Long> {

    List<PurchaseEntity> findByUser(UserEntity user);

    Long countBy();
}
