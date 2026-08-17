package com.ashutoshupadhyay.advocate.dto.response;

public record AuthUserResponse(
        String username,
        String role,
        boolean authenticated
) {
}