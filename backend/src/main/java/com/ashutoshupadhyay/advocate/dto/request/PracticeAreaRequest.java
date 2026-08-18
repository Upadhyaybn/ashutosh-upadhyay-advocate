package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PracticeAreaRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 150)
        String name,

        @NotBlank(message = "Slug is required")
        @Size(max = 180)
        String slug,

        @Size(max = 500)
        String shortDescription,

        @Size(max = 5000)
        String detailedDescription,

        @NotNull(message = "Display order is required")
        Integer displayOrder,

        @NotNull(message = "Active status is required")
        Boolean active

) {
}