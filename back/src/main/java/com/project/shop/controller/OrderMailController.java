package com.project.shop.controller;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.OrderMailDto;
import com.project.shop.service.OrderMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OrderMailController {
    @Autowired
    OrderMailService orderMailService;

    @PostMapping("/sendMail")
    public ResponseEntity<APIResponse> sendMail(@RequestBody OrderMailDto orderMailDto){
        APIResponse apiResponse = new APIResponse();
        apiResponse.setData(orderMailService.sendMail(orderMailDto));

        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }
}