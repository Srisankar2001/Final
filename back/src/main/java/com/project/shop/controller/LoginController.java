package com.project.shop.controller;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.LoginRequestDTO;
import com.project.shop.dto.SignUpRequestDTO;
import com.project.shop.service.LoginService;
import com.project.shop.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @Autowired
    private JwtUtils jwtUtils;
    @PostMapping("/signup")
    public ResponseEntity<APIResponse> signUp(@RequestBody SignUpRequestDTO signUpRequestDTO){

        APIResponse apiResponse=loginService.signUp(signUpRequestDTO);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);

    }

    @PostMapping("/login")
    public ResponseEntity<APIResponse> login(@RequestBody LoginRequestDTO loginRequestDTO){

        APIResponse apiResponse=loginService.login(loginRequestDTO);
        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);

    }


    @PostMapping("/verify")
    public ResponseEntity<APIResponse> verify(@RequestParam String otp){
//        APIResponse apiResponse=new APIResponse();
        APIResponse apiResponse=loginService.verify(otp);


        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

    @PostMapping("/emailForResetPassword")
    public ResponseEntity<APIResponse> resetPassword(@RequestParam String email){
        System.out.println("Email "+email);
        APIResponse apiResponse=loginService.resetPassword(email);


        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

    @PostMapping("/verifyotp")
    public ResponseEntity<APIResponse> verifyresetpassword(@RequestParam String email,@RequestParam String otp){
//        APIResponse apiResponse=new APIResponse();
        APIResponse apiResponse=loginService.verifyresetpassword(email,otp);


        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<APIResponse> changepassword(@RequestParam String email,@RequestParam String password){
        System.out.println("email: "+email);
        System.out.println("password: "+password);
        APIResponse apiResponse=loginService.changepassword(email,password  );

        return ResponseEntity
                .status(apiResponse.getStatus())
                .body(apiResponse);
    }

}
