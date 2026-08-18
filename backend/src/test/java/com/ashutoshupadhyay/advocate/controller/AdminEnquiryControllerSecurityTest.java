package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.dto.response.AdminEnquiryResponse;
import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;
import com.ashutoshupadhyay.advocate.service.AdminEnquiryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminEnquiryController.class)
class AdminEnquiryControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdminEnquiryService service;

    @Test
    void shouldRejectAdminEndpointWithoutAuthentication()
            throws Exception {

        mockMvc.perform(
                        get(
                                "/api/v1/admin/enquiries"
                        )
                )
                .andExpect(
                        status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(
            username = "admin",
            roles = "ADMIN"
    )
    void shouldAllowAdminUser()
            throws Exception {

        AdminEnquiryResponse response =
                new AdminEnquiryResponse(
                        1L,
                        "Test User",
                        "9876543210",
                        "test@example.com",
                        "Siddharthnagar",
                        "Civil Matter",
                        "Testing secured admin API",
                        EnquiryStatus.NEW,
                        true,
                        null,
                        null
                );

        when(service.getAll())
                .thenReturn(
                        List.of(response)
                );

        mockMvc.perform(
                        get(
                                "/api/v1/admin/enquiries"
                        )
                )
                .andExpect(
                        status().isOk()
                )
                .andExpect(
                        jsonPath("$[0].id")
                                .value(1)
                )
                .andExpect(
                        jsonPath("$[0].fullName")
                                .value(
                                        "Test User"
                                )
                );
    }
}