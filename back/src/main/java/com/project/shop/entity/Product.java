package com.project.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "PRODUCTS")
public class Product {
    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)//hibernate check pannum table ah ithu auto genaartela irukkannu
    private Long id;
    private String name;
    private Integer brand_id;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String price;
    private String location;
}