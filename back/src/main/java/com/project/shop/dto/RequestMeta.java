package com.project.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestMeta {
    private long userId;
    private String userName;
    private String emailId;
    private String userType;
}
