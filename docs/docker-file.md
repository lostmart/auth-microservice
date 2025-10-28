# Dockerfile

**What this Dockerfile does:**

1. **Base image** - `node:20-alpine` (small, secure, production-ready)
2. **Install dependencies** - Only production dependencies first (better caching)
3. **Build TypeScript** - Compiles to JavaScript in `dist/` folder
4. **Clean up** - Removes dev dependencies and source files (smaller image)
5. **Data directory** - Creates folder for SQLite database
6. **Expose port** - Documents which port the service uses
7. **Run app** - Executes the compiled JavaScript
