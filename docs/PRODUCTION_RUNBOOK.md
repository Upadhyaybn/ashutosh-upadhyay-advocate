# Ashutosh Upadhyay Advocate Website - Production Runbook

## 1. Project Overview

Production website for:

**Ashutosh Upadhyay, Advocate**  
C.S.B.A. (Civil Siddharthnagar Bar Association)  
Siddharthnagar, Uttar Pradesh, India

This application consists of:

- React + TypeScript frontend
- Java Spring Boot backend
- PostgreSQL database
- AWS Amplify frontend hosting
- AWS Lightsail backend hosting
- Docker / Docker Compose
- Nginx
- Let's Encrypt HTTPS
- Namecheap DNS

---

## 2. Production URLs

### Public Website

https://www.ashutoshupadhyayadvocate.com

### Root Domain

https://ashutoshupadhyayadvocate.com

The root domain redirects permanently to the `www` domain.

### Production API

https://api.ashutoshupadhyayadvocate.com

### Backend Health Endpoint

https://api.ashutoshupadhyayadvocate.com/actuator/health

### Admin Portal

https://www.ashutoshupadhyayadvocate.com/admin/login

---

## 3. Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Custom responsive CSS

### Backend

- Java 25
- Spring Boot
- Spring Security
- Spring Data JPA
- Bean Validation
- JWT authentication
- Flyway
- Maven

### Database

- PostgreSQL 18

### Testing

- JUnit
- Spring Boot Test
- Testcontainers
- PostgreSQL Testcontainers
- JaCoCo

### Infrastructure

- AWS Amplify Hosting
- AWS Lightsail
- Docker
- Docker Compose
- Nginx
- Let's Encrypt / Certbot
- Namecheap DNS

---

## 4. Production Infrastructure

### AWS Region

Mumbai (`ap-south-1`)

### Lightsail Instance

`project-api-server`

### Production Containers

Backend:

`advocate-api-prod`

Database:

`advocate-postgres-prod`

### Docker Compose File

`docker-compose.prod.yml`

### Production Environment File

`.env.prod`

The `.env.prod` file contains sensitive production configuration.

**Never commit this file to Git.**

---

## 5. Frontend Deployment

The frontend is deployed through AWS Amplify.

The production frontend is connected to the `main` Git branch.

For future frontend deployments:

1. Make the frontend changes locally.
2. Test the changes locally.
3. Run the production frontend build.
4. Commit the changes to Git.
5. Push the changes to `main`.
6. AWS Amplify automatically starts a deployment.
7. Wait until the Amplify deployment succeeds.
8. Verify the production website.

Local frontend build:

```bash
cd frontend
npm run build
```

---

## 6. Backend Deployment

This section is for **future backend deployments**.

Connect to the AWS Lightsail instance:

`project-api-server`

Then navigate to the production project:

```bash
cd ~/ashutosh-upadhyay-advocate
```

Pull the latest code:

```bash
git pull
```

Rebuild and start the production services:

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

Check the running containers:

```bash
docker ps
```

Expected production containers:

- `advocate-api-prod`
- `advocate-postgres-prod`

Both services should be running before considering the deployment successful.

---

## 7. Backend Health Check

Use this after a backend deployment, restart, or whenever API health needs to be checked.

Run:

```bash
curl -i https://api.ashutoshupadhyayadvocate.com/actuator/health
```

Expected HTTP status:

```text
HTTP/1.1 200
```

Expected application response should contain:

```json
{
  "status": "UP"
}
```

The response may also contain health groups such as `liveness` and `readiness`.

---

## 8. Production Logs

Use these commands only when backend logs need to be inspected.

View the most recent 200 backend log lines:

```bash
docker logs --tail 200 advocate-api-prod
```

Follow backend logs continuously:

```bash
docker logs -f advocate-api-prod
```

Stop continuous log output using:

```text
Ctrl+C
```

Viewing logs does not restart or modify the application.

---

## 9. Restart Backend

Use this only when the existing backend container needs to be restarted.

```bash
docker restart advocate-api-prod
```

Then check container status:

```bash
docker ps
```

Finally verify API health:

```bash
curl -i https://api.ashutoshupadhyayadvocate.com/actuator/health
```

A simple restart is different from a deployment.

For a new backend code deployment, follow **Section 6 - Backend Deployment** instead.

---

## 10. Database Migrations

Database schema changes are managed using Flyway.

Migration directory:

