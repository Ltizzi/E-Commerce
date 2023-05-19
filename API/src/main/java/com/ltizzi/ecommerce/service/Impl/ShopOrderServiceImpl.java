package com.ltizzi.ecommerce.service.Impl;

import com.ltizzi.ecommerce.exception.InvalidPurchaseException;
import com.ltizzi.ecommerce.exception.InvalidShopOrderException;
import com.ltizzi.ecommerce.exception.NotFoundException;
import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.cart.CartMapper;
import com.ltizzi.ecommerce.model.cart.CartRequest;
import com.ltizzi.ecommerce.model.cart.CartResponse;
import com.ltizzi.ecommerce.model.product.ProductMapper;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderEntity;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderMapper;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderRequest;
import com.ltizzi.ecommerce.model.shoporder.ShopOrderResponse;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.repository.CartRepository;
import com.ltizzi.ecommerce.repository.ShopOrderRepository;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.service.ShopOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */
@Service
public class ShopOrderServiceImpl implements ShopOrderService {

    @Autowired
    private ShopOrderRepository orderRepo;
    @Autowired
    private ShopOrderMapper orderMapper;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CartRepository cartRepo;
    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper prodMapper;


    @Override
    public List<ShopOrderResponse> getShopOrders() throws HttpClientErrorException.NotFound {
        return orderMapper.toArrayShopOrderResponse(orderRepo.findAll());
    }

    @Override
    public List<ShopOrderResponse> getShopOrdersByUserId(Long id) throws HttpClientErrorException.NotFound {
        UserEntity user = userRepo.findById(id).orElseThrow();
        return orderMapper.toArrayShopOrderResponse(orderRepo.findByUser(user));
    }

    @Override
    public ShopOrderResponse getShopOrderById(Long id) throws HttpClientErrorException.NotFound {
        return orderMapper.toShopOrderResponse(orderRepo.findById(id).orElseThrow());
    }

    @Override
    public ShopOrderResponse saveShopOrder(CartRequest cartReq) throws NotFoundException, InvalidShopOrderException {
        //  System.out.println(cartReq.toString());
        CartEntity cart = cartRepo.findById(cartReq.getId()).get();
        ShopOrderEntity order = new ShopOrderEntity();
        order.setProduct(cart.getProduct());
        order.setCantidad(cart.getCantidad());
        order.setTotal(cart.getProduct().getPrice().multiply(BigDecimal.valueOf(cart.getCantidad())));
        order.setUser(cart.getUser());
        order.setOrder_state("PENDING");
        order = orderRepo.save(order);
        cartRepo.deleteById(cart.getCart_id());
        return orderMapper.toShopOrderResponse(order);
    }

    @Override
    public void deleteShopOrderById(Long id) throws HttpClientErrorException.NotFound {
        orderRepo.deleteById(id);
    }

    @Override
    public ShopOrderResponse updateShopOrder(Long id, ShopOrderRequest orderReq) throws HttpClientErrorException.NotFound, InvalidShopOrderException {
        ShopOrderEntity order = orderRepo.findById(id).orElseThrow();
        order.setOrder_state(orderReq.getOrder_state());
        order.setTotal(orderReq.getProduct().getPrice().multiply(BigDecimal.valueOf(orderReq.getCantidad())));
        order.setCantidad(orderReq.getCantidad());
        order.setProduct(prodMapper.toProductEntity(orderReq.getProduct()));
        order.setUser(userRepo.findById(orderReq.getUser_id()).orElseThrow());
        orderRepo.save(order);
        return orderMapper.toShopOrderResponse(order);
    }
}
