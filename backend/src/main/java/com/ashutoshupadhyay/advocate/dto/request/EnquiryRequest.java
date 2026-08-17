package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EnquiryRequest(

        @NotBlank(message = "Full name is required")
        @Size(max = 150)
        String fullName,

        @NotBlank(message = "Mobile number is required")
        @Size(max = 20)
        String mobile,

        @Email(message = "Email address is invalid")
        @Size(max = 150)
        String email,

        @Size(max = 150)
        String cityDistrict,

        @Size(max = 100)
        String category,

        @NotBlank(message = "Description is required")
        @Size(max = 5000)
        String description,

        @AssertTrue(message = "Consent is required")
        Boolean consent
) {
}