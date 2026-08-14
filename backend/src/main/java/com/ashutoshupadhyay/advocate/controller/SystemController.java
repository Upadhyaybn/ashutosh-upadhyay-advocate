package com.ashutoshupadhyay.advocate.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public")
public class SystemController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {

        Map<String, Object> response = Map.of(
                "application", "advocate-api",
                "status", "UP",
                "timestamp", Instant.now()
        );

        return ResponseEntity.ok(response);
    }
}
