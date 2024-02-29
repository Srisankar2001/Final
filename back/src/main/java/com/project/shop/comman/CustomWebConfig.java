package com.project.shop.comman;

import com.project.shop.config.JwtInterceptor;
import com.project.shop.dto.RequestMeta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomWebConfig implements WebMvcConfigurer {
    @Autowired
    private JwtInterceptor jwtInterceptor;


    @Override
    public void addInterceptors(InterceptorRegistry registry) { //ithuthaan connect pannuthu interseptor ah
        registry.addInterceptor(jwtInterceptor);

    }


    @Bean
    @RequestScope //    @Scope(value ="request",proxyMode = ScopedProxyMode.TARGET_CLASS) OR
    public RequestMeta getRequestMeta(){
        return new RequestMeta();
    }

}
