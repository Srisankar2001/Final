package com.project.shop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "BRAND")
public class Brand {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String location;
}
