package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.UpdateAdvocateProfileRequest;
import com.ashutoshupadhyay.advocate.dto.response.AdvocateProfileResponse;
import com.ashutoshupadhyay.advocate.entity.AdvocateProfile;
import com.ashutoshupadhyay.advocate.repository.AdvocateProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminProfileService {

    private final AdvocateProfileRepository repository;
    private final AuditLogService auditLogService;

    public AdminProfileService(
            AdvocateProfileRepository repository,
            AuditLogService auditLogService) {

        this.repository = repository;
        this.auditLogService = auditLogService;
    }

    public AdvocateProfileResponse getProfile() {

        AdvocateProfile profile =
                repository
                        .findFirstByOrderByIdAsc()
                        .orElseGet(AdvocateProfile::new);

        return toResponse(profile);
    }

    @Transactional
    public AdvocateProfileResponse updateProfile(
            UpdateAdvocateProfileRequest request) {

        AdvocateProfile profile =
                repository
                        .findFirstByOrderByIdAsc()
                        .orElseGet(AdvocateProfile::new);

        profile.setFullName(request.fullName());
        profile.setDesignation(request.designation());
        profile.setProfessionalBio(request.professionalBio());
        profile.setQualification(request.qualification());
        profile.setCourtsOfPractice(request.courtsOfPractice());
        profile.setLanguages(request.languages());
        profile.setPhone(request.phone());
        profile.setWhatsapp(request.whatsapp());
        profile.setEmail(request.email());
        profile.setOfficeAddress(request.officeAddress());
        profile.setOfficeHours(request.officeHours());
        profile.setPhotoUrl(request.photoUrl());

        AdvocateProfile saved =
                repository.save(profile);
        auditLogService.log(
                "UPDATE_ADVOCATE_PROFILE",
                "ADVOCATE_PROFILE",
                saved.getId()
        );

        return toResponse(saved);
    }

    private AdvocateProfileResponse toResponse(
            AdvocateProfile profile) {

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