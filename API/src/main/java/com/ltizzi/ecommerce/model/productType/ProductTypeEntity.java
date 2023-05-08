package com.ltizzi.ecommerce.model.productType;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "product_types")
@SQLDelete(sql = "UPDATE product_types SET soft_delete = true where prod_type_id=?")
@Where(clause = "soft_delete=false")
public class ProductTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prod_type_id;

    @NotNull(message = "Product type name can't be null")
    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    private Boolean soft_delete = Boolean.FALSE;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name= "product_id", nullable = false)
//    private ProductEntity product;
}
