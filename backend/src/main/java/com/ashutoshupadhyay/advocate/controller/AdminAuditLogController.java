package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.AuditLogResponse;
import com.ashutoshupadhyay.advocate.service.AuditLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/audit-logs")
@Tag(
        name = "Admin Audit Logs",
        description = "Protected administrative audit-history APIs"
)
@SecurityRequirement(name = "bearerAuth")
public class AdminAuditLogController {

    private final AuditLogService service;

    public AdminAuditLogController(
            AuditLogService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get admin audit history")
    public ResponseEntity<List<AuditLogResponse>>
    getAuditLogs() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }
}