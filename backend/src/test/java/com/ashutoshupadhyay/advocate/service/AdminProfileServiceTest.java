package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.UpdateAdvocateProfileRequest;
import com.ashutoshupadhyay.advocate.entity.AdvocateProfile;
import com.ashutoshupadhyay.advocate.repository.AdvocateProfileRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminProfileServiceTest {

    @Mock
    private AdvocateProfileRepository repository;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private AdminProfileService service;

    @Test
    void shouldUpdateExistingProfileSuccessfully() {

        AdvocateProfile existing =
                new AdvocateProfile();

        existing.setId(1L);
        existing.setFullName("Old Name");

        UpdateAdvocateProfileRequest request =
                new UpdateAdvocateProfileRequest(
                        "Ashutosh Upadhyay",
                        "Advocate",
                        "Professional bio",
                        "Qualification",
                        "District Court Siddharthnagar",
                        "Hindi, English",
                        "9876543210",
                        "9876543210",
                        "test@example.com",
                        "Siddharthnagar, Uttar Pradesh",
                        "Monday to Saturday",
                        null
                );

        when(repository.findFirstByOrderByIdAsc())
                .thenReturn(Optional.of(existing));

        when(repository.save(existing))
                .thenReturn(existing);

        var response =
                service.updateProfile(request);

        assertEquals(
                "Ashutosh Upadhyay",
                response.fullName()
        );

        assertEquals(
                "Advocate",
                response.designation()
        );

        verify(repository)
                .save(existing);

        verify(auditLogService)
                .log(
                        "UPDATE_ADVOCATE_PROFILE",
                        "ADVOCATE_PROFILE",
                        1L
                );
    }

    @Test
    void shouldCreateProfileWhenProfileDoesNotExist() {

        UpdateAdvocateProfileRequest request =
                new UpdateAdvocateProfileRequest(
                        "Ashutosh Upadhyay",
                        "Advocate",
                        "Professional bio",
                        null,
                        "District Court Siddharthnagar",
                        "Hindi, English",
                        null,
                        null,
                        null,
                        "Siddharthnagar",
                        null,
                        null
                );

        when(repository.findFirstByOrderByIdAsc())
                .thenReturn(Optional.empty());

        when(repository.save(any(AdvocateProfile.class)))
                .thenAnswer(invocation -> {

                    AdvocateProfile profile =
                            invocation.getArgument(0);

                    profile.setId(1L);

                    return profile;
                });

        var response =
                service.updateProfile(request);

        assertNotNull(response);

        assertEquals(
                1L,
                response.id()
        );

        assertEquals(
                "Ashutosh Upadhyay",
                response.fullName()
        );

        verify(auditLogService)
                .log(
                        "UPDATE_ADVOCATE_PROFILE",
                        "ADVOCATE_PROFILE",
                        1L
                );
    }
}