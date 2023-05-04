package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderMapper;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class PurchaseMapper {

    @Autowired
    private ShopOrderMapper orderMapper;

    public PurchaseResponse toPurchaseResponse(PurchaseEntity purchase){
        PurchaseResponse purchaseRes = new PurchaseResponse();
        purchaseRes.setPurchase_id(purchase.getPurchase_id());
        ArrayList<ShopOrderResponse> orders = orderMapper.toArrayShopOrderResponse(purchase.getOrders());
        purchaseRes.setOrders(orders);
        purchaseRes.setUser_id(purchase.getUser().getUser_id());
        purchaseRes.setCreatedAt(purchase.getCreatedAt());

        return purchaseRes;
    }


}
