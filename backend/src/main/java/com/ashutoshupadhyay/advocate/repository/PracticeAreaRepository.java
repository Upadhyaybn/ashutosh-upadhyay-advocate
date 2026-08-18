package com.ashutoshupadhyay.advocate.repository;

import com.ashutoshupadhyay.advocate.entity.PracticeArea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PracticeAreaRepository
        extends JpaRepository<PracticeArea, Long> {

    List<PracticeArea> findByActiveTrueOrderByDisplayOrderAsc();

    Optional<PracticeArea> findBySlugAndActiveTrue(String slug);

    Optional<PracticeArea> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<PracticeArea> findAllByOrderByDisplayOrderAsc();
}