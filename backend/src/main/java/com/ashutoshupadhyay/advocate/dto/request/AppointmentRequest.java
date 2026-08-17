package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(

        @NotBlank(message = "Full name is required")
        @Size(max = 150)
        String fullName,

        @NotBlank(message = "Mobile number is required")
        @Size(max = 20)
        String mobile,

        @Email(message = "Email address is invalid")
        @Size(max = 150)
        String email,

        @NotNull(message = "Preferred date is required")
        @FutureOrPresent(message = "Preferred date cannot be in the past")
        LocalDate preferredDate,

        LocalTime preferredTime,

        @Size(max = 100)
        String matterCategory,

        @Size(max = 50)
        String communicationMethod,

        @Size(max = 3000)
        String shortNote,

        @AssertTrue(message = "Consent is required")
        Boolean consent
) {
}