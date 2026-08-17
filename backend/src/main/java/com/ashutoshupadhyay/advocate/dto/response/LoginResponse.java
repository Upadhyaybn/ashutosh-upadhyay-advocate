package com.ashutoshupadhyay.advocate.dto.response;

public record LoginResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        String username,
        String role
) {
}