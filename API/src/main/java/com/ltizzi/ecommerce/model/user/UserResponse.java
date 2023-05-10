package com.ltizzi.ecommerce.model.user;

import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.purchase.PurchaseResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@Data
@NoArgsConstructor
public class UserResponse {

    private Long user_id;
    private String username;
    private String name;
    private String lastname;
    private String email;
    private String avatar;
    private Date birthday;
    private List<CartResponse> carts = new ArrayList<>();
    private List<PurchaseResponse> purchases = new ArrayList<>();

}
