package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.InvalidPurchaseException;
import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.purchase.PurchaseEntity;
import com.ltizzi.ecommerce.model.purchase.PurchaseMapper;
import com.ltizzi.ecommerce.model.purchase.PurchaseRequest;
import com.ltizzi.ecommerce.model.purchase.PurchaseResponse;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderEntity;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderMapper;
import com.ltizzi.ecommerce.model.stock.StockEntity;
import com.ltizzi.ecommerce.model.utils.CountTable;
import com.ltizzi.ecommerce.repository.PurchaseRepository;
import com.ltizzi.ecommerce.repository.StockRepository;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Service
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    private PurchaseRepository purchRepo;

    @Autowired
    private PurchaseMapper purchMapper;

    @Autowired
    private ShopOrderMapper orderMapper;

    @Autowired
    private StockRepository stockRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<PurchaseResponse> getPurchases(int page, int limit) {
        PageRequest pageReq = PageRequest.of(page, limit);
        Page<PurchaseEntity> purchPage = purchRepo.findAll(pageReq);
        List<PurchaseEntity> purchList = purchPage.getContent();
        return purchMapper.toArrayPurchaseResponse(purchList);
    }

    @Override
    public CountTable countPurchases() {
        long totalPurchases = purchRepo.countBy();
        return new CountTable((int) totalPurchases);
    }

    @Override
    public PurchaseResponse getPurchaseById(Long id) throws HttpClientErrorException.NotFound {
        return purchMapper.toPurchaseResponse(purchRepo.findById(id).orElseThrow());
    }

    @Override
    public List<PurchaseResponse> getPurchaseByUserId(Long user_id) throws HttpClientErrorException.NotFound {
        return purchMapper.toArrayPurchaseResponse(purchRepo.findByUser(userRepo.findById(user_id).orElseThrow()));
    }

    @Override
    public PurchaseResponse savePurchase(PurchaseRequest purchase) throws InvalidPurchaseException {
        List<ShopOrderEntity> items = orderMapper.toArrayShopOrderEntity(purchase.getOrders());
        List<StockEntity> stocks = new ArrayList<>();
        BigDecimal total_income = BigDecimal.ZERO;

        //actualización de los stocks | calculo del total
        for (ShopOrderEntity item : items) {
            ProductEntity product = item.getCart().getProduct();
            StockEntity stock = stockRepo.findByProduct(product);
            total_income = total_income.add(item.getTotal());
            stock.setCantidad(stock.getCantidad() - item.getCart().getCantidad());
            stocks.add(stock);
        }
        for (StockEntity stock : stocks) {
            stockRepo.save(stock);
        }
        PurchaseEntity newPurchase = new PurchaseEntity();
        newPurchase = purchMapper.toPurchaseEntity(purchase);
        newPurchase.setTotal_income(total_income);
        newPurchase = purchRepo.save(newPurchase);
        return purchMapper.toPurchaseResponse(newPurchase);
    }

    @Override
    public void deletePurchaseById(Long id) throws HttpClientErrorException.NotFound {
        PurchaseEntity purchase = purchRepo.findById(id).orElseThrow();
        List<ShopOrderEntity> items = purchase.getOrders();
        List<StockEntity> stocks = new ArrayList<>();
        for (ShopOrderEntity item : items) {
            ProductEntity product = item.getCart().getProduct();
            StockEntity stock = stockRepo.findByProduct(product);
            stock.setCantidad(stock.getCantidad() - item.getCart().getCantidad());
            stocks.add(stock);
        }
        for (StockEntity stock : stocks) {
            stockRepo.save(stock);
        }
        purchRepo.deleteById(id);
    }

    @Override
    public PurchaseResponse updatePurchase(Long id, PurchaseRequest purchase) throws HttpClientErrorException.NotFound, InvalidPurchaseException {
        List<ShopOrderEntity> oldItems = purchRepo.findById(purchase.getPurchase_id()).orElseThrow().getOrders();
        List<ShopOrderEntity> items = orderMapper.toArrayShopOrderEntity(purchase.getOrders());
        List<StockEntity> stocks = new ArrayList<>();
        BigDecimal total_income = BigDecimal.ZERO;

        for (ShopOrderEntity item : items) {
            ShopOrderEntity oldItem = oldItems.stream().filter(oItem -> oItem.getShop_order_id() == item.getShop_order_id()).findFirst().orElseThrow();
            ProductEntity product = item.getCart().getProduct();
            StockEntity stock = stockRepo.findByProduct(product);
            total_income = total_income.add(item.getTotal());
            stock.setCantidad(stock.getCantidad() - oldItem.getCart().getCantidad());
            stock.setCantidad(stock.getCantidad() + item.getCart().getCantidad());
            stocks.add(stock);
        }

        for (StockEntity stock : stocks) {
            stockRepo.save(stock);
        }
        PurchaseEntity newPurchase = new PurchaseEntity();
        newPurchase = purchMapper.toPurchaseEntity(purchase);
        newPurchase.setTotal_income(total_income);
        newPurchase = purchRepo.save(newPurchase);
        return purchMapper.toPurchaseResponse(newPurchase);
    }
}
