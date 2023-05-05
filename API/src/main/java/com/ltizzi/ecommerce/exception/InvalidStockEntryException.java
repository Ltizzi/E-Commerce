package com.ltizzi.ecommerce.exception;

/**
 * @author Leonardo Terlizzi
 */

public class InvalidStockEntryException extends Exception{

    public InvalidStockEntryException(String message) {
        super(message);
    }
}
