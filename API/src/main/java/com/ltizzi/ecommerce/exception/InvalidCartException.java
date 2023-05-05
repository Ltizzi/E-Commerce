package com.ltizzi.ecommerce.exception;

/**
 * @author Leonardo Terlizzi
 */

public class InvalidCartException extends Exception{

    public InvalidCartException(String message) {
        super(message);
    }
}
