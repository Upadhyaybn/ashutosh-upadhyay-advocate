package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(

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

        @NotNull(message = "Preferred date is required")
        @FutureOrPresent(
                message = "Preferred date cannot be in the past"
        )
        LocalDate preferredDate,

        LocalTime preferredTime,

        @Size(
                max = 100,
                message = "Matter category must not exceed 100 characters"
        )
        String matterCategory,

        @Size(
                max = 50,
                message = "Communication method must not exceed 50 characters"
        )
        String communicationMethod,

        @Size(
                max = 3000,
                message = "Short note must not exceed 3000 characters"
        )
        String shortNote,

        @AssertTrue(message = "Consent is required")
        Boolean consent

) {
}