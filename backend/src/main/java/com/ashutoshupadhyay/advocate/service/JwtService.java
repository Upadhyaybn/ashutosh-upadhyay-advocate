package com.ashutoshupadhyay.advocate.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final Duration expiration;
    private final String issuer;

    public JwtService(
            JwtEncoder jwtEncoder,
            @Value("${security.jwt.expiration-minutes}")
            long expirationMinutes,
            @Value("${security.jwt.issuer}")
            String issuer) {

        this.jwtEncoder = jwtEncoder;
        this.expiration =
                Duration.ofMinutes(expirationMinutes);
        this.issuer = issuer;
    }

    public String generateToken(
            Authentication authentication) {

        Instant now = Instant.now();

        List<String> roles = authentication
                .getAuthorities()
                .stream()
                .map(authority -> authority.getAuthority())
                .filter(authority -> authority.startsWith("ROLE_"))
                .toList();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .issuedAt(now)
                .expiresAt(now.plus(expiration))
                .subject(authentication.getName())
                .claim("roles", roles)
                .build();

        return jwtEncoder
                .encode(
                        JwtEncoderParameters.from(claims)
                )
                .getTokenValue();
    }

    public long getExpirationSeconds() {
        return expiration.toSeconds();
    }
}