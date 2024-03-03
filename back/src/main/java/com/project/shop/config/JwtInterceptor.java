package com.project.shop.config;

import com.project.shop.dto.RequestMeta;
import com.project.shop.util.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequestInterceptor;
import org.springframework.web.servlet.handler.WebRequestHandlerInterceptorAdapter;

@Component
public class JwtInterceptor extends WebRequestHandlerInterceptorAdapter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RequestMeta requestMeta;



    public JwtInterceptor(WebRequestInterceptor requestInterceptor) {
        super(requestInterceptor);
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String auth=request.getHeader("authorization");
        //authorization endra namela irukkira Header moolam value edukkirathukku

//        if(!(request.getRequestURI().contains("login") || request.getRequestURI().contains("signup") || request.getRequestURI().contains("products") || request.getRequestURI().contains("product") || request.getRequestURI().contains("createProduct") || request.getRequestURI().contains("brand") || request.getRequestURI().contains("brands"))){
        if(!(request.getRequestURI().contains("login") || request.getRequestURI().contains("signup") || request.getRequestURI().contains("emailForResetPassword") || request.getRequestURI().contains("verifyotp") || request.getRequestURI().contains("changePassword") || request.getRequestURI().contains("brand") || request.getRequestURI().contains("products") || request.getRequestURI().contains("product"))){
            Claims claims=jwtUtils.verify(auth);
            requestMeta.setUserName(claims.get("name").toString());
            requestMeta.setUserId(Long.valueOf(claims.getIssuer()));
            requestMeta.setUserType(claims.get("type").toString());
            requestMeta.setEmailId(claims.get("emailId").toString());
            //claims la erukkiratha intha dto class kku poduran


        }


        return super.preHandle(request, response, handler);
    }
}
