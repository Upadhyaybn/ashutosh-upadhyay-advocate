package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.EnquiryRequest;
import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.entity.Enquiry;
import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;
import com.ashutoshupadhyay.advocate.repository.EnquiryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EnquiryServiceTest {

    @Mock
    private EnquiryRepository repository;

    @InjectMocks
    private EnquiryService service;

    private EnquiryRequest request;

    @BeforeEach
    void setUp() {
        request = new EnquiryRequest(
                "Test User",
                "9876543210",
                "test@example.com",
                "Siddharthnagar",
                "Civil Matter",
                "Test enquiry",
                true
        );
    }

    @Test
    void shouldCreateEnquirySuccessfully() {

        Enquiry saved = new Enquiry();
        saved.setId(1L);
        saved.setStatus(EnquiryStatus.NEW);

        when(repository.save(any(Enquiry.class)))
                .thenReturn(saved);

        CreateResponse response =
                service.create(request);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals(
                "Enquiry submitted successfully",
                response.message()
        );

        verify(repository, times(1))
                .save(any(Enquiry.class));
    }
}