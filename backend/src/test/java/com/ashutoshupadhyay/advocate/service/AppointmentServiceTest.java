package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.AppointmentRequest;
import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.entity.Appointment;
import com.ashutoshupadhyay.advocate.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private AppointmentRepository repository;

    @InjectMocks
    private AppointmentService service;

    @Test
    void shouldCreateAppointmentSuccessfully() {

        AppointmentRequest request =
                new AppointmentRequest(
                        "Test User",
                        "9876543210",
                        "test@example.com",
                        LocalDate.now().plusDays(2),
                        LocalTime.of(11, 30),
                        "Civil Matter",
                        "PHONE",
                        "Test appointment",
                        true
                );

        Appointment saved = new Appointment();
        saved.setId(10L);

        when(repository.save(any(Appointment.class)))
                .thenReturn(saved);

        CreateResponse response =
                service.create(request);

        assertEquals(10L, response.id());

        verify(repository)
                .save(any(Appointment.class));
    }
}