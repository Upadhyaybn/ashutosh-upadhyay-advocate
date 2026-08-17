package com.ashutoshupadhyay.advocate.repository;

import com.ashutoshupadhyay.advocate.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {
}