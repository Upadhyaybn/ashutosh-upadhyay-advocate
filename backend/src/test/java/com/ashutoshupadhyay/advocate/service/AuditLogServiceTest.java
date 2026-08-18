package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.response.AuditLogResponse;
import com.ashutoshupadhyay.advocate.entity.AdminUser;
import com.ashutoshupadhyay.advocate.entity.AuditLog;
import com.ashutoshupadhyay.advocate.repository.AdminUserRepository;
import com.ashutoshupadhyay.advocate.repository.AuditLogRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuditLogServiceTest {

    @Mock
    private AuditLogRepository auditLogRepository;

    @Mock
    private AdminUserRepository adminUserRepository;

    @InjectMocks
    private AuditLogService service;

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void shouldCreateAuditLogForAuthenticatedAdmin() {

        AdminUser adminUser = new AdminUser();
        adminUser.setId(1L);
        adminUser.setUsername("admin");

        UsernamePasswordAuthenticationToken authentication =
                UsernamePasswordAuthenticationToken.authenticated(
                        "admin",
                        null,
                        List.of()
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        when(adminUserRepository.findByUsername("admin"))
                .thenReturn(Optional.of(adminUser));

        when(auditLogRepository.save(any(AuditLog.class)))
                .thenAnswer(invocation ->
                        invocation.getArgument(0)
                );

        service.log(
                "UPDATE_ENQUIRY_STATUS",
                "ENQUIRY",
                10L
        );

        verify(auditLogRepository)
                .save(any(AuditLog.class));
    }

    @Test
    void shouldNotCreateAuditLogWhenAuthenticationIsMissing() {

        SecurityContextHolder.clearContext();

        service.log(
                "UPDATE_ENQUIRY_STATUS",
                "ENQUIRY",
                10L
        );

        verifyNoInteractions(
                auditLogRepository
        );

        verifyNoInteractions(
                adminUserRepository
        );
    }

    @Test
    void shouldReturnAuditLogsNewestFirst() {

        AdminUser adminUser = new AdminUser();
        adminUser.setId(1L);
        adminUser.setUsername("admin");

        AuditLog auditLog = new AuditLog();
      //  auditLog.setId(1L);
        auditLog.setAdminUser(adminUser);
        auditLog.setAction(
                "UPDATE_ENQUIRY_STATUS"
        );
        auditLog.setEntityType(
                "ENQUIRY"
        );
        auditLog.setEntityId(10L);

        when(auditLogRepository
                .findAllByOrderByCreatedAtDesc())
                .thenReturn(
                        List.of(auditLog)
                );

        List<AuditLogResponse> response =
                service.getAll();

        assertNotNull(response);

        assertEquals(
                1,
                response.size()
        );

        assertEquals(
                "admin",
                response.getFirst().username()
        );

        assertEquals(
                "UPDATE_ENQUIRY_STATUS",
                response.getFirst().action()
        );

        assertEquals(
                "ENQUIRY",
                response.getFirst().entityType()
        );

        assertEquals(
                10L,
                response.getFirst().entityId()
        );
    }
}