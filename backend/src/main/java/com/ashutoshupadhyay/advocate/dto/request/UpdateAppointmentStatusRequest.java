package com.ashutoshupadhyay.advocate.dto.request;

import com.ashutoshupadhyay.advocate.enums.AppointmentStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateAppointmentStatusRequest(

        @NotNull(message = "Status is required")
        AppointmentStatus status

) {
}