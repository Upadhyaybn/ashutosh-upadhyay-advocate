package com.ashutoshupadhyay.advocate.repository;

import com.ashutoshupadhyay.advocate.entity.Appointment;
import com.ashutoshupadhyay.advocate.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByOrderByCreatedAtDesc();

    List<Appointment> findByStatusOrderByCreatedAtDesc(
            AppointmentStatus status
    );
}