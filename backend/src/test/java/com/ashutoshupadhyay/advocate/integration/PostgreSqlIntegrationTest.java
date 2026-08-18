package com.ashutoshupadhyay.advocate.integration;

import com.ashutoshupadhyay.advocate.entity.Enquiry;
import com.ashutoshupadhyay.advocate.enums.EnquiryStatus;
import com.ashutoshupadhyay.advocate.repository.EnquiryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Testcontainers
@SpringBootTest
@ActiveProfiles("test")
class PostgreSqlIntegrationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres =
            new PostgreSQLContainer<>(
                    "postgres:18"
            );

    @Autowired
    private EnquiryRepository repository;

    @Test
    @Transactional
    void shouldPersistEnquiryInPostgreSql() {

        Enquiry enquiry =
                new Enquiry();

        enquiry.setFullName(
                "Integration Test User"
        );

        enquiry.setMobile(
                "9876543210"
        );

        enquiry.setEmail(
                "integration@test.com"
        );

        enquiry.setDescription(
                "Testing PostgreSQL with Testcontainers"
        );

        enquiry.setStatus(
                EnquiryStatus.NEW
        );

        enquiry.setConsent(
                true
        );

        Enquiry saved =
                repository.saveAndFlush(
                        enquiry
                );

        assertNotNull(
                saved.getId()
        );

        Enquiry loaded =
                repository
                        .findById(
                                saved.getId()
                        )
                        .orElseThrow();

        assertEquals(
                "Integration Test User",
                loaded.getFullName()
        );

        assertEquals(
                EnquiryStatus.NEW,
                loaded.getStatus()
        );
    }
}