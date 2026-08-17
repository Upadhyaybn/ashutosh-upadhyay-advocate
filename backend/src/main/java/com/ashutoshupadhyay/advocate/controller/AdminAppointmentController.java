package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.request.UpdateAppointmentStatusRequest;
import com.ashutoshupadhyay.advocate.dto.response.AdminAppointmentResponse;
import com.ashutoshupadhyay.advocate.service.AdminAppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/appointments")
@Tag(
        name = "Admin Appointments",
        description = "Protected admin appointment APIs"
)
@SecurityRequirement(name = "bearerAuth")
public class AdminAppointmentController {

    private final AdminAppointmentService service;

    public AdminAppointmentController(
            AdminAppointmentService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get all appointments")
    public ResponseEntity<List<AdminAppointmentResponse>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get appointment by ID")
    public ResponseEntity<AdminAppointmentResponse>
    getById(@PathVariable Long id) {

        return ResponseEntity.ok(
                service.getById(id)
        );
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update appointment status")
    public ResponseEntity<AdminAppointmentResponse>
    updateStatus(
            @PathVariable Long id,
            @Valid
            @RequestBody
            UpdateAppointmentStatusRequest request) {

        return ResponseEntity.ok(
                service.updateStatus(id, request)
        );
    }
}