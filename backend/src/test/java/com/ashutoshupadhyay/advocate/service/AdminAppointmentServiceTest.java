package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.UpdateAppointmentStatusRequest;
import com.ashutoshupadhyay.advocate.entity.Appointment;
import com.ashutoshupadhyay.advocate.enums.AppointmentStatus;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminAppointmentServiceTest {

    @Mock
    private AppointmentRepository repository;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private AdminAppointmentService service;

    @Test
    void shouldReturnAppointmentById() {

        Appointment appointment = new Appointment();
        appointment.setId(1L);
        appointment.setFullName("Test User");
        appointment.setMobile("9876543210");
        appointment.setEmail("test@example.com");
        appointment.setPreferredDate(
                LocalDate.now().plusDays(2)
        );
        appointment.setPreferredTime(
                LocalTime.of(11, 30)
        );
        appointment.setMatterCategory("Civil Matter");
        appointment.setCommunicationMethod("PHONE");
        appointment.setShortNote("Test appointment");
        appointment.setStatus(
                AppointmentStatus.REQUESTED
        );
        appointment.setConsent(true);

        when(repository.findById(1L))
                .thenReturn(Optional.of(appointment));

        var response =
                service.getById(1L);

        assertEquals(
                1L,
                response.id()
        );

        assertEquals(
                "Test User",
                response.fullName()
        );

        assertEquals(
                AppointmentStatus.REQUESTED,
                response.status()
        );
    }

    @Test
    void shouldThrowWhenAppointmentNotFound() {

        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> service.getById(99L)
        );
    }

    @Test
    void shouldUpdateAppointmentStatus() {

        Appointment appointment = new Appointment();
        appointment.setId(1L);
        appointment.setStatus(
                AppointmentStatus.REQUESTED
        );

        when(repository.findById(1L))
                .thenReturn(Optional.of(appointment));

        UpdateAppointmentStatusRequest request =
                new UpdateAppointmentStatusRequest(
                        AppointmentStatus.CONFIRMED
                );

        var response =
                service.updateStatus(
                        1L,
                        request
                );

        assertEquals(
                AppointmentStatus.CONFIRMED,
                response.status()
        );

        verify(auditLogService)
                .log(
                        "UPDATE_APPOINTMENT_STATUS",
                        "APPOINTMENT",
                        1L
                );
    }
}