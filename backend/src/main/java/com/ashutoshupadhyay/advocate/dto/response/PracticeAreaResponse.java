package com.ashutoshupadhyay.advocate.dto.response;

public record PracticeAreaResponse(
        Long id,
        String name,
        String slug,
        String shortDescription,
        String detailedDescription,
        Integer displayOrder
) {
}