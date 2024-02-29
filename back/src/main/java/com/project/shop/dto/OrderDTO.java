package com.project.shop.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
public class OrderDTO {
    private Long id;
    private Long userId;
    private Date createdAt;
    private String address;
}

