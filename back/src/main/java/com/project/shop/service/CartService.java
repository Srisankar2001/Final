package com.project.shop.service;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.CartDto;
import com.project.shop.entity.Cart;
import com.project.shop.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;

    public APIResponse getCartItems(CartDto cartDto) {
        APIResponse apiResponse = new APIResponse();
        Optional<List<Cart>> cart = cartRepository.findByUserId(cartDto.getUserId());
        apiResponse.setData(cart);
        return apiResponse;
    }

    public APIResponse addToCart(CartDto cartDto) {
        APIResponse apiResponse = new APIResponse();
        Optional<Cart> checkCart = cartRepository.findByUserIdAndProductId(cartDto.getUserId(), cartDto.getProductId());
        if(checkCart.isPresent()){
            apiResponse.setError("Already added to the cart");
            return apiResponse;
        }else{
            Cart cart = new Cart();
            cart.setUserId(cartDto.getUserId());
            cart.setProductId(cartDto.getProductId());
            cart.setQuantity(1);
            // Set any other properties of the Cart entity as needed

            cartRepository.save(cart);
            apiResponse.setData("Item added in the cart successfully");
//            cartRepository.save(cartDto.getUserId(),cartDto.getProductId());
//            apiResponse.setData("Item added in the cart successfully");
            return apiResponse;
        }
    }

    public APIResponse updateCart(Cart cart) {
        APIResponse apiResponse = new APIResponse();
        cartRepository.save(cart);
        apiResponse.setData("Item updated in the cart successfully");
        return  apiResponse;
    }

    public APIResponse deleteCart(CartDto cartDto) {
        APIResponse apiResponse = new APIResponse();
        cartRepository.deleteById(cartDto.getId());
        apiResponse.setData("Item deleted from cart successfully");
        return apiResponse;
    }
}

