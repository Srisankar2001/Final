package com.project.shop.util;

import com.project.shop.comman.Access_DeniedException;
import com.project.shop.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ClaimsBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static String secret="ThisIsSecretxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    private static long expiryDuration= 60 * 60;
    public String generateJwt(User user){

        long milliTime=System.currentTimeMillis();
        long expiryTime=milliTime+expiryDuration*1000;

        Date issuedAt=new Date(milliTime);
        Date expiryAt =new Date(expiryTime);
        //claims
        ClaimsBuilder claims= Jwts.claims()
                .setIssuer(user.getUserId().toString())
                .setIssuedAt(issuedAt)
                .setExpiration(expiryAt);

        //optional claims
        claims.add("type",user.getUserType());
        claims.add("name",user.getName());
        claims.add("emailId",user.getEmail());

        //generate jwt using claims
        return Jwts.builder()
                .setClaims(claims.build())
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();//compact String ah convert pannidum


    }

    public Claims verify(String authorization) throws Exception {
        try {
            Claims claims=Jwts.parser().setSigningKey(secret).build().parseClaimsJws(authorization).getBody();
            //jwt valida iruntha intha line ah pass panni poidum illanna exception throw pannum
            //claims ethukku enda payload ah access panna

//            System.out.println(claims.get("name"));
            return claims;//payload ah access panna
        }
        catch(Exception e){
            throw new Access_DeniedException("Access Denied");
        }

    }
}
