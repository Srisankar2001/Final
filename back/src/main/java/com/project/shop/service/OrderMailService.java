package com.project.shop.service;

import com.project.shop.dto.OrderMailDto;
import com.project.shop.dto.RequestMeta;
import com.project.shop.entity.OrderMail;
import com.project.shop.repo.OrderMailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderMailService {
    @Autowired
    OrderMailRepository orderMailRepository;

    @Autowired
    RequestMeta requestMeta;

    @Autowired
    EmailService emailService;

    public OrderMail sendMail(OrderMailDto orderMailDto) {

        OrderMail orderMail = new OrderMail();
        orderMail.setOrderId(orderMailDto.getOrderId());
        orderMail.setUserId(orderMailDto.getUserId());
        orderMail.setMessage(orderMailDto.getMessage());
        emailService.sendEmail(requestMeta.getEmailId(),"Order Confirmation #"+orderMailDto.getOrderId(),orderMailDto.getMessage());


        return  orderMailRepository.save(orderMail);

    }
}

