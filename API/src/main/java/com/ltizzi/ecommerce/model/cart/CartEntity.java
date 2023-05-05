package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Data @NoArgsConstructor
@Entity
@Table(name ="carts")
@SQLDelete(sql=" UPDATE carts SET soft_delete = true where cart_id= =? ")
@Where(clause = "soft_delete = false")
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cart_id;
    private BigDecimal total;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "cart")
    private ProductEntity product;

    private int cantidad;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}
