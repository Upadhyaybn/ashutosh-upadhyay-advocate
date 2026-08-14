# Database Design

## Database Engine

PostgreSQL.

## Planned Database Name

```text
ashutosh_advocate_db
```

## Planned Application Database User

```text
ashutosh_advocate_app
```

The application must not use the PostgreSQL superuser for normal
runtime database access.

## Schema Management

All database schema changes will be managed using Flyway.

## Initial MVP Entities

- advocate_profile
- practice_area
- enquiry
- appointment
- admin_user
- audit_log

Detailed tables, columns, constraints and indexes will be created
during the database implementation phase.