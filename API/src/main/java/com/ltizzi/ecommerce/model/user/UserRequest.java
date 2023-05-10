package com.ltizzi.ecommerce.model.user;

import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.purchase.PurchaseRequest;
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
public class UserRequest {

    private Long user_id;
    private String username;
    private String name;
    private String lastname;
    private String email;
    private String avatar;
    private Date birthday;
    private List<CartRequest> carts = new ArrayList<>();
    private List<PurchaseRequest> purchases = new ArrayList<>();
}
