package com.project.shop.service;

import com.project.shop.dto.OrderItemsDto;
import com.project.shop.entity.OrderItems;
import com.project.shop.repo.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemsService {
    @Autowired
    OrderItemsRepository orderItemsRepository;

    public OrderItems save(OrderItemsDto orderItemsDto){
        OrderItems orderItems = new OrderItems();
        orderItems.setOrderId(orderItemsDto.getOrderId());
        orderItems.setProductId(orderItemsDto.getProductId());
        orderItems.setQuantity(orderItemsDto.getQuantity());
        orderItems.setPrice(orderItemsDto.getPrice());
        return orderItemsRepository.save(orderItems);
    }
}