package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.AdvocateProfileResponse;
import com.ashutoshupadhyay.advocate.service.AdvocateProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class AdvocateProfileController {

    private final AdvocateProfileService service;

    public AdvocateProfileController(
            AdvocateProfileService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<AdvocateProfileResponse> getProfile() {

        return ResponseEntity.ok(
                service.getProfile()
        );
    }
}