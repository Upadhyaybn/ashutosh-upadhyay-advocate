package com.ashutoshupadhyay.advocate.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class EnquiryApiIntegrationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres =
            new PostgreSQLContainer<>(
                    "postgres:18"
            );

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldCreateEnquiryEndToEnd()
            throws Exception {

        String requestBody =
                """
                {
                  "fullName": "Integration User",
                  "mobile": "9876543210",
                  "email": "integration@example.com",
                  "cityDistrict": "Siddharthnagar",
                  "category": "Civil Matter",
                  "description": "Integration API test",
                  "consent": true
                }
                """;

        mockMvc.perform(
                        post(
                                "/api/v1/enquiries"
                        )
                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )
                                .content(
                                        requestBody
                                )
                )
                .andExpect(
                        status().isCreated()
                )
                .andExpect(
                        jsonPath("$.id")
                                .isNumber()
                )
                .andExpect(
                        jsonPath("$.message")
                                .value(
                                        "Enquiry submitted successfully"
                                )
                );
    }
}