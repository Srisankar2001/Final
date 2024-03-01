package com.project.shop.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class BrandDto {
    private Integer id;
    private String name;
    private String location;
}
