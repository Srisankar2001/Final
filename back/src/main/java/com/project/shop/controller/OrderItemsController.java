package com.project.shop.controller;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.OrderItemsDto;
import com.project.shop.service.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderItemsController {
    @Autowired
    OrderItemsService orderItemsService;

    @PostMapping("/orderItem")
    public ResponseEntity<APIResponse> orderItem(@RequestBody OrderItemsDto orderItemsDto){
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(orderItemsService.save(orderItemsDto));
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }
}

