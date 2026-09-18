# CLAUDE.md

## 1. Project Identity & Status

- **Project:** Ashutosh Upadhyay Advocate — full-stack production web application for a practicing advocate (Siddharthnagar, Uttar Pradesh, India).
- **Status: LIVE PRODUCTION.** Public site: https://www.ashutoshupadhyayadvocate.com · API: https://api.ashutoshupadhyayadvocate.com · Release `v1.0.0`.
- Treat every change as touching a real, publicly-used production system, not a prototype.

## 2. Architecture & Technology Stack

- **Backend:** Java 25, Spring Boot 4.1.0, Spring Security, Spring Data JPA/Hibernate, Bean Validation, Flyway, Maven, springdoc-openapi, Spring Boot Actuator (health/info only).
- **Frontend:** React 19 + TypeScript, Vite, React Router, Axios, React Helmet Async.
- **Database:** PostgreSQL 18, schema versioned with Flyway.
- **Auth:** Spring Security + JWT, stateless. Admin APIs under `/api/v1/admin/**`; public APIs under `/api/v1/**` (profile, practice-areas, enquiries, appointments, auth/login).
- **Testing:** JUnit 5, Spring Boot Test, MockMvc, Testcontainers (PostgreSQL), JaCoCo coverage gate (70% line coverage minimum, enforced in `mvn verify`).
- **Infra:** Docker / Docker Compose, GitHub Actions (backend only), AWS Amplify (frontend hosting), AWS Lightsail in `ap-south-1` (backend/DB hosting), Nginx, Let's Encrypt/Certbot, Namecheap DNS.

## 3. Key Directories

- `backend/src/main/java/com/ashutoshupadhyay/advocate/` — `config/`, `controller/`, `dto/`, `entity/`, `enums/`, `exception/`, `repository/`, `security/`, `service/`
- `backend/src/main/resources/` — `application.yml`, `application-local.yml`, `application-prod.yml`, `db/migration/` (Flyway SQL)
- `backend/src/test/java/...` — controller, service, repository, integration tests
- `backend/Dockerfile`, `backend/pom.xml`, `backend/mvnw` / `mvnw.cmd`
- `frontend/src/` — `components/`, `pages/`, `services/`
- `frontend/package.json`, `frontend/vite.config.ts`, `frontend/eslint.config.js`
- `docs/` — `api.md`, `architecture.md`, `database.md`, `deployment.md`, `security.md`, `PRODUCTION_RUNBOOK.md`
- `.github/workflows/backend-ci.yml` — the only CI workflow in the repo
- `docker-compose.yml` (local/dev), `docker-compose.prod.yml` (production)
- Root `.env`, `.env.prod`, `frontend/.env.local` — real secrets, never committed (see Secrets section)

## 4. Backend: Build / Test / Verify

Run from `backend/`:

```
./mvnw verify
```

This runs unit + integration tests (Testcontainers-backed), generates the JaCoCo report, and enforces the 70% line-coverage gate — this is the same command CI runs. Use `./mvnw -DskipTests clean package` only when explicitly told to skip tests (matches what the Dockerfile build stage does).

Do not invent additional Maven goals, profiles, or test types beyond what exists above.

## 5. Frontend: Install / Lint / Build / Test

Run from `frontend/`:

```
npm install
npm run lint      # eslint .
npm run build     # tsc -b && vite build
npm run dev        # local dev server
npm run preview    # preview a production build
```

**There is currently no frontend test script or test framework configured** (`package.json` has no `test` script, no Vitest/Jest present). Do not fabricate a `npm test` command or claim frontend tests ran — report this as "no frontend automated tests exist" when asked to validate.

## 6. Git Workflow

- `main` is production and is branch-protected (PR required to merge). Never develop directly on `main`.
- Start every task from an up-to-date `main` (`git pull` first).
- Use a dedicated `feature/*` or `fix/*` branch per task.
- Make focused, logically-scoped commits.
- Run `git status` and `git diff` before every commit — review exactly what is staged.
- Push only the branch relevant to the current task, never other branches.
- Land changes into `main` via pull request, not direct push.

## 7. Production Safety

