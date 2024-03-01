package com.project.shop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "ORDERS")
public class Order {
    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)//hibernate check pannum table ah ithu auto genaartela irukkannu
    private Long id;
    private Long userId;
    private Date createdAt;

    @PrePersist
    public void  onSave(){
        //create at and update at
        Date currentDateTime=new Date();
        this.createdAt=currentDateTime;
    }
    @Column(columnDefinition = "TEXT")
    private String address;


}
