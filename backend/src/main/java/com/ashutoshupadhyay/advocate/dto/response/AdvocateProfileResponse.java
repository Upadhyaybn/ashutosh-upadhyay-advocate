package com.ashutoshupadhyay.advocate.dto.response;

public record AdvocateProfileResponse(
        Long id,
        String fullName,
        String designation,
        String professionalBio,
        String qualification,
        String courtsOfPractice,
        String languages,
        String phone,
        String whatsapp,
        String email,
        String officeAddress,
        String officeHours,
        String photoUrl
) {
}