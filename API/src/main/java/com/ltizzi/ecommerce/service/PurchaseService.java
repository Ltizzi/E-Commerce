package com.ltizzi.ecommerce.service;

import com.ltizzi.ecommerce.exception.InvalidPurchaseException;
import com.ltizzi.ecommerce.model.purchase.PurchaseRequest;
import com.ltizzi.ecommerce.model.purchase.PurchaseResponse;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

/**
 * @author Leonardo Terlizzi
 */


public interface PurchaseService {

    public List<PurchaseResponse> getPurchases();

    public PurchaseResponse getPurchaseById(Long id) throws HttpClientErrorException.NotFound;

    public List<PurchaseResponse> getPurchaseByUserId(Long user_id) throws HttpClientErrorException.NotFound;

    public PurchaseResponse savePurchase(PurchaseRequest purchase) throws InvalidPurchaseException;

    public void deletePurchaseById(Long id) throws HttpClientErrorException.NotFound;

    public PurchaseResponse updatePurchase(Long id, PurchaseRequest purchase) throws HttpClientErrorException.NotFound, InvalidPurchaseException;
}
