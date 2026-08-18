package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.UpdateEnquiryStatusRequest;
import com.ashutoshupadhyay.advocate.dto.response.AdminEnquiryResponse;
import com.ashutoshupadhyay.advocate.entity.Enquiry;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminEnquiryService {

    private final EnquiryRepository repository;
    private final AuditLogService auditLogService;

    public AdminEnquiryService(
            EnquiryRepository repository,
            AuditLogService auditLogService) {

        this.repository = repository;
        this.auditLogService = auditLogService;

    }

    public List<AdminEnquiryResponse> getAll() {

        return repository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public AdminEnquiryResponse getById(Long id) {

        Enquiry enquiry = repository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Enquiry not found"
                        )
                );

        return toResponse(enquiry);
    }

    @Transactional
    public AdminEnquiryResponse updateStatus(
            Long id,
            UpdateEnquiryStatusRequest request) {

        Enquiry enquiry = repository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Enquiry not found"
                        )
                );

        enquiry.setStatus(request.status());
        auditLogService.log(
                "UPDATE_ENQUIRY_STATUS",
                "ENQUIRY",
                enquiry.getId()
        );

        return toResponse(enquiry);
    }

    private AdminEnquiryResponse toResponse(
            Enquiry enquiry) {

        return new AdminEnquiryResponse(
                enquiry.getId(),
                enquiry.getFullName(),
                enquiry.getMobile(),
                enquiry.getEmail(),
                enquiry.getCityDistrict(),
                enquiry.getCategory(),
                enquiry.getDescription(),
                enquiry.getStatus(),
                enquiry.getConsent(),
                enquiry.getCreatedAt(),
                enquiry.getUpdatedAt()
        );
    }
}