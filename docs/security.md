# Security Baseline

## Authentication

Administrative authentication will use Spring Security.

Version 1 will prefer server-side sessions with secure HTTP-only
cookies.

## Authorization

Administrative APIs require authenticated administrator access.

## Password Storage

Passwords must never be stored in plaintext.

## Production Transport

HTTPS is mandatory.

## Planned Security Controls

- Spring Security
- Secure password hashing
- HTTP-only cookies
- Secure cookies
- SameSite protection
- CSRF protection
- Restricted CORS
- Backend validation
- Rate limiting
- CAPTCHA / bot protection
- Security headers
- Content Security Policy
- HSTS
- Audit logging
- Dependency scanning
- Secure secret management

## Sensitive Logging

Never log:

- Passwords
- Session identifiers
- Authentication tokens
- Database passwords
- Cloud credentials
- Private keys
- Full confidential legal enquiry descriptions