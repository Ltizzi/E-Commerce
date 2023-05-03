package com.ltizzi.ecommerce.model.cart;

import com.ltizzi.ecommerce.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;
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
    private ArrayList<CartItem> items = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
