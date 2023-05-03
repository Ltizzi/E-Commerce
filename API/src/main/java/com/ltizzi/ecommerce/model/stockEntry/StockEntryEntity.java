package com.ltizzi.ecommerce.model.stockEntry;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.sql.Timestamp;

/**
 * @author Leonardo Terlizzi
 */

@Data
@Entity
@Table(name = "stock-entries")
@SQLDelete(sql = "UPDATE stock-entries SET soft_delete = true where entrie_id =?")
@Where(clause = "soft_delete = false")
public class StockEntryEntity {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long entry_id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(nullable = false)
    private int cantidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "stock_id")
    private StockEntity stock;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(name="soft_delete")
    private Boolean soft_delete = Boolean.FALSE;
}
