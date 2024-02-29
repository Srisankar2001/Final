package com.project.shop.service;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.OrderDTO;
import com.project.shop.dto.RequestMeta;
import com.project.shop.entity.Order;
import com.project.shop.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    //new
    @Autowired
    private EmailService emailService;
    @Autowired
    private RequestMeta requestMeta;

    public APIResponse createOrder(OrderDTO orderDTO) {
        APIResponse apiResponse=new APIResponse();
        Order order=new Order();
        Order order1;
        order.setUserId(orderDTO.getUserId());
        order.setAddress(orderDTO.getAddress());
        order1 = orderRepository.save(order);
        //  sendVerificationEmail(requestMeta.getEmailId(),order.getName(),order.getPrice());
        apiResponse.setData(order1);
        return apiResponse;

    }

    public APIResponse deleteOrderById(Long id) {
        APIResponse apiResponse=new APIResponse();
        orderRepository.deleteById(id);
        apiResponse.setData("Order Deleted Successfully");

        return apiResponse;
    }

    private void sendVerificationEmail(String email,String ProductName,String price){
        String subject="Email verification for Order";
        String body="You have ordered: "+ProductName+"  Price : "+price;

        emailService.sendEmail(email,subject,body);
    }


}

