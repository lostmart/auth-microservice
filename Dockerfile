# Use Node.js LTS (Long Term Support) version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript config
COPY tsconfig.json ./

# Copy source code
COPY src ./src

# Install TypeScript and build dependencies
RUN npm install -D typescript @types/node @types/express

# Build TypeScript to JavaScript
RUN npm run build

# Remove dev dependencies and source files after build
RUN npm prune --production && \
    rm -rf src tsconfig.json

# Create data directory for SQLite
RUN mkdir -p /app/data

# Expose the port (should match your PORT env var)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run the compiled application
CMD ["node", "dist/index.js"]