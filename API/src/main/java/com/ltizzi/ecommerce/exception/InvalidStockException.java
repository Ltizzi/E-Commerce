package com.ltizzi.ecommerce.exception;

/**
 * @author Leonardo Terlizzi
 */

public class InvalidStockException extends Exception{

    public InvalidStockException(String message){
        super(message);
    }
}
