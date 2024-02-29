package com.project.shop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="MAIL DETAIL")
public class OrderMail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private Long userId;
    @Column(columnDefinition = "TEXT")
    private String message;
}