```text
backend/src/main/resources/db/migration
```

### Important Rule

Never edit an existing Flyway migration that has already been applied to production.

For every new production database schema change, create a new migration.

Example:

```text
V4__description_of_change.sql
```

Flyway migrations are automatically applied when the Spring Boot application starts.

The production database currently includes the migration that increased the advocate profile phone field capacity.

---

## 11. Database Backup

Create the backup directory if it does not already exist:

```bash
mkdir -p ~/backups
```

Create a PostgreSQL backup:

```bash
docker exec advocate-postgres-prod sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' > ~/backups/ashutosh_advocate_db_$(date +%Y%m%d_%H%M%S).sql
```

Check available backups:

```bash
ls -lh ~/backups
```

A database backup should be created before significant database or production changes.

A production database backup was created during the Phase 22 production-readiness process.

---

## 12. AWS Lightsail Snapshots

Create a Lightsail snapshot before significant infrastructure changes or major production releases.

Lightsail path:

**AWS Lightsail -> Instances -> project-api-server -> Snapshots**

Production-readiness snapshot:

```text
project-api-server-phase22-2026-09-08
```

Snapshots provide an additional recovery option for the production server.

---

## 13. HTTPS Certificate

The production API uses:

- Nginx
- Let's Encrypt
- Certbot

Test certificate renewal using:

```bash
sudo certbot renew --dry-run
```

A successful test should report that all simulated renewals succeeded.

This renewal test was successfully verified during Phase 22.

---

## 14. Security

Production secrets must never be:

- committed to Git
- stored in frontend source code
- added to documentation
- included in screenshots
- shared in support messages
- included in public logs

Sensitive production configuration is stored in:

```text
.env.prod
```

Sensitive values include:

- database password
- admin password
- JWT secret
- future private API keys
- future private credentials

### Production Firewall

Public application traffic uses:

- HTTP `80`
- HTTPS `443`

SSH `22` should remain restricted.

PostgreSQL `5432` must not be publicly exposed through the Lightsail firewall.

Backend application port `8080` must not be publicly exposed through the Lightsail firewall.

Nginx handles public API traffic through HTTPS.

---

## 15. Admin Portal

Production admin portal:

https://www.ashutoshupadhyayadvocate.com/admin/login

The admin application manages:

- Advocate profile
- Enquiries
- Appointments
- Practice areas
- Audit logs

Admin credentials must never be stored in the Git repository or this documentation.

---

## 16. Advocate Production Profile

The production advocate profile contains the official website business information.

Important public information includes:

- Advocate name
- Bar association
- Registration information
- Phone numbers
- WhatsApp number
- Email
- Office address
- Office hours
- Professional biography
- Languages
- Qualification
- Profile photo

Current office address:

```text
Near Hanuman Mandir, Civil Court Premises, Siddharthnagar, Uttar Pradesh 272207, India
```

Current office hours:

```text
09:00 A.M. - 06:00 P.M.
```

Public business information should remain consistent between:

- Website
- Backend profile
- Google Business Profile
- Search engine structured data

---

## 17. Production Verification Checklist

After every significant deployment verify the following:

### Public Website

- Homepage loads successfully
- About page loads
- Practice Areas page loads
- Advocate photo loads
- Header and navigation work
- Footer displays correctly
- Contact information is correct
- Office address is correct
- Office hours are correct

### Public Forms

- Enquiry form loads
- Enquiry submission works
- Appointment form loads
- Appointment submission works
- Validation works
- Consent validation works

### Admin

- Admin login works
- Admin logout works
- Dashboard loads
- Enquiries load
- Appointment records load
- Advocate Profile loads
- Practice Areas page loads
- Audit Logs load
- Status updates work

### Backend

- API health returns HTTP 200
- Application status is `UP`
- Backend container is running
- PostgreSQL container is healthy
- No unexpected production errors appear in logs

### Security

- HTTPS works without certificate warnings
- PostgreSQL is not publicly exposed
- Backend port 8080 is not publicly exposed
- Sensitive Actuator endpoints remain protected
- Production secrets are not committed to Git

### Responsive Design

Verify important pages at common mobile/tablet/desktop sizes.

Previously verified sizes include:

- 320 x 568
- 390 x 844
- 768 x 1024
- 1024 x 768

There should be no horizontal page overflow.

---

## 18. SEO

Canonical production website:

https://www.ashutoshupadhyayadvocate.com

