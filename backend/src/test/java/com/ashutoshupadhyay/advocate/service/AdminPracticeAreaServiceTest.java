package com.ashutoshupadhyay.advocate.service;

import com.ashutoshupadhyay.advocate.dto.request.PracticeAreaRequest;
import com.ashutoshupadhyay.advocate.entity.PracticeArea;
import com.ashutoshupadhyay.advocate.exception.ResourceNotFoundException;
import com.ashutoshupadhyay.advocate.repository.PracticeAreaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminPracticeAreaServiceTest {

    @Mock
    private PracticeAreaRepository repository;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private AdminPracticeAreaService service;

    @Test
    void shouldCreatePracticeAreaSuccessfully() {

        PracticeAreaRequest request =
                new PracticeAreaRequest(
                        "Civil Law",
                        "civil-law",
                        "Civil legal matters",
                        "Detailed civil law description",
                        1,
                        true
                );

        when(repository.existsBySlug("civil-law"))
                .thenReturn(false);

        when(repository.save(any(PracticeArea.class)))
                .thenAnswer(invocation -> {

                    PracticeArea practiceArea =
                            invocation.getArgument(0);

                    practiceArea.setId(1L);

                    return practiceArea;
                });

        var response =
                service.create(request);

        assertNotNull(response);

        assertEquals(
                1L,
                response.id()
        );

        assertEquals(
                "Civil Law",
                response.name()
        );

        assertEquals(
                "civil-law",
                response.slug()
        );

        verify(repository)
                .save(any(PracticeArea.class));

        verify(auditLogService)
                .log(
                        "CREATE_PRACTICE_AREA",
                        "PRACTICE_AREA",
                        1L
                );
    }

    @Test
    void shouldRejectDuplicateSlugOnCreate() {

        PracticeAreaRequest request =
                new PracticeAreaRequest(
                        "Civil Law",
                        "civil-law",
                        "Civil legal matters",
                        "Description",
                        1,
                        true
                );

        when(repository.existsBySlug("civil-law"))
                .thenReturn(true);

        IllegalArgumentException exception =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> service.create(request)
                );

        assertEquals(
                "Practice area slug already exists",
                exception.getMessage()
        );

        verify(repository, never())
                .save(any(PracticeArea.class));
    }

    @Test
    void shouldUpdatePracticeAreaSuccessfully() {

        PracticeArea existing =
                new PracticeArea();

        existing.setId(1L);
        existing.setName("Old Name");
        existing.setSlug("old-slug");
        existing.setDisplayOrder(1);
        existing.setActive(true);

        PracticeAreaRequest request =
                new PracticeAreaRequest(
                        "Updated Civil Law",
                        "civil-law",
                        "Updated description",
                        "Updated detailed description",
                        2,
                        true
                );

        when(repository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(repository.findBySlug("civil-law"))
                .thenReturn(Optional.empty());

        var response =
                service.update(
                        1L,
                        request
                );

        assertEquals(
                "Updated Civil Law",
                response.name()
        );

        assertEquals(
                "civil-law",
                response.slug()
        );

        assertEquals(
                2,
                response.displayOrder()
        );

        verify(auditLogService)
                .log(
                        "UPDATE_PRACTICE_AREA",
                        "PRACTICE_AREA",
                        1L
                );
    }

    @Test
    void shouldRejectDuplicateSlugOnUpdate() {

        PracticeArea current =
                new PracticeArea();

        current.setId(1L);
        current.setSlug("old-slug");

        PracticeArea another =
                new PracticeArea();

        another.setId(2L);
        another.setSlug("civil-law");

        PracticeAreaRequest request =
                new PracticeAreaRequest(
                        "Civil Law",
                        "civil-law",
                        "Description",
                        "Detailed description",
                        1,
                        true
                );

        when(repository.findById(1L))
                .thenReturn(Optional.of(current));

        when(repository.findBySlug("civil-law"))
                .thenReturn(Optional.of(another));

        IllegalArgumentException exception =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> service.update(
                                1L,
                                request
                        )
                );

        assertEquals(
                "Practice area slug already exists",
                exception.getMessage()
        );
    }

    @Test
    void shouldUpdatePracticeAreaStatus() {

        PracticeArea practiceArea =
                new PracticeArea();

        practiceArea.setId(1L);
        practiceArea.setName("Civil Law");
        practiceArea.setSlug("civil-law");
        practiceArea.setDisplayOrder(1);
        practiceArea.setActive(true);

        when(repository.findById(1L))
                .thenReturn(Optional.of(practiceArea));

        var response =
                service.updateStatus(
                        1L,
                        false
                );

        assertFalse(
                practiceArea.getActive()
        );

        verify(auditLogService)
                .log(
                        "UPDATE_PRACTICE_AREA_STATUS",
                        "PRACTICE_AREA",
                        1L
                );
    }

    @Test
    void shouldDeletePracticeAreaSuccessfully() {

        PracticeArea practiceArea =
                new PracticeArea();

        practiceArea.setId(1L);
        practiceArea.setName("Test Area");
        practiceArea.setSlug("test-area");

        when(repository.findById(1L))
                .thenReturn(Optional.of(practiceArea));

        service.delete(1L);

        verify(repository)
                .delete(practiceArea);

        verify(auditLogService)
                .log(
                        "DELETE_PRACTICE_AREA",
                        "PRACTICE_AREA",
                        1L
                );
    }

    @Test
    void shouldThrowWhenPracticeAreaNotFound() {

        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> service.delete(99L)
        );
    }
}