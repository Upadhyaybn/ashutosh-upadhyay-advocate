package com.ashutoshupadhyay.advocate.repository;

import com.ashutoshupadhyay.advocate.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository
        extends JpaRepository<Enquiry, Long> {
}