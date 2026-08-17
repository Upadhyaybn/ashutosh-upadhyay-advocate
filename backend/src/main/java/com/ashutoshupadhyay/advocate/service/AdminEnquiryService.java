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

    public AdminEnquiryService(
            EnquiryRepository repository) {
        this.repository = repository;
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