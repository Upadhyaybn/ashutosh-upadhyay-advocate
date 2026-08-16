CREATE TABLE advocate_profile (
                                  id BIGSERIAL PRIMARY KEY,
                                  full_name VARCHAR(150) NOT NULL,
                                  designation VARCHAR(100),
                                  professional_bio TEXT,
                                  qualification VARCHAR(255),
                                  courts_of_practice TEXT,
                                  languages VARCHAR(255),
                                  phone VARCHAR(20),
                                  whatsapp VARCHAR(20),
                                  email VARCHAR(150),
                                  office_address TEXT,
                                  office_hours VARCHAR(255),
                                  photo_url VARCHAR(500),
                                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE practice_area (
                               id BIGSERIAL PRIMARY KEY,
                               name VARCHAR(150) NOT NULL,
                               slug VARCHAR(180) NOT NULL UNIQUE,
                               short_description VARCHAR(500),
                               detailed_description TEXT,
                               display_order INTEGER NOT NULL DEFAULT 0,
                               active BOOLEAN NOT NULL DEFAULT TRUE,
                               created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiry (
                         id BIGSERIAL PRIMARY KEY,
                         full_name VARCHAR(150) NOT NULL,
                         mobile VARCHAR(20) NOT NULL,
                         email VARCHAR(150),
                         city_district VARCHAR(150),
                         category VARCHAR(100),
                         description TEXT NOT NULL,
                         status VARCHAR(50) NOT NULL DEFAULT 'NEW',
                         consent BOOLEAN NOT NULL DEFAULT FALSE,
                         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointment (
                             id BIGSERIAL PRIMARY KEY,
                             full_name VARCHAR(150) NOT NULL,
                             mobile VARCHAR(20) NOT NULL,
                             email VARCHAR(150),
                             preferred_date DATE NOT NULL,
                             preferred_time TIME,
                             matter_category VARCHAR(100),
                             communication_method VARCHAR(50),
                             short_note TEXT,
                             status VARCHAR(50) NOT NULL DEFAULT 'REQUESTED',
                             consent BOOLEAN NOT NULL DEFAULT FALSE,
                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_user (
                            id BIGSERIAL PRIMARY KEY,
                            username VARCHAR(100) NOT NULL UNIQUE,
                            password_hash VARCHAR(255) NOT NULL,
                            role VARCHAR(50) NOT NULL DEFAULT 'ROLE_ADMIN',
                            enabled BOOLEAN NOT NULL DEFAULT TRUE,
                            last_login_at TIMESTAMP,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_log (
                           id BIGSERIAL PRIMARY KEY,
                           admin_user_id BIGINT,
                           action VARCHAR(100) NOT NULL,
                           entity_type VARCHAR(100),
                           entity_id BIGINT,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           CONSTRAINT fk_audit_log_admin_user
                               FOREIGN KEY (admin_user_id)
                                   REFERENCES admin_user(id)
                                   ON DELETE SET NULL
);

CREATE INDEX idx_enquiry_status
    ON enquiry(status);

CREATE INDEX idx_enquiry_created_at
    ON enquiry(created_at);

CREATE INDEX idx_appointment_status
    ON appointment(status);

CREATE INDEX idx_appointment_preferred_date
    ON appointment(preferred_date);

CREATE INDEX idx_audit_log_admin_user_id
    ON audit_log(admin_user_id);