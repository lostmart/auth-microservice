# Auth Microservice

A production-ready authentication and authorization microservice built with Node.js, Express, TypeScript, and SQLite. Designed to demonstrate modern backend architecture, security best practices, and microservice patterns.

## 📋 Table of Contents

1. [Features](#features)
2. Architecture
3. Tech Stack
4. Getting Started
5. API Documentation
6. Authentication Flow
7. Docker
8. Demo Credentials
9. Project Structure
10. Environment Variables
11. Design Decisions

## ✨ Features

- JWT Authentication - Secure token-based authentication with configurable expiration
- Role-Based Authorization - Fine-grained access control (admin, driver, customer roles)
- API Key Protection - Service-to-service authentication for microservice architecture
- Password Security - bcrypt hashing with configurable salt rounds
- ULID Identifiers - Sortable, globally unique IDs instead of sequential integers
- TypeScript - Full type safety and enhanced developer experience
- RESTful API - Clean, intuitive endpoint structure
- Request Logging - Comprehensive request/response logging
- Health Checks - Monitoring-ready health endpoint
- Docker Support - Production-ready containerization
- Database Seeding - Pre-populated demo data for testing

## Folder Structure

```
src/
  ├── index.ts          # Entry point (server startup)
  ├── app.ts            # Express app configuration
  ├── config/           # Configuration files
  │   └── database.ts   # DB connection setup
  ├── routes/           # API routes
  │   └── auth.routes.ts
  ├── controllers/      # Route handlers
  │   └── auth.controller.ts
  ├── services/         # Business logic
  │   └── auth.service.ts
  ├── models/           # Data models & DB schemas
  │   └── user.model.ts
  ├── middleware/       # Custom middleware
  │   └── auth.middleware.ts
  └── utils/            # Helper functions
      └── jwt.util.ts
```

## Conceptual layers in a typical Express app:

1. **Controllers**: Handle incoming requests and send responses.
2. **Services**: Reusable business logic and data access.
3. **Routes**: Define API endpoints and map them to controllers.
4. **Middleware**: Add functionality to the request/response cycle.
5. **Models**: Define data models and DB schemas.
6. **Utils**: Helper functions.
7. **Config**: Configuration files.
8. **Database**: DB connection setup.
9. **Server**: Entry point (server startup).
10. **Tests**: Unit and integration tests.
11. **README.md**: Project documentation.
12. **Dockerfile**: Containerization.
13. **docker-compose.yml**: Container orchestration.
14. **.env**: Environment variables.
15. **.gitignore**: Ignored files.
16. **tsconfig.json**: TypeScript configuration.
17. **package.json**: Project metadata.

## Demo Credentials

This is a demo authentication microservice. You can test with these accounts:

**Admin Access:**

- Email: `admin@parisclassictours.fr`
- Password: `admin123`

**Driver Access:**

- Email: `pierre.martin@parisclassictours.fr`
- Password: `driver123`

**Customer Access:**

- Email: `marie.lefevre@email.fr`
- Password: `customer123`

> Note: This is a demonstration project. Passwords are intentionally simple for testing purposes.

## Endpoints

```text
| Endpoint | Method | Description |
| ------- | ------ | ----------- |
| /api/v1/auth/register | POST | Create new user |
| /api/v1/auth/login | POST | Login user |
| /api/v1/health | GET | Health check |
```

- POST /api/v1/auth/register - Create new user
- POST /api/v1/auth/login - Login user
- GET /api/v1/health - Health check

## ## Authentication Flow

This is an authentication microservice designed for service-to-service communication.

### API Key Authentication

All endpoints require a valid API key in the request header:

```
X-API-Key: your-api-key-here
```

### Usage Example

```bash
# Login request
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"email": "admin@parisclassictours.fr", "password": "admin123"}'
```

### Design Rationale

- API key protects the microservice from unauthorized access
- Frontend/client services hold the API key
- JWT tokens are issued to end users after login
- Demonstrates proper microservice security patterns

## Testing Considerations

When testing (Postman, curl, or frontend), you'll need to include **two headers**:

```text
X-API-Key: <your-api-key-from-env>
Authorization: Bearer <jwt-token-after-login>
```

## Layered architecture

```UML
Request → Controller (HTTP) → Service (Logic) → Model (DB) → Database
```

1. Controller - Handles HTTP (request/response)
2. Service - Business logic (validation, orchestration)
3. Model/Repository - Database operations only
4. Database - SQLite connection

## API Summary

Public (API key only):

POST /api/v1/auth/register - Register new user
POST /api/v1/auth/login - Login user
GET /api/v1/health - Health check (no auth)

Protected (API key + JWT):

GET /api/v1/auth/me - Get current user profile
PUT /api/v1/auth/profile - Update own profile

Admin only (API key + JWT + admin role):

GET /api/v1/users - List all users
