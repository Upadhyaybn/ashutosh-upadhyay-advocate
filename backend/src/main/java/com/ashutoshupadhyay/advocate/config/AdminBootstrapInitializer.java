package com.ashutoshupadhyay.advocate.config;

import com.ashutoshupadhyay.advocate.entity.AdminUser;
import com.ashutoshupadhyay.advocate.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Profile("prod")
public class AdminBootstrapInitializer implements CommandLineRunner {

    private static final Logger log =
            LoggerFactory.getLogger(AdminBootstrapInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    private final String adminUsername;
    private final String adminPassword;

    public AdminBootstrapInitializer(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            @Value("${ADMIN_USERNAME:}") String adminUsername,
            @Value("${ADMIN_PASSWORD:}") String adminPassword) {

        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(String... args) {

        if (adminUsername == null
                || adminUsername.isBlank()
                || adminPassword == null
                || adminPassword.isBlank()) {

            log.warn(
                    "Admin bootstrap skipped because ADMIN_USERNAME or ADMIN_PASSWORD is not configured."
            );

            return;
        }

        if (adminUserRepository
                .findByUsername(adminUsername)
                .isPresent()) {

            log.info(
                    "Admin bootstrap skipped because admin user already exists."
            );

            return;
        }

        AdminUser adminUser = new AdminUser();

        adminUser.setUsername(adminUsername);

        adminUser.setPasswordHash(
                passwordEncoder.encode(adminPassword)
        );

        adminUser.setRole("ROLE_ADMIN");
        adminUser.setEnabled(true);

        adminUserRepository.save(adminUser);

        log.info(
                "Initial admin user created successfully."
        );
    }
}