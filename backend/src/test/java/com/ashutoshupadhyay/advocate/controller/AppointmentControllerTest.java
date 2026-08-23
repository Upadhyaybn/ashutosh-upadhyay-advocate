package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.service.AppointmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AppointmentController.class)
@AutoConfigureMockMvc(addFilters = false)
class AppointmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AppointmentService appointmentService;

    @Test
    void shouldCreateAppointmentWithValidRequest()
            throws Exception {

        when(appointmentService.create(any()))
                .thenReturn(
                        new CreateResponse(
                                1L,
                                "Appointment request submitted successfully"
                        )
                );

        String futureDate =
                LocalDate.now()
                        .plusDays(7)
                        .toString();

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "9876543210",
                  "email": "test@example.com",
                  "preferredDate": "%s",
                  "preferredTime": "11:30:00",
                  "matterCategory": "Civil Matter",
                  "communicationMethod": "PHONE",
                  "shortNote": "Testing appointment controller",
                  "consent": true
                }
                """.formatted(futureDate);

        mockMvc.perform(
                        post("/api/v1/appointments")
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
                                        "Appointment request submitted successfully"
                                )
                );
    }

    @Test
    void shouldReturnBadRequestForInvalidMobile()
            throws Exception {

        String futureDate =
                LocalDate.now()
                        .plusDays(7)
                        .toString();

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "1234",
                  "email": "test@example.com",
                  "preferredDate": "%s",
                  "consent": true
                }
                """.formatted(futureDate);

        mockMvc.perform(
                        post("/api/v1/appointments")
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
    void shouldReturnBadRequestForPastDate()
            throws Exception {

        String pastDate =
                LocalDate.now()
                        .minusDays(1)
                        .toString();

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "9876543210",
                  "email": "test@example.com",
                  "preferredDate": "%s",
                  "consent": true
                }
                """.formatted(pastDate);

        mockMvc.perform(
                        post("/api/v1/appointments")
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

        String futureDate =
                LocalDate.now()
                        .plusDays(7)
                        .toString();

        String requestBody =
                """
                {
                  "fullName": "Test User",
                  "mobile": "9876543210",
                  "email": "test@example.com",
                  "preferredDate": "%s",
                  "consent": false
                }
                """.formatted(futureDate);

        mockMvc.perform(
                        post("/api/v1/appointments")
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