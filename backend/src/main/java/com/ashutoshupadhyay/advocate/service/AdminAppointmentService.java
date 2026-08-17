package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.UpdateAppointmentStatusRequest;
import com.ashutoshupadhyay.advocate.dto.response.AdminAppointmentResponse;
import com.ashutoshupadhyay.advocate.entity.Appointment;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminAppointmentService {

    private final AppointmentRepository repository;

    public AdminAppointmentService(
            AppointmentRepository repository) {
        this.repository = repository;
    }

    public List<AdminAppointmentResponse> getAll() {

        return repository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public AdminAppointmentResponse getById(Long id) {

        Appointment appointment = repository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found"
                        )
                );

        return toResponse(appointment);
    }

    @Transactional
    public AdminAppointmentResponse updateStatus(
            Long id,
            UpdateAppointmentStatusRequest request) {

        Appointment appointment = repository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found"
                        )
                );

        appointment.setStatus(request.status());

        return toResponse(appointment);
    }

    private AdminAppointmentResponse toResponse(
            Appointment appointment) {

        return new AdminAppointmentResponse(
                appointment.getId(),
                appointment.getFullName(),
                appointment.getMobile(),
                appointment.getEmail(),
                appointment.getPreferredDate(),
                appointment.getPreferredTime(),
                appointment.getMatterCategory(),
                appointment.getCommunicationMethod(),
                appointment.getShortNote(),
                appointment.getStatus(),
                appointment.getConsent(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt()
        );
    }
}