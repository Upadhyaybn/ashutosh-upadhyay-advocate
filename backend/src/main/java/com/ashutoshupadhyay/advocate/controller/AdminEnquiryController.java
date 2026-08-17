package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.request.UpdateEnquiryStatusRequest;
import com.ashutoshupadhyay.advocate.dto.response.AdminEnquiryResponse;
import com.ashutoshupadhyay.advocate.service.AdminEnquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/enquiries")
@Tag(
        name = "Admin Enquiries",
        description = "Protected admin enquiry APIs"
)
@SecurityRequirement(name = "bearerAuth")
public class AdminEnquiryController {

    private final AdminEnquiryService service;

    public AdminEnquiryController(
            AdminEnquiryService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get all enquiries")
    public ResponseEntity<List<AdminEnquiryResponse>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get enquiry by ID")
    public ResponseEntity<AdminEnquiryResponse>
    getById(@PathVariable Long id) {

        return ResponseEntity.ok(
                service.getById(id)
        );
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update enquiry status")
    public ResponseEntity<AdminEnquiryResponse>
    updateStatus(
            @PathVariable Long id,
            @Valid
            @RequestBody
            UpdateEnquiryStatusRequest request) {

        return ResponseEntity.ok(
                service.updateStatus(id, request)
        );
    }
}