Google Search Console is configured using the production domain property.

Active sitemap:

https://www.ashutoshupadhyayadvocate.com/sitemap-v2.xml

Robots file:

https://www.ashutoshupadhyayadvocate.com/robots.txt

The sitemap contains the primary indexable public pages.

Structured data is configured for the advocate/legal service.

The homepage structured-data validation has been tested successfully.

SEO-related public business information should remain factual and professional.

Avoid unsupported promotional claims such as:

- best lawyer
- No. 1 lawyer
- guaranteed result
- guaranteed case outcome

---

## 19. Rollback Guidance

### Frontend

If a frontend deployment introduces a problem:

1. Open AWS Amplify.
2. Check deployment history.
3. Identify the previous known-good deployment.
4. Review the Git commit that introduced the issue.
5. Correct or revert the code through Git.
6. Redeploy through the normal Amplify process.

### Backend

If a backend deployment introduces a problem:

1. Check API health.
2. Check `docker ps`.
3. Check backend logs.
4. Identify the last known-good Git commit.
5. Determine whether a database migration was applied.
6. Do not manually reverse an applied Flyway migration without evaluating the database impact.
7. Use the database backup or Lightsail snapshot when recovery requires it.

Avoid making uncontrolled production changes directly on the server.

---

## 20. Source Control

Primary production branch:

```text
main
```

Production code must be committed to Git before normal deployment.

Files containing secrets must never be committed.

Examples:

```text
.env
.env.prod
```

Also avoid committing:

- passwords
- JWT secrets
- database credentials
- generated local build files
- IDE-specific temporary files

Initial production release tag:

```text
v1.0.0
```

---

## 21. Testing Before Production Deployment

### Backend

From the backend project directory, run Maven verification:

```bash
mvnw.cmd verify
```

On Linux/macOS environments the Maven Wrapper command may be:

```bash
./mvnw verify
```

The build must complete successfully before a production release.

### Frontend

From the frontend directory:

```bash
npm run build
```

The production build must complete successfully.

---

## 22. Monitoring and Maintenance

Periodically verify:

- Lightsail instance health
- Docker container health
- PostgreSQL container health
- available disk space
- database backups
- Lightsail snapshots
- HTTPS certificate renewal
- AWS Amplify deployment health
- API health endpoint
- Google Search Console
- enquiry functionality
- appointment functionality
- admin portal access

Dependencies should be upgraded through controlled development and testing rather than directly in production.

This includes:

- Java dependencies
- Spring Boot dependencies
- Node.js dependencies
- React dependencies
- Docker images
- PostgreSQL
- Ubuntu packages

---

## 23. Emergency Quick Check

If the website API appears unavailable, connect to Lightsail and first run:

```bash
cd ~/ashutosh-upadhyay-advocate
```

Check containers:

```bash
docker ps
```

Check API health:

```bash
curl -i https://api.ashutoshupadhyayadvocate.com/actuator/health
```

Check recent backend logs:

```bash
docker logs --tail 100 advocate-api-prod
```

These are first-level diagnostic commands and do not modify application data.

---

## 24. Production Change Process

Do not make untested application changes directly on the production server.

Use this normal flow:

```text
Development
    |
    v
Local Testing
    |
    v
Git Commit
    |
    v
Push to main
    |
    +--------------------+
    |                    |
    v                    v
AWS Amplify         AWS Lightsail
(Frontend)          (Backend)
    |                    |
    +---------+----------+
              |
              v
     Production Verification
```

For backend changes, Lightsail deployment must still be performed after the Git push.

For frontend changes, AWS Amplify normally deploys automatically from `main`.

---

## 25. Production Environment Summary

Frontend hosting:

```text
AWS Amplify
```

Backend hosting:

```text
AWS Lightsail
```

Backend reverse proxy:

```text
Nginx
```

Backend runtime:

```text
Docker
```

Database:

```text
PostgreSQL 18
```

Database migrations:

```text
Flyway
```

HTTPS:

```text
Let's Encrypt / Certbot
```

DNS:

```text
Namecheap
```

Production branch:

```text
main
```

---

## 26. Final Rule

For production maintenance, always follow:

```text
Understand the change
        ->
Develop locally
        ->
Test locally
        ->
Commit to Git
        ->
Deploy
        ->
Verify production
        ->
Monitor
```

Never expose production credentials or secrets.

Never modify an already-applied Flyway migration.

Never make an untested production application change directly on the server.