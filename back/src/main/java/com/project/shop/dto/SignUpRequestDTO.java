package com.project.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDTO {
    private String name;
    private String emailId;
    private String phoneNumber;
    private String password;
}
