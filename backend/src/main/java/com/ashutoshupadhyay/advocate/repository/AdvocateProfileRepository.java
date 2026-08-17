package com.ashutoshupadhyay.advocate.repository;

import com.ashutoshupadhyay.advocate.entity.AdvocateProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvocateProfileRepository
        extends JpaRepository<AdvocateProfile, Long> {
}