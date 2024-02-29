package com.project.shop.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class OrderMailDto {
    private Long id;
    private Long orderId;
    private Long userId;
    private String message;
}