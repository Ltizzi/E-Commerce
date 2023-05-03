package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderMapper;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
        ShopOrderResponse order = orderMapper.toShopOrderResponse(purchase.getOrder());
        purchaseRes.setOrder(order);
        purchaseRes.setUser_id(purchase.getUser().getUser_id());
        purchaseRes.setCreatedAt(purchase.getCreatedAt());

        return purchaseRes;
    }
}
