package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.service.EnquiryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EnquiryController.class)
@AutoConfigureMockMvc(addFilters = false)
class EnquiryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EnquiryService enquiryService;

    @Test
    void shouldCreateEnquiryWithValidRequest()
            throws Exception {

        when(enquiryService.create(any()))
                .thenReturn(
                        new CreateResponse(
                                1L,
                                "Enquiry submitted successfully"
                        )
                );

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "9876543210",
                  "email": "test@example.com",
                  "cityDistrict": "Siddharthnagar",
                  "category": "Civil Matter",
                  "description": "Testing enquiry controller",
                  "consent": true
                }
                """;

        mockMvc.perform(
                        post("/api/v1/enquiries")
                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )
                                .content(requestBody)
                )
                .andExpect(
                        status().isCreated()
                )
                .andExpect(
                        jsonPath("$.id")
                                .value(1)
                )
                .andExpect(
                        jsonPath("$.message")
                                .value(
                                        "Enquiry submitted successfully"
                                )
                );
    }

    @Test
    void shouldReturnBadRequestForInvalidMobile()
            throws Exception {

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "1234",
                  "email": "test@example.com",
                  "description": "Test enquiry",
                  "consent": true
                }
                """;

        mockMvc.perform(
                        post("/api/v1/enquiries")
                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )
                                .content(requestBody)
                )
                .andExpect(
                        status().isBadRequest()
                );
    }

    @Test
    void shouldReturnBadRequestWhenConsentIsFalse()
            throws Exception {

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "9876543210",
                  "email": "test@example.com",
                  "description": "Test enquiry",
                  "consent": false
                }
                """;

        mockMvc.perform(
                        post("/api/v1/enquiries")
                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )
                                .content(requestBody)
                )
                .andExpect(
                        status().isBadRequest()
                );
    }

    @Test
    void shouldReturnBadRequestWhenNameIsBlank()
            throws Exception {

        String requestBody =
                """
                {
                  "fullName": "",
                  "mobile": "9876543210",
                  "email": "test@example.com",
                  "description": "Test enquiry",
                  "consent": true
                }
                """;

        mockMvc.perform(
                        post("/api/v1/enquiries")
                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )
                                .content(requestBody)
                )
                .andExpect(
                        status().isBadRequest()
                );
    }
}