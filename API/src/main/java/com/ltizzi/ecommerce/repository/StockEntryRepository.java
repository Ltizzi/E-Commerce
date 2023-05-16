package com.ltizzi.ecommerce.repository;

import com.ltizzi.ecommerce.model.stockEntry.StockEntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Leonardo Terlizzi
 */

@Repository
public interface StockEntryRepository extends JpaRepository<StockEntryEntity, Long> {

    Long countBy();
}
