package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.EnquiryRequest;
import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.entity.Enquiry;
import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;
import com.ashutoshupadhyay.advocate.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnquiryService {

    private final EnquiryRepository repository;

    public EnquiryService(EnquiryRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public CreateResponse create(EnquiryRequest request) {

        Enquiry enquiry = new Enquiry();

        enquiry.setFullName(request.fullName());
        enquiry.setMobile(request.mobile());
        enquiry.setEmail(request.email());
        enquiry.setCityDistrict(request.cityDistrict());
        enquiry.setCategory(request.category());
        enquiry.setDescription(request.description());
        enquiry.setConsent(request.consent());
        enquiry.setStatus(EnquiryStatus.NEW);

        Enquiry saved = repository.save(enquiry);

        return new CreateResponse(
                saved.getId(),
                "Enquiry submitted successfully"
        );
    }
}