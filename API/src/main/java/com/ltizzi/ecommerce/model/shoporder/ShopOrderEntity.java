package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.purchase.PurchaseEntity;
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

/**
 * @author Leonardo Terlizzi
 */

@Data
@NoArgsConstructor
@Entity
@Table(name = "shop_orders")
@SQLDelete(sql = "UPDATE shop_orders SET soft_delete = true where shop_order_id=?")
@Where(clause = "soft_delete = false")

public class ShopOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shop_order_id;

    private BigDecimal total;

    @OneToOne(fetch = FetchType.LAZY)
    private ProductEntity product;

    private int cantidad;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String order_state;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(name = "soft_delete")
    private Boolean soft_delete = Boolean.FALSE;

}
