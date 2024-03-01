package com.project.shop.service;

import com.project.shop.comman.APIResponse;
import com.project.shop.dto.LoginRequestDTO;
import com.project.shop.dto.RequestMeta;
import com.project.shop.dto.SignUpRequestDTO;
import com.project.shop.entity.User;
import com.project.shop.repo.UserRepository;
import com.project.shop.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    /////
    @Autowired
    private RequestMeta requestMeta;

    public APIResponse signUp(SignUpRequestDTO signUpRequestDTO) {
        APIResponse apiResponse=new APIResponse();


        //validation
//        User isuser=userRepository.findByEmail(signUpRequestDTO.getEmailId());
//        boolean UserVerified=userRepository.existsByEmailAndVerifiedTrue(signUpRequestDTO.getEmailId());
       boolean UserNotVerified=userRepository.existsByEmailAndVerifiedFalse(signUpRequestDTO.getEmailId());
        if(UserNotVerified)
        {
                apiResponse.setError("Email Already exist");
                return apiResponse;

        }
//        if(UserNotVerified)
//        {
//            userRepository.deleteByEmail(signUpRequestDTO.getEmailId());
//        }

        //dto to entity
        User userEntity=new User();
        userEntity.setName(signUpRequestDTO.getName());
        userEntity.setEmail(signUpRequestDTO.getEmailId());
        userEntity.setPhoneNumber(signUpRequestDTO.getPhoneNumber());
        userEntity.setPassword(signUpRequestDTO.getPassword());

        //store entity
//        userEntity=userRepository.save(userEntity);
        String otp=generateOTP();
        userEntity.setOtp(otp);
        userEntity= userRepository.save(userEntity);
        sendVerificationEmail(userEntity.getEmail(),otp);


        //generate jwt
        String token=jwtUtils.generateJwt(userEntity);

        Map<String,Object> data=new HashMap<>();
        data.put("accessToken",token);

        apiResponse.setData(data);

        //return
        return apiResponse;
    }


    public APIResponse login(LoginRequestDTO loginRequestDTO) {
        APIResponse apiResponse=new APIResponse();
        //validation

        //verify user exist with given email and password
        User user=userRepository.findOneByEmailIgnoreCaseAndPassword(loginRequestDTO.getEmailId(),loginRequestDTO.getPassword());

        //response
        if(user==null){
            apiResponse.setData("Invalid Credentials!");
            return apiResponse;
        }
        else if(!user.isVerified())
        {
            apiResponse.setData("please verify your email");
            return apiResponse;
        }

        //generate jwt
        String token=jwtUtils.generateJwt(user);

        Map<String,Object> data=new HashMap<>();
        data.put("accessToken",token);
        apiResponse.setData(data);

        return apiResponse;
    }


    public APIResponse verify(String otp) {
        APIResponse apiResponse=new APIResponse();
        User user=userRepository.findByEmail(requestMeta.getEmailId());
        if (user == null) {
            apiResponse.setError("User not found");
        } else if (user.isVerified()) {
            apiResponse.setError("User is already verified");
        } else if (!otp.equals(user.getOtp())) {
            apiResponse.setError("Incorrect OTP");
        } else {
            // OTP matches, mark the user as verified
            user.setVerified(true);
            userRepository.save(user);
            apiResponse.setData("User verified successfully");
        }
        return apiResponse;
    }

    private String generateOTP(){
        Random random=new Random();
        int otpValue=100000+random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email,String otp){
        String subject="Email verification";
        String body="your verification otp is:"+otp;

        emailService.sendEmail(email,subject,body);
    }

}
