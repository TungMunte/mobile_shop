package com.back_end.exception;

import org.springframework.http.HttpStatus;

public class OnlineShopAPIException extends RuntimeException{

    private HttpStatus status;
    private String message;

    public OnlineShopAPIException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

