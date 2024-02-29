package com.project.shop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name="CART")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long productId;
    @Column(columnDefinition = "integer default 1")
    private Integer quantity;
    private Date createdAt;
    @PrePersist
    public void  onSave(){
        //create at and update at
        Date currentDateTime=new Date();
        this.createdAt=currentDateTime;
    }
}

