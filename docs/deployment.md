# Environment configuration:

Separate configs for dev/staging/prod
dotenv for local development

## Observability

- Logging (structured logs with correlation IDs)
- Health check endpoints
- Metrics for failed login attempts, token generation rate
- Error tracking

## Testing Strategy

Plan for:

- Unit tests for business logic (password validation, token generation)
- Integration tests for API endpoints
- Security testing (SQL injection, XSS attempts)
- Load testing to understand SQLite limits

## Deployment

- Containerization (Docker)
- CI/CD pipeline
- Monitoring tools
- Scaling strategy
- Rate limiting best practices
- Input validation best practices