- Never push directly to `main`.
- Never force-push, to any branch.
- Never delete `main` or rewrite its history.
- Never deploy, redeploy, or restart production services (Lightsail containers, Amplify build) without explicit user approval.
- Never modify production infrastructure (Lightsail instance config, Nginx, DNS, Amplify settings) without explicit approval.

## 8. Secrets

- Never print, log, commit, overwrite, or copy the *values* of secrets.
- Treat as sensitive: `.env`, `.env.prod`, `frontend/.env.local`, `ADMIN_USERNAME`/`ADMIN_PASSWORD`, `JWT_SECRET`, `DB_USERNAME`/`DB_PASSWORD`, and any AWS/cloud credentials.
- Only `*.example` files (`.env.example`, `.env.prod.example`, `frontend/.env.example`) are meant to be committed, and they must contain **placeholder values only** (e.g. `CHANGE_ME`) — never a real credential. If you ever find a real-looking value in an example/template file, stop and flag it instead of propagating or "fixing" it silently.
- Never read `.env`, `.env.prod`, or `frontend/.env.local` and echo their contents back.

## 9. Database / Flyway

- Migrations live in `backend/src/main/resources/db/migration/`, currently `V1__create_initial_schema.sql`, `V2__seed_advocate_profile.sql`, `V3__increase_advocate_profile_phone_length.sql`.
- Never edit a migration that has already been applied/committed — add a new sequential `V{n}__description.sql` file instead.
- Never run destructive operations (drop, truncate, delete-all) against the production database without explicit user approval.

## 10. Security

- Preserve existing authentication/authorization behavior (Spring Security + JWT, admin-only routes) unless the task explicitly requires a reviewed change.
- Treat any change to `security/` package, `application-prod.yml` security keys, CORS config, or JWT handling as high risk — call it out explicitly before making it.

## 11. Scope Discipline

- Inspect the existing implementation (entity/DTO/service/controller layers, or the corresponding frontend component) before editing.
- Preserve current architecture and patterns unless explicitly asked to change them.
- Make minimal, focused changes; do not bundle unrelated refactors into the same change.

## 12. Validation Before Reporting Completion

Before declaring a task done, run and report the results of:
- `./mvnw verify` for any backend change (tests, coverage, build).
- `npm run lint` and `npm run build` for any frontend change.
- Explicitly state: files changed, validation actually run, and any validation that could not be performed (e.g. "no frontend test suite exists to run").

## 13. GitHub / CI

- The only existing workflow is `.github/workflows/backend-ci.yml` (Backend CI): triggers on push/PR to `main` scoped to `backend/**` changes; sets up Java 25; runs `./mvnw verify`; uploads the JaCoCo report; builds the backend Docker image. Respect and do not break this workflow.
- There is currently no frontend CI workflow — do not assume or invent one.
- Do not modify GitHub Actions workflows, branch protection rules, repository settings, or repository secrets unless explicitly requested.

## 14. Deployment Model (build/test ≠ deployment)

- **Frontend:** built with Vite (`npm run build`) and hosted on **AWS Amplify**.
- **Backend:** built with Maven into a Docker image (`backend/Dockerfile`, multi-stage: `eclipse-temurin:25-jdk` build → `eclipse-temurin:25-jre` runtime), run via `docker-compose.prod.yml` on an **AWS Lightsail** instance (`ap-south-1`, instance `project-api-server`), containers `advocate-api-prod` + `advocate-postgres-prod`, fronted by **Nginx** with **Let's Encrypt/Certbot** TLS, DNS via **Namecheap**.
- Running `./mvnw verify`, `npm run build`, or a local `docker build`/`docker compose up` is a **build/verification** step and never itself deploys to production. Only an explicit, approved action against the Lightsail host or Amplify deploys production.

## 15. Approval Gates — Explicit User Approval Required Before:

- Merging any PR into `main`
- Any production deployment, redeployment, or service restart
- Running a database migration against the production database
- Any destructive Git operation (force-push, history rewrite, branch/tag deletion)
- Changing any secret value (`.env`, `.env.prod`, JWT secret, admin credentials, cloud credentials)
- Changing security or authentication behavior
- Changing production infrastructure (Lightsail, Nginx, DNS, Amplify config)
- Modifying CI/CD workflows (`.github/workflows/**`)
