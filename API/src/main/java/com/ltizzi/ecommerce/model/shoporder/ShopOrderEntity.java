package com.ltizzi.ecommerce.model.shoporder;

import com.ltizzi.ecommerce.model.cart.CartItem;
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
@Table(name = "shop_orders")
@SQLDelete(sql="UPDATE shop_orders SET soft_delete = true where shop_order_id=?")
@Where(clause = "soft_delete = false")

public class ShopOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long shop_order_id;

    private BigDecimal total;
    private ArrayList<CartItem> items = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String order_state;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

}
