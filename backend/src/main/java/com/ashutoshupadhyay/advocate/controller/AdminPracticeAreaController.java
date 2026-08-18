package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.request.PracticeAreaRequest;
import com.ashutoshupadhyay.advocate.dto.request.UpdatePracticeAreaStatusRequest;
import com.ashutoshupadhyay.advocate.dto.response.PracticeAreaResponse;
import com.ashutoshupadhyay.advocate.service.AdminPracticeAreaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/practice-areas")
@Tag(
        name = "Admin Practice Areas",
        description = "Protected practice-area management APIs"
)
@SecurityRequirement(name = "bearerAuth")
public class AdminPracticeAreaController {

    private final AdminPracticeAreaService service;

    public AdminPracticeAreaController(
            AdminPracticeAreaService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get all practice areas")
    public ResponseEntity<List<PracticeAreaResponse>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @PostMapping
    @Operation(summary = "Create practice area")
    public ResponseEntity<PracticeAreaResponse>
    create(
            @Valid
            @RequestBody
            PracticeAreaRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update practice area")
    public ResponseEntity<PracticeAreaResponse>
    update(
            @PathVariable Long id,
            @Valid
            @RequestBody
            PracticeAreaRequest request) {

        return ResponseEntity.ok(
                service.update(id, request)
        );
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Activate or deactivate practice area")
    public ResponseEntity<PracticeAreaResponse>
    updateStatus(
            @PathVariable Long id,
            @Valid
            @RequestBody
            UpdatePracticeAreaStatusRequest request) {

        return ResponseEntity.ok(
                service.updateStatus(
                        id,
                        request.active()
                )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete practice area")
    public ResponseEntity<Void>
    delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}