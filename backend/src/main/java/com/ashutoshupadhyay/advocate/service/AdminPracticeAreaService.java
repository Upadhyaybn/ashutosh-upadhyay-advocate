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
    private final AuditLogService auditLogService;

    public AdminPracticeAreaService(
            PracticeAreaRepository repository,
            AuditLogService auditLogService) {

        this.repository = repository;
        this.auditLogService = auditLogService;
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

        PracticeArea saved =
                repository.save(practiceArea);

        auditLogService.log(
                "CREATE_PRACTICE_AREA",
                "PRACTICE_AREA",
                saved.getId()
        );

        return toResponse(saved);
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
        auditLogService.log(
                "UPDATE_PRACTICE_AREA",
                "PRACTICE_AREA",
                practiceArea.getId()
        );

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
        auditLogService.log(
                "UPDATE_PRACTICE_AREA_STATUS",
                "PRACTICE_AREA",
                practiceArea.getId()
        );

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
        Long deletedId = practiceArea.getId();

        repository.delete(practiceArea);

        auditLogService.log(
                "DELETE_PRACTICE_AREA",
                "PRACTICE_AREA",
                deletedId
        );
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