package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.PracticeAreaResponse;
import com.ashutoshupadhyay.advocate.service.PracticeAreaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/practice-areas")
public class PracticeAreaController {

    private final PracticeAreaService service;

    public PracticeAreaController(
            PracticeAreaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<PracticeAreaResponse>>
    getPracticeAreas() {

        return ResponseEntity.ok(
                service.getActivePracticeAreas()
        );
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PracticeAreaResponse>
    getPracticeArea(@PathVariable String slug) {

        return ResponseEntity.ok(
                service.getBySlug(slug)
        );
    }
}