package com.ashutoshupadhyay.advocate.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdatePracticeAreaStatusRequest(

        @NotNull(message = "Active status is required")
        Boolean active

) {
}