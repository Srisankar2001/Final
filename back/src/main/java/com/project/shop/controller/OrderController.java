package com.project.shop.controller;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.OrderDTO;
import com.project.shop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @PostMapping("/createOrder")
    public ResponseEntity<APIResponse> createOrder(@RequestBody OrderDTO orderDTO){
        APIResponse apiResponse=orderService.createOrder(orderDTO);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);

    }
    @DeleteMapping("/deleteOrder/{Id}")
    public ResponseEntity<APIResponse> deleteOrderById(@PathVariable Long Id){

        APIResponse apiResponse=orderService.deleteOrderById(Id);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);

    }
}

