package com.project.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Integer brand_id;
    private String price;
    private String location;

}
