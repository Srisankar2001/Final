package com.project.shop.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class OrderItemsDto {
    private Long id;
    private Long orderId;
    private Long productId;
    private Integer quantity;
    private Double price;
}