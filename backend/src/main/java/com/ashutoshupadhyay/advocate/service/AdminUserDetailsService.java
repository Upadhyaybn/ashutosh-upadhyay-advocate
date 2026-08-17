package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.entity.AdminUser;
import com.ashutoshupadhyay.advocate.repository.AdminUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminUserDetailsService implements UserDetailsService {

    private final AdminUserRepository repository;

    public AdminUserDetailsService(
            AdminUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        AdminUser admin = repository
                .findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Invalid username or password"
                        )
                );

        return User.builder()
                .username(admin.getUsername())
                .password(admin.getPasswordHash())
                .authorities(admin.getRole())
                .disabled(!Boolean.TRUE.equals(admin.getEnabled()))
                .build();
    }
}