package com.ashutoshupadhyay.advocate.controller;

import com.ashutoshupadhyay.advocate.config.CorsConfig;
import com.ashutoshupadhyay.advocate.config.JwtConfig;
import com.ashutoshupadhyay.advocate.config.SecurityConfig;
import com.ashutoshupadhyay.advocate.security.CustomAccessDeniedHandler;
import com.ashutoshupadhyay.advocate.security.CustomAuthenticationEntryPoint;
import com.ashutoshupadhyay.advocate.service.AdminAppointmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/*
 * Imports the real SecurityConfig (not Boot's WebMvcTest security
 * fallback) so these tests exercise the actual production filter
 * chain - path-based hasRole("ADMIN") rule, CSRF disabled for this
 * stateless API, and the real 401/403 JSON handlers - rather than
 * Boot's default (CSRF-enabled) security which would otherwise mask
 * a real 401/204 behind a false 403.
 */
@WebMvcTest(AdminAppointmentController.class)
@Import({
        SecurityConfig.class,
        JwtConfig.class,
        CorsConfig.class,
        CustomAuthenticationEntryPoint.class,
        CustomAccessDeniedHandler.class,
})
@TestPropertySource(
        properties = {
                "security.jwt.secret=TestOnlyJwtSecretKeyForAdvocateApi2026Minimum32Chars",
                "security.jwt.issuer=ashutosh-upadhyay-advocate-api",
        }
)
class AdminAppointmentControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdminAppointmentService service;

    @Test
    void shouldRejectAdminEndpointWithoutAuthentication()
            throws Exception {

        mockMvc.perform(
                        get(
                                "/api/v1/admin/appointments"
                        )
                )
                .andExpect(
                        status().isUnauthorized()
                );
    }

    @Test
    void shouldRejectDeleteWithoutAuthentication()
            throws Exception {

        mockMvc.perform(
                        delete(
                                "/api/v1/admin/appointments/1"
                        )
                )
                .andExpect(
                        status().isUnauthorized()
                );

        verify(service, never())
                .delete(1L);
    }

    @Test
    @WithMockUser(
            username = "user",
            roles = "USER"
    )
    void shouldRejectDeleteForNonAdminUser()
            throws Exception {

        mockMvc.perform(
                        delete(
                                "/api/v1/admin/appointments/1"
                        )
                )
                .andExpect(
                        status().isForbidden()
                );

        verify(service, never())
                .delete(1L);
    }

    @Test
    @WithMockUser(
            username = "admin",
            roles = "ADMIN"
    )
    void shouldAllowAdminToDeleteAppointment()
            throws Exception {

        doNothing()
                .when(service)
                .delete(1L);

        mockMvc.perform(
                        delete(
                                "/api/v1/admin/appointments/1"
                        )
                )
                .andExpect(
                        status().isNoContent()
                );

        verify(service)
                .delete(1L);
    }
}
