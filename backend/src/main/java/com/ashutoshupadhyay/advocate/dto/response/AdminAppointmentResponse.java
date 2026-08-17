package com.ashutoshupadhyay.advocate.dto.response;

import com.ashutoshupadhyay.advocate.enums.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record AdminAppointmentResponse(
        Long id,
        String fullName,
        String mobile,
        String email,
        LocalDate preferredDate,
        LocalTime preferredTime,
        String matterCategory,
        String communicationMethod,
        String shortNote,
        AppointmentStatus status,
        Boolean consent,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}