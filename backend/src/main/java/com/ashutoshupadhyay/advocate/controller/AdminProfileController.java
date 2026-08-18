package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.request.UpdateAdvocateProfileRequest;
import com.ashutoshupadhyay.advocate.dto.response.AdvocateProfileResponse;
import com.ashutoshupadhyay.advocate.service.AdminProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/profile")
@Tag(
        name = "Admin Profile",
        description = "Protected advocate profile management APIs"
)
@SecurityRequirement(name = "bearerAuth")
public class AdminProfileController {

    private final AdminProfileService service;

    public AdminProfileController(
            AdminProfileService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get advocate profile for admin")
    public ResponseEntity<AdvocateProfileResponse>
    getProfile() {

        return ResponseEntity.ok(
                service.getProfile()
        );
    }

    @PutMapping
    @Operation(summary = "Create or update advocate profile")
    public ResponseEntity<AdvocateProfileResponse>
    updateProfile(
            @Valid
            @RequestBody
            UpdateAdvocateProfileRequest request) {

        return ResponseEntity.ok(
                service.updateProfile(request)
        );
    }
}