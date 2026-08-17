package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.PracticeAreaResponse;
import com.ashutoshupadhyay.advocate.service.PracticeAreaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@Tag(
        name = "Practice Areas",
        description = "Public legal practice area APIs"
)
@RestController
@RequestMapping("/api/v1/practice-areas")
public class PracticeAreaController {

    private final PracticeAreaService service;

    public PracticeAreaController(
            PracticeAreaService service) {
        this.service = service;
    }

    @Operation(
            summary = "Get practice areas",
            description = "Returns all active practice areas"
    )

    @GetMapping
    public ResponseEntity<List<PracticeAreaResponse>>
    getPracticeAreas() {

        return ResponseEntity.ok(
                service.getActivePracticeAreas()
        );
    }

    @Operation(
            summary = "Get practice area by slug",
            description = "Returns an active practice area by its slug"
    )

    @GetMapping("/{slug}")
    public ResponseEntity<PracticeAreaResponse>
    getPracticeArea(@PathVariable String slug) {

        return ResponseEntity.ok(
                service.getBySlug(slug)
        );
    }
}