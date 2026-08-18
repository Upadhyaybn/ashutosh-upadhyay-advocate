package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.UpdateEnquiryStatusRequest;
import com.ashutoshupadhyay.advocate.entity.Enquiry;
import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.EnquiryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminEnquiryServiceTest {

    @Mock
    private EnquiryRepository repository;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private AdminEnquiryService service;

    @Test
    void shouldReturnEnquiryById() {

        Enquiry enquiry = new Enquiry();
        enquiry.setId(1L);
        enquiry.setFullName("Test User");
        enquiry.setStatus(EnquiryStatus.NEW);

        when(repository.findById(1L))
                .thenReturn(Optional.of(enquiry));

        var response = service.getById(1L);

        assertEquals(1L, response.id());
        assertEquals("Test User", response.fullName());
    }

    @Test
    void shouldThrowWhenEnquiryNotFound() {

        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> service.getById(99L)
        );
    }

    @Test
    void shouldUpdateEnquiryStatus() {

        Enquiry enquiry = new Enquiry();
        enquiry.setId(1L);
        enquiry.setStatus(EnquiryStatus.NEW);

        when(repository.findById(1L))
                .thenReturn(Optional.of(enquiry));

        var request =
                new UpdateEnquiryStatusRequest(
                        EnquiryStatus.REVIEWED
                );

        var response =
                service.updateStatus(1L, request);

        assertEquals(
                EnquiryStatus.REVIEWED,
                response.status()
        );

        verify(auditLogService)
                .log(
                        "UPDATE_ENQUIRY_STATUS",
                        "ENQUIRY",
                        1L
                );
    }
}