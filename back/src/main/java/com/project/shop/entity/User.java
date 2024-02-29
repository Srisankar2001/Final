package com.project.shop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String otp;
    private String userType="User";
    private boolean verified;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    public void  onSave(){
        //create at and update at
        Date currentDateTime=new Date();
        this.createdAt=currentDateTime;
        this.updatedAt=currentDateTime;
    }

    @PostPersist
    public void onUpdate(){
        //update at
//        DateTime currentDateTime= new DateTime();
        Date currentDateTime=new Date();
        this.updatedAt=currentDateTime;
    }

}
