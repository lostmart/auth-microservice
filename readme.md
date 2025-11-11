# 🔐 Auth Microservice

Production-grade authentication microservice handling 100K+ MAU

[![CI/CD Pipeline](https://github.com/lostmart/auth-microservice/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/lostmart/auth-microservice/actions)
[![Coverage](https://codecov.io/gh/lostmart/auth-microservice/branch/main/graph/badge.svg)](https://codecov.io/gh/lostmart/auth-microservice)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 📋 Table of Contents

1. Features
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

Production-grade authentication microservice built with Node.js, TypeScript, Express, and PostgreSQL.

**🚀 Live API:** [https://your-railway-url.railway.app](https://your-railway-url.railway.app)

---

## ✨ Features

### Security

- 🔑 **JWT Authentication** - Secure token-based auth with configurable expiration
- 🛡️ **Role-Based Access Control** - Fine-grained permissions (admin, driver, customer)
- 🔐 **API Key Protection** - Service-to-service authentication
- 🔒 **Argon2 Password Hashing** - Industry-standard password security
- 🚦 **Rate Limiting** - Protection against brute-force attacks

### Technology

- ⚡ **TypeScript** - Full type safety and enhanced DX
- 🐘 **PostgreSQL + Prisma** - Type-safe database operations
- 🐳 **Docker Support** - Production-ready containerization
- 🧪 **Testing Suite** - Unit and integration tests with Jest
- 📊 **CI/CD Pipeline** - Automated testing and deployment
- 🏥 **Health Checks** - Monitoring-ready endpoints

### Developer Experience

- 📝 **RESTful API** - Clean, intuitive endpoint structure
- 📋 **Request Logging** - Comprehensive logging middleware
- 🌱 **Database Seeding** - Pre-populated demo data
- 🔄 **Hot Reload** - Fast development with nodemon

---

## 🏗️ Architecture

### Folder Structure

```
auth-microservice/
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── __test__/            # Test files
│   │   ├── integration/     # API integration tests
│   │   ├── unit/            # Unit tests
│   │   └── setup.ts         # Test configuration
│   ├── config/              # Configuration
│   │   ├── initDatabase.ts  # Database initialization
│   │   └── seed.ts          # Database seeding
│   ├── controllers/         # Request handlers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/          # Custom middleware
│   │   └── auth.middleware.ts
│   ├── models/              # Data access layer
│   │   └── user.model.ts
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── services/            # Business logic
│   │   └── auth.service.ts
│   ├── types/               # TypeScript types
│   │   └── user.interface.ts
│   ├── utils/               # Helper functions
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   └── validation.util.ts
│   ├── app.ts               # Express app setup
│   └── index.ts             # Server entry point
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # CI/CD pipeline
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Multi-container setup
├── jest.config.js           # Test configuration
├── tsconfig.json            # TypeScript config
├── .env.example             # Environment template
└── package.json             # Dependencies
```

### Layered Architecture

```
┌─────────────────────────────────────────┐
│          HTTP Request                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     Middleware Layer                     │
│  • API Key Validation                    │
│  • JWT Authentication                    │
│  • Rate Limiting                         │
│  • Request Logging                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     Controller Layer                     │
│  • HTTP Request/Response                 │
│  • Input Validation                      │
│  • Error Handling                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     Service Layer                        │
│  • Business Logic                        │
│  • Password Hashing                      │
│  • JWT Generation                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     Model Layer (Prisma)                 │
│  • Database Operations                   │
│  • Type-Safe Queries                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     PostgreSQL Database                  │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/lostmart/auth-microservice.git
cd auth-microservice

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Setup database
npx prisma generate
npx prisma migrate dev --name init

# 5. Seed database (optional)
npm run seed

# 6. Start development server
npm run dev
```

Server runs at: `http://localhost:3000`

### Using Docker

```bash
# Start all services (app + PostgreSQL)
docker-compose up

# Or build and run manually
docker build -t auth-microservice .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="your-secret" \
  -e API_KEY="your-api-key" \
  auth-microservice
```

---

## 🔧 Configuration

### Environment Variables

```bash
# .env
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/auth"

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
API_KEY=your-api-key-for-service-auth
```
