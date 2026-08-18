package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.response.AuditLogResponse;
import com.ashutoshupadhyay.advocate.entity.AdminUser;
import com.ashutoshupadhyay.advocate.entity.AuditLog;
import com.ashutoshupadhyay.advocate.repository.AdminUserRepository;
import com.ashutoshupadhyay.advocate.repository.AuditLogRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AdminUserRepository adminUserRepository;

    public AuditLogService(
            AuditLogRepository auditLogRepository,
            AdminUserRepository adminUserRepository) {

        this.auditLogRepository = auditLogRepository;
        this.adminUserRepository = adminUserRepository;
    }

    @Transactional
    public void log(
            String action,
            String entityType,
            Long entityId) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {
            return;
        }

        AdminUser adminUser =
                adminUserRepository
                        .findByUsername(authentication.getName())
                        .orElse(null);

        AuditLog auditLog = new AuditLog();

        auditLog.setAdminUser(adminUser);
        auditLog.setAction(action);
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);

        auditLogRepository.save(auditLog);
    }

    @Transactional(readOnly = true)
    public List<AuditLogResponse> getAll() {

        return auditLogRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AuditLogResponse toResponse(
            AuditLog auditLog) {

        String username =
                auditLog.getAdminUser() != null
                        ? auditLog.getAdminUser().getUsername()
                        : null;

        return new AuditLogResponse(
                auditLog.getId(),
                username,
                auditLog.getAction(),
                auditLog.getEntityType(),
                auditLog.getEntityId(),
                auditLog.getCreatedAt()
        );
    }
}