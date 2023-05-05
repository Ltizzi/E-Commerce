package com.ltizzi.ecommerce.model.purchase;

import com.ltizzi.ecommerce.model.shoporder.ShopOrderMapper;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.repository.PurchaseRepository;
import com.ltizzi.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class PurchaseMapper {

    @Autowired
    private ShopOrderMapper orderMapper;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PurchaseRepository purchRepo;

    public PurchaseResponse toPurchaseResponse(PurchaseEntity purchase){
        PurchaseResponse purchaseRes = new PurchaseResponse();
        purchaseRes.setPurchase_id(purchase.getPurchase_id());
        List<ShopOrderResponse> orders = orderMapper.toArrayShopOrderResponse(purchase.getOrders());
        purchaseRes.setOrders(orders);
        purchaseRes.setUser_id(purchase.getUser().getUser_id());
        purchaseRes.setCreatedAt(purchase.getCreatedAt());
        purchaseRes.setTotal_income(purchase.getTotal_income());

        return purchaseRes;
    }

    public PurchaseEntity toPurchaseEntity(PurchaseRequest purReq) {
        PurchaseEntity purchase = purchRepo.findById(purReq.getPurchase_id()).orElse(new PurchaseEntity());
        purchase.setPurchase_id(purReq.getPurchase_id());
        purchase.setUser(userRepo.findById(purReq.getUser_id()).orElseThrow());
        purchase.setOrders(orderMapper.toArrayShopOrderEntity(purReq.getOrders()));
        return purchase;
    }

    public List<PurchaseResponse> toArrayPurchaseResponse(List<PurchaseEntity> purchases) {
        List<PurchaseResponse> purchasesRes = new ArrayList<>();
        purchases.forEach(purchase->{
            purchasesRes.add(toPurchaseResponse(purchase));
        });
        return purchasesRes;
    }

    public List<PurchaseEntity> toArrayPurchaseEntity(List<PurchaseRequest> purchasesReq) {
        List<PurchaseEntity> purchases = new ArrayList<>();
        purchasesReq.forEach(purchReq->{
            purchases.add(toPurchaseEntity(purchReq));
        });
        return purchases;
    }


}
