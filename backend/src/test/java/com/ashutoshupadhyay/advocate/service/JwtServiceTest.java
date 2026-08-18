package com.ashutoshupadhyay.advocate.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @Mock
    private JwtEncoder jwtEncoder;

    private JwtService jwtService;

    @BeforeEach
    void setUp() {

        jwtService =
                new JwtService(
                        jwtEncoder,
                        30,
                        "ashutosh-upadhyay-advocate-api"
                );
    }

    @Test
    void shouldGenerateJwtWithExpectedClaims() {

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        "admin",
                        null,
                        List.of(
                                new SimpleGrantedAuthority(
                                        "ROLE_ADMIN"
                                )
                        )
                );

        Jwt jwt =
                Jwt.withTokenValue(
                                "test-jwt-token"
                        )
                        .header(
                                "alg",
                                "HS256"
                        )
                        .subject(
                                "admin"
                        )
                        .issuedAt(
                                Instant.now()
                        )
                        .expiresAt(
                                Instant.now()
                                        .plusSeconds(1800)
                        )
                        .claim(
                                "roles",
                                List.of(
                                        "ROLE_ADMIN"
                                )
                        )
                        .build();

        when(
                jwtEncoder.encode(
                        any(
                                JwtEncoderParameters.class
                        )
                )
        ).thenReturn(jwt);

        String token =
                jwtService.generateToken(
                        authentication
                );

        assertEquals(
                "test-jwt-token",
                token
        );

        ArgumentCaptor<JwtEncoderParameters>
                captor =
                ArgumentCaptor.forClass(
                        JwtEncoderParameters.class
                );

        verify(jwtEncoder)
                .encode(
                        captor.capture()
                );

        JwtClaimsSet claims =
                captor
                        .getValue()
                        .getClaims();

        assertEquals(
                "admin",
                claims.getSubject()
        );

        assertEquals(
                "ashutosh-upadhyay-advocate-api",
                claims.getClaim("iss")
        );

        assertNotNull(
                claims.getIssuedAt()
        );

        assertNotNull(
                claims.getExpiresAt()
        );

        assertEquals(
                List.of(
                        "ROLE_ADMIN"
                ),
                claims.getClaim("roles")
        );
    }

    @Test
    void shouldReturnExpirationInSeconds() {

        assertEquals(
                1800,
                jwtService.getExpirationSeconds()
        );
    }
}