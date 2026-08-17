package com.ashutoshupadhyay.advocate.dto.response;

import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;

import java.time.LocalDateTime;

public record AdminEnquiryResponse(
        Long id,
        String fullName,
        String mobile,
        String email,
        String cityDistrict,
        String category,
        String description,
        EnquiryStatus status,
        Boolean consent,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}