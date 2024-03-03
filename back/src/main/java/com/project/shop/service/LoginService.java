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
        User isuser=userRepository.findByEmail(signUpRequestDTO.getEmailId());


        if (isuser == null) {
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

            return apiResponse;
        }
        else if (isuser.isVerified()) {
            apiResponse.setError("Email is already exist");
            return apiResponse;
        }
        else if (!isuser.isVerified()) {
           userRepository.deleteById(isuser.getUserId());

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

            return apiResponse;
        }




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

    public APIResponse resetPassword(String email) {
        APIResponse apiResponse=new APIResponse();
        User user=userRepository.findByEmail(email);
        if (user == null) {
            apiResponse.setError("User not found");
        }else{
            String otp=generateOTP();
            user.setOtp(otp);
            user=userRepository.save(user);
            sendVerificationEmailForResetPassword(user.getEmail(),otp);
        }
        return apiResponse;
    }

    public APIResponse verifyresetpassword(String email,String otp) {
        APIResponse apiResponse=new APIResponse();
        User user=userRepository.findByEmail(email);
        if (user == null) {
            apiResponse.setError("User not found");
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

    public APIResponse changepassword(String email, String password) {
        APIResponse apiResponse=new APIResponse();
        User user=userRepository.findByEmail(email);
        user.setPassword(password);
        userRepository.save(user);
        apiResponse.setData("password changed successfully");
        return apiResponse;
    }
    private void sendVerificationEmailForResetPassword(String email,String otp){
        String subject="Email verification for Reset Password";
        String body="your verification otp is:"+otp;

        emailService.sendEmail(email,subject,body);
    }

}
