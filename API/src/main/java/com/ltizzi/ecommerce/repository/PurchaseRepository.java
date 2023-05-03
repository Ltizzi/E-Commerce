package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.purchase.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Long> {
}
