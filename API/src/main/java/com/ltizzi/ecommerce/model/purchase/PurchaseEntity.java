package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderEntity;
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
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "purchases")
@SQLDelete(sql = "UPDATE purchases SET soft_delete purchase_id=?")
@Where(clause = "soft_delete = false")
public class PurchaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchase_id;

    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "shop_order_id")
    private List<ShopOrderEntity> orders = new ArrayList<>();

    private BigDecimal total_income;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(name = "soft_delete")
    private Boolean soft_delete = Boolean.FALSE;
}
