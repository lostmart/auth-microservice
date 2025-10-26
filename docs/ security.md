# Security Best Practices

## Password handling

- Use bcrypt or argon2 for hashing (bcrypt is more mature in Node ecosystem)
- Implement proper salting (libraries handle this automatically)
- Set appropriate cost factors - bcrypt default of 10-12 rounds is good

## Token security

- Store refresh tokens securely in the database (hashed)
- Implement token rotation on refresh
- Consider adding JTI (JWT ID) claims for better tracking
- Set appropriate CORS policies

## Rate limiting

- Essential for login endpoints to prevent brute force
- Different limits for different endpoints
- Look into express-rate-limit or similar

## Input validation

- Sanitize and validate all inputs
- Email format validation
- Password strength requirements
- Protect against SQL injection (use parameterized queries)
