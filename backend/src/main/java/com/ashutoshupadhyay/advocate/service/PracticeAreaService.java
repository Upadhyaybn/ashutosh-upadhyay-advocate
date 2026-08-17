package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.response.PracticeAreaResponse;
import com.ashutoshupadhyay.advocate.entity.PracticeArea;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.PracticeAreaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PracticeAreaService {

    private final PracticeAreaRepository repository;

    public PracticeAreaService(
            PracticeAreaRepository repository) {
        this.repository = repository;
    }

    public List<PracticeAreaResponse> getActivePracticeAreas() {

        return repository
                .findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public PracticeAreaResponse getBySlug(String slug) {

        PracticeArea practiceArea =
                repository
                        .findBySlugAndActiveTrue(slug)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Practice area not found"
                                )
                        );

        return toResponse(practiceArea);
    }

    private PracticeAreaResponse toResponse(
            PracticeArea practiceArea) {

        return new PracticeAreaResponse(
                practiceArea.getId(),
                practiceArea.getName(),
                practiceArea.getSlug(),
                practiceArea.getShortDescription(),
                practiceArea.getDetailedDescription(),
                practiceArea.getDisplayOrder()
        );
    }
}