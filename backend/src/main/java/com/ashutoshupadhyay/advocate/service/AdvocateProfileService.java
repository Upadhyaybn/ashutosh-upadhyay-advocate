package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.response.AdvocateProfileResponse;
import com.ashutoshupadhyay.advocate.entity.AdvocateProfile;
import com.ashutoshupadhyay.advocate.repository.AdvocateProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AdvocateProfileService {

    private final AdvocateProfileRepository repository;

    public AdvocateProfileService(AdvocateProfileRepository repository) {
        this.repository = repository;
    }

    public AdvocateProfileResponse getProfile() {

        AdvocateProfile profile = repository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Advocate profile not found"
                        )
                );

        return new AdvocateProfileResponse(
                profile.getId(),
                profile.getFullName(),
                profile.getDesignation(),
                profile.getProfessionalBio(),
                profile.getQualification(),
                profile.getCourtsOfPractice(),
                profile.getLanguages(),
                profile.getPhone(),
                profile.getWhatsapp(),
                profile.getEmail(),
                profile.getOfficeAddress(),
                profile.getOfficeHours(),
                profile.getPhotoUrl()
        );
    }
}