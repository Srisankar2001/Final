package com.project.shop.controller;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.CartDto;
import com.project.shop.entity.Cart;
import com.project.shop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CartController {
    @Autowired
    CartService cartService;

    @PostMapping("/cart")
    public ResponseEntity<APIResponse> getCartItems(@RequestBody CartDto cartDto){
        APIResponse apiResponse = cartService.getCartItems(cartDto);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

    @PostMapping("/addToCart")
    public ResponseEntity<APIResponse> addToCart(@RequestBody CartDto cartDto){
        APIResponse apiResponse = cartService.addToCart(cartDto);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

    @PutMapping("/updateCart")
    public ResponseEntity<APIResponse> updateCart(@RequestBody Cart cart){
        APIResponse apiResponse = cartService.updateCart(cart);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

    @PostMapping("/deleteCart")
    public  ResponseEntity<APIResponse> deleteCart(@RequestBody CartDto cartDto){
        APIResponse apiResponse = cartService.deleteCart(cartDto);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }
}
