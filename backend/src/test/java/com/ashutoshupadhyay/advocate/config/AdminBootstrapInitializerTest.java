package com.ashutoshupadhyay.advocate.config;

import com.ashutoshupadhyay.advocate.entity.AdminUser;
import com.ashutoshupadhyay.advocate.repository.AdminUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminBootstrapInitializerTest {

    @Mock
    private AdminUserRepository adminUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void shouldCreateAdminWhenAdminDoesNotExist()
            throws Exception {

        String username = "admin";
        String password = "StrongAdminPassword123!";

        when(
                adminUserRepository.findByUsername(
                        username
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                passwordEncoder.encode(
                        password
                )
        ).thenReturn(
                "$2a$10$encodedPassword"
        );

        AdminBootstrapInitializer initializer =
                new AdminBootstrapInitializer(
                        adminUserRepository,
                        passwordEncoder,
                        username,
                        password
                );

        initializer.run();

        verify(
                adminUserRepository
        ).findByUsername(
                username
        );

        verify(
                passwordEncoder
        ).encode(
                password
        );

        verify(
                adminUserRepository
        ).save(
                any(AdminUser.class)
        );
    }

    @Test
    void shouldSkipBootstrapWhenAdminAlreadyExists()
            throws Exception {

        String username = "admin";
        String password = "StrongAdminPassword123!";

        AdminUser existingAdmin =
                new AdminUser();

        existingAdmin.setUsername(
                username
        );

        when(
                adminUserRepository.findByUsername(
                        username
                )
        ).thenReturn(
                Optional.of(
                        existingAdmin
                )
        );

        AdminBootstrapInitializer initializer =
                new AdminBootstrapInitializer(
                        adminUserRepository,
                        passwordEncoder,
                        username,
                        password
                );

        initializer.run();

        verify(
                adminUserRepository
        ).findByUsername(
                username
        );

        verify(
                passwordEncoder,
                never()
        ).encode(
                any()
        );

        verify(
                adminUserRepository,
                never()
        ).save(
                any(AdminUser.class)
        );
    }

    @Test
    void shouldSkipBootstrapWhenUsernameIsMissing()
            throws Exception {

        AdminBootstrapInitializer initializer =
                new AdminBootstrapInitializer(
                        adminUserRepository,
                        passwordEncoder,
                        "",
                        "StrongAdminPassword123!"
                );

        initializer.run();

        verifyNoInteractions(
                adminUserRepository
        );

        verifyNoInteractions(
                passwordEncoder
        );
    }

    @Test
    void shouldSkipBootstrapWhenPasswordIsMissing()
            throws Exception {

        AdminBootstrapInitializer initializer =
                new AdminBootstrapInitializer(
                        adminUserRepository,
                        passwordEncoder,
                        "admin",
                        ""
                );

        initializer.run();

        verifyNoInteractions(
                adminUserRepository
        );

        verifyNoInteractions(
                passwordEncoder
        );
    }
}