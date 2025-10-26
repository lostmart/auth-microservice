# Auth Microservice

This microservice handles user authentication and authorization.

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
