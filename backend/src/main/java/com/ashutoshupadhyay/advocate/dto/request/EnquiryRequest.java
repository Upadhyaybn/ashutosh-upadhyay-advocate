package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EnquiryRequest(

        @NotBlank(message = "Full name is required")
        @Size(
                max = 150,
                message = "Full name must not exceed 150 characters"
        )
        String fullName,

        @NotBlank(message = "Mobile number is required")
        @Pattern(
                regexp = "^[6-9][0-9]{9}$",
                message = "Mobile number must be a valid 10-digit Indian mobile number"
        )
        String mobile,

        @Email(message = "Email address is invalid")
        @Size(
                max = 150,
                message = "Email must not exceed 150 characters"
        )
        String email,

        @Size(
                max = 150,
                message = "City or district must not exceed 150 characters"
        )
        String cityDistrict,

        @Size(
                max = 100,
                message = "Category must not exceed 100 characters"
        )
        String category,

        @NotBlank(message = "Description is required")
        @Size(
                max = 5000,
                message = "Description must not exceed 5000 characters"
        )
        String description,

        @AssertTrue(message = "Consent is required")
        Boolean consent

) {
}