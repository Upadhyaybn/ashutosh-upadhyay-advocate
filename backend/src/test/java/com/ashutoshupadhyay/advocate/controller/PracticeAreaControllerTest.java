package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.exception.GlobalExceptionHandler;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.service.PracticeAreaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PracticeAreaController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class PracticeAreaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PracticeAreaService service;

    @Test
    void shouldReturnNotFoundForMissingPracticeArea()
            throws Exception {

        when(service.getBySlug(
                "not-existing"
        )).thenThrow(
                new ResourceNotFoundException(
                        "Practice area not found"
                )
        );

        mockMvc.perform(
                        get(
                                "/api/v1/practice-areas/not-existing"
                        )
                )
                .andExpect(
                        status().isNotFound()
                )
                .andExpect(
                        jsonPath("$.status")
                                .value(404)
                )
                .andExpect(
                        jsonPath("$.message")
                                .value(
                                        "Practice area not found"
                                )
                );
    }
}