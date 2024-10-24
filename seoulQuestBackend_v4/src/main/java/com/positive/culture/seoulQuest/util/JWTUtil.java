package com.positive.culture.seoulQuest.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Log4j2
public class JWTUtil {
    private static String key = "12345678901234567890123456789012345678901234567890";

    public static String generateToken(Map<String, Object> valueMap, List<String> roleNames, int min) {
        SecretKey secretKey;

        try {
            secretKey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        valueMap.put("roleNames", roleNames); // Include roleNames in the token claims

        return Jwts.builder()
                .setHeader(Map.of("typ", "JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(secretKey)
                .compact();
    }

    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claims;

        try {
            log.info("Validating token: " + token);
            SecretKey secretKey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
            claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            log.info("Claims extracted: " + claims);

            // Ensure we extract 'roleNames' from the claims
            List<String> roleNames = (List<String>) claims.get("roleNames");
            log.info("Extracted role names: " + roleNames);
        } catch (JwtException jwtException) {
            log.error("JWT Exception: " + jwtException.getMessage());
            throw new CustomJWTException("JWT Error");
        }
        return claims;
    }
}
