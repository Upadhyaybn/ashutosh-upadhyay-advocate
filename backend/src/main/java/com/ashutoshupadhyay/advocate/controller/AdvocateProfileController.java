package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.AdvocateProfileResponse;
import com.ashutoshupadhyay.advocate.service.AdvocateProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;


@Tag(
        name = "Advocate Profile",
        description = "Public advocate profile APIs"
)
@RestController
@RequestMapping("/api/v1/profile")
public class AdvocateProfileController {

    private final AdvocateProfileService service;

    public AdvocateProfileController(
            AdvocateProfileService service) {
        this.service = service;
    }

    @Operation(
            summary = "Get advocate profile",
            description = "Returns the public advocate profile"
    )

    @GetMapping
    public ResponseEntity<AdvocateProfileResponse> getProfile() {

        return ResponseEntity.ok(
                service.getProfile()
        );
    }
}