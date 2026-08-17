package com.ashutoshupadhyay.advocate.dto.request;

import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateEnquiryStatusRequest(

        @NotNull(message = "Status is required")
        EnquiryStatus status

) {
}