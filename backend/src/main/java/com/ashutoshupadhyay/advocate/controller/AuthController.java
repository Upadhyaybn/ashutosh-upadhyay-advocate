package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.request.LoginRequest;
import com.ashutoshupadhyay.advocate.dto.response.AuthUserResponse;
import com.ashutoshupadhyay.advocate.dto.response.LoginResponse;
import com.ashutoshupadhyay.advocate.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        UsernamePasswordAuthenticationToken
                                .unauthenticated(
                                        request.username(),
                                        request.password()
                                )
                );

        String token =
                jwtService.generateToken(authentication);

        String role = authentication
                .getAuthorities()
                .stream()
                .findFirst()
                .map(Object::toString)
                .orElse("");

        LoginResponse response =
                new LoginResponse(
                        token,
                        "Bearer",
                        jwtService.getExpirationSeconds(),
                        authentication.getName(),
                        role
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthUserResponse> me(
            Authentication authentication) {

        String role = authentication
                .getAuthorities()
                .stream()
                .map(authority -> authority.getAuthority())
                .filter(authority -> authority.startsWith("ROLE_"))
                .findFirst()
                .orElse("");

        return ResponseEntity.ok(
                new AuthUserResponse(
                        authentication.getName(),
                        role,
                        authentication.isAuthenticated()
                )
        );
    }
}