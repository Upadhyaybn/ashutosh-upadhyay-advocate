package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.AppointmentRequest;
import com.ashutoshupadhyay.advocate.dto.response.CreateResponse;
import com.ashutoshupadhyay.advocate.entity.Appointment;
import com.ashutoshupadhyay.advocate.enums.AppointmentStatus;
import com.ashutoshupadhyay.advocate.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(
            AppointmentRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public CreateResponse create(
            AppointmentRequest request) {

        Appointment appointment = new Appointment();

        appointment.setFullName(request.fullName());
        appointment.setMobile(request.mobile());
        appointment.setEmail(request.email());
        appointment.setPreferredDate(request.preferredDate());
        appointment.setPreferredTime(request.preferredTime());
        appointment.setMatterCategory(request.matterCategory());
        appointment.setCommunicationMethod(
                request.communicationMethod()
        );
        appointment.setShortNote(request.shortNote());
        appointment.setConsent(request.consent());

        appointment.setStatus(
                AppointmentStatus.REQUESTED
        );

        Appointment saved =
                repository.save(appointment);

        return new CreateResponse(
                saved.getId(),
                "Appointment request submitted successfully"
        );
    }
}