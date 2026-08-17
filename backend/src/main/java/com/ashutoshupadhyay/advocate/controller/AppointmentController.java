package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.request.AppointmentRequest;
import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(
            AppointmentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CreateResponse> create(
            @Valid @RequestBody AppointmentRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.create(request));
    }
}