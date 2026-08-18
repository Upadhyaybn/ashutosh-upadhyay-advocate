package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.PracticeAreaRequest;
import com.ashutoshupadhyay.advocate.dto.response.PracticeAreaResponse;
import com.ashutoshupadhyay.advocate.entity.PracticeArea;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.PracticeAreaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminPracticeAreaService {

    private final PracticeAreaRepository repository;

    public AdminPracticeAreaService(
            PracticeAreaRepository repository) {
        this.repository = repository;
    }

    public List<PracticeAreaResponse> getAll() {

        return repository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public PracticeAreaResponse create(
            PracticeAreaRequest request) {

        if (repository.existsBySlug(request.slug())) {
            throw new IllegalArgumentException(
                    "Practice area slug already exists"
            );
        }

        PracticeArea practiceArea =
                new PracticeArea();

        applyRequest(practiceArea, request);

        return toResponse(
                repository.save(practiceArea)
        );
    }

    @Transactional
    public PracticeAreaResponse update(
            Long id,
            PracticeAreaRequest request) {

        PracticeArea practiceArea =
                repository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Practice area not found"
                                )
                        );

        repository
                .findBySlug(request.slug())
                .filter(existing ->
                        !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException(
                            "Practice area slug already exists"
                    );
                });

        applyRequest(practiceArea, request);

        return toResponse(practiceArea);
    }

    @Transactional
    public PracticeAreaResponse updateStatus(
            Long id,
            boolean active) {

        PracticeArea practiceArea =
                repository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Practice area not found"
                                )
                        );

        practiceArea.setActive(active);

        return toResponse(practiceArea);
    }

    @Transactional
    public void delete(Long id) {

        PracticeArea practiceArea =
                repository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Practice area not found"
                                )
                        );

        repository.delete(practiceArea);
    }

    private void applyRequest(
            PracticeArea practiceArea,
            PracticeAreaRequest request) {

        practiceArea.setName(request.name());
        practiceArea.setSlug(request.slug());
        practiceArea.setShortDescription(
                request.shortDescription()
        );
        practiceArea.setDetailedDescription(
                request.detailedDescription()
        );
        practiceArea.setDisplayOrder(
                request.displayOrder()
        );
        practiceArea.setActive(
                request.active()
        );
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