package com.ltizzi.ecommerce.model.user;

import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.purchase.PurchaseResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

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
    private CartResponse cart;
    private ArrayList<PurchaseResponse> purchases = new ArrayList<>();

}
