package com.ashutoshupadhyay.advocate.repository;

import com.ashutoshupadhyay.advocate.entity.AdvocateProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdvocateProfileRepository
        extends JpaRepository<AdvocateProfile, Long> {

    Optional<AdvocateProfile> findFirstByOrderByIdAsc();
}