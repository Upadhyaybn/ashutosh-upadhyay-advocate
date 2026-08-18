package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateAdvocateProfileRequest(

        @NotBlank(message = "Full name is required")
        @Size(max = 150)
        String fullName,

        @Size(max = 100)
        String designation,

        @Size(max = 5000)
        String professionalBio,

        @Size(max = 255)
        String qualification,

        @Size(max = 2000)
        String courtsOfPractice,

        @Size(max = 255)
        String languages,

        @Size(max = 20)
        String phone,

        @Size(max = 20)
        String whatsapp,

        @Email(message = "Invalid email address")
        @Size(max = 150)
        String email,

        @Size(max = 2000)
        String officeAddress,

        @Size(max = 255)
        String officeHours,

        @Size(max = 500)
        String photoUrl

) {
}