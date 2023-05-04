package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.model.purchase.PurchaseRequest;
import com.ltizzi.ecommerce.model.purchase.PurchaseResponse;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface PurchaseService {

    public List<PurchaseRequest> getPurchases();

    public PurchaseRequest getPurchaseById(Long id);

    public List<PurchaseRequest> getPurchaseByUserId(Long user_id);

    public PurchaseRequest savePurchase(PurchaseResponse purchase);

    public void deletePurchaseById(Long id);

    public PurchaseRequest updatePurchase(Long id, PurchaseResponse purchase);
}
