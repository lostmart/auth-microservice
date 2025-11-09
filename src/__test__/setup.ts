import dotenv from "dotenv"

// Load test environment variables
dotenv.config({ path: ".env.test" })

// Mock Prisma if needed
jest.mock("@prisma/client")
