package com.project.shop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
public class CartDto {
    private Long id;
    @JsonProperty("userId")
    private Long userId;
    @JsonProperty("productId")
    private Long productId;
    private Integer quantity;
    private Date createdAt;
}
