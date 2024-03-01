package com.project.shop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private Long productId;
    private Integer quantity;
    private Double price;
}
