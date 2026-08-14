# Application Architecture

## Project

Ashutosh Upadhyay Advocate Website

## Preferred Domain

`ashutoshupadhyayadvocate.in`

## Architecture Style

Modular Monolith.

## Frontend

React + TypeScript application.

Responsibilities:

- Public website
- Legal enquiry form
- Appointment request
- Admin user interface

## Backend

Java 25 + Spring Boot application.

Responsibilities:

- REST APIs
- Validation
- Business logic
- Authentication
- Authorization
- Database access
- Notifications
- Audit logging

## Database

PostgreSQL.

Database schema changes will be managed using Flyway.

## High-Level Architecture

```text
Browser
   |
   v
React + TypeScript
   |
   | HTTPS REST API
   v
Spring Boot
   |
   +-- Spring Security
   +-- Validation
   +-- Service Layer
   +-- Repository Layer
   |
   v
PostgreSQL
```

## Java Base Package

```text
com.ashutoshupadhyay.advocate
```

## Architecture Principles

- Modular monolith
- REST APIs
- DTO-based API contracts
- Server-side validation
- Flyway database migrations
- Environment-based configuration
- Secure-by-default configuration
- No secrets in source control