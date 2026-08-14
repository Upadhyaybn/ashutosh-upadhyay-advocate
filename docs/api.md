# REST API

## Application

Ashutosh Upadhyay Advocate API

## Base URL

```text
/api/v1
```

## Planned Public APIs

```text
GET  /api/v1/profile

GET  /api/v1/practice-areas
GET  /api/v1/practice-areas/{slug}

POST /api/v1/enquiries
POST /api/v1/appointments
```

## Authentication APIs

```text
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

## Admin APIs

```text
GET   /api/v1/admin/enquiries
GET   /api/v1/admin/enquiries/{id}
PATCH /api/v1/admin/enquiries/{id}/status

GET   /api/v1/admin/appointments
GET   /api/v1/admin/appointments/{id}
PATCH /api/v1/admin/appointments/{id}/status
```