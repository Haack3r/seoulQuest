package com.positive.culture.seoulQuest.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Log4j2

public class JWTUtil {
    // p323
    private static String key = "12345678901234567890123456789012345678901234567890";
    public static String generateToken(Map<String, Object> valueMap, int min) {
        SecretKey key = null;

        try{
            key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        String str = Jwts.builder()
                .setHeader(Map.of("typ","JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(key)
                .compact();
        return str;
    }
    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;

        try {
            log.info("Validating token: " + token);
            SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
            claim = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            log.info("Claims extracted: " + claim);

            List<String> roleNames = (List<String>) claim.get("roleName");

// Log the extracted value before using it
            log.info("Extracted role names: " + roleNames);

// Check for null before proceeding
            if (roleNames != null) {
                roleNames.forEach(role -> {
                    // Your logic here
                    log.info("Role: " + role);
                });
            } else {
                log.error("roleNames is null, cannot process roles");
            }

        } catch (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("Malformed");
        } catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("Expired");
        } catch (InvalidClaimException invalidClaimException) {
            throw new CustomJWTException("Invalid");
        } catch (JwtException jwtException) {
            log.error("JWT Exception: " + jwtException.getMessage());
            throw new CustomJWTException("JWT Error");
        } catch (Exception e) {
            log.error("General Exception: " + e.getMessage());
            throw new CustomJWTException("Error");
        }
        return claim;
    }

}
