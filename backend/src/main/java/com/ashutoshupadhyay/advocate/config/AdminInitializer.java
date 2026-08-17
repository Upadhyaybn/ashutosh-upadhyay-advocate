package com.ashutoshupadhyay.advocate.config;

import com.ashutoshupadhyay.advocate.entity.AdminUser;
import com.ashutoshupadhyay.advocate.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner initializeAdmin(
            AdminUserRepository repository,
            PasswordEncoder passwordEncoder,
            @Value("${ADMIN_USERNAME:}") String username,
            @Value("${ADMIN_PASSWORD:}") String password) {

        return args -> {

            if (username.isBlank() || password.isBlank()) {
                return;
            }

            if (repository
                    .findByUsername(username)
                    .isPresent()) {
                return;
            }

            AdminUser admin = new AdminUser();

            admin.setUsername(username);

            admin.setPasswordHash(
                    passwordEncoder.encode(password)
            );

            admin.setRole("ROLE_ADMIN");
            admin.setEnabled(true);

            repository.save(admin);
        };
    }
}