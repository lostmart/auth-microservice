// src/__test__/integration/auth.test.ts
import request from "supertest"
import app from "../../app"
import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"

const prisma = new PrismaClient()

describe("Auth API Integration Tests", () => {
	const API_KEY = process.env.API_KEY || "test-api-key"

	beforeAll(async () => {
		// Run migrations to create tables
		try {
			execSync("npx prisma migrate deploy", {
				stdio: "inherit",
				env: process.env,
			})
		} catch (error) {
			console.error("Migration failed:", error)
		}

		// Clean database
		await prisma.user.deleteMany()
	})

	afterAll(async () => {
		// Clean up
		await prisma.user.deleteMany()
		await prisma.$disconnect()
	})

	describe("GET /api/v1/health", () => {
		it("should return health status", async () => {
			const response = await request(app).get("/api/v1/health")

			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty("status", "ok")
			expect(response.body).toHaveProperty("timestamp")
		})
	})

	describe("POST /api/v1/auth/register", () => {
		it("should return 403 without API key", async () => {
			const response = await request(app).post("/api/v1/auth/register").send({
				email: "test@example.com",
				password: "Test123!",
				first_name: "Test",
				last_name: "User",
			})

			expect(response.status).toBe(403)
		})

		it("should return 400 with missing fields", async () => {
			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", API_KEY)
				.send({
					email: "test@example.com",
					// Missing password, first_name, last_name
				})

			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty("message")
		})

		it("should register a new user with valid data", async () => {
			const uniqueEmail = `test${Date.now()}@example.com`

			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", API_KEY)
				.send({
					email: uniqueEmail,
					password: "Test123!",
					first_name: "Test",
					last_name: "User",
				})

			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty("token")
			expect(response.body).toHaveProperty("user")
			expect(response.body.user.email).toBe(uniqueEmail)
		})

		it("should reject weak passwords", async () => {
			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", API_KEY)
				.send({
					email: "weak@example.com",
					password: "123", // Weak password
					first_name: "Weak",
					last_name: "Password",
				})

			expect(response.status).toBe(400)
			expect(response.body.message).toContain("Password")
		})
	})

	describe("POST /api/v1/auth/login", () => {
		const testUser = {
			email: `testlogin${Date.now()}@example.com`,
			password: "Test123!",
			first_name: "Test",
			last_name: "Login",
		}

		beforeAll(async () => {
			// Create test user
			await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", API_KEY)
				.send(testUser)
		})

		it("should login with valid credentials", async () => {
			const response = await request(app)
				.post("/api/v1/auth/login")
				.set("X-API-Key", API_KEY)
				.send({
					email: testUser.email,
					password: testUser.password,
				})

			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty("token")
			expect(response.body).toHaveProperty("user")
			expect(response.body.user.email).toBe(testUser.email)
		})

		it("should reject invalid credentials", async () => {
			const response = await request(app)
				.post("/api/v1/auth/login")
				.set("X-API-Key", API_KEY)
				.send({
					email: testUser.email,
					password: "WrongPassword",
				})

			expect(response.status).toBe(401)
			expect(response.body).toHaveProperty("message")
		})

		it("should return 400 with missing fields", async () => {
			const response = await request(app)
				.post("/api/v1/auth/login")
				.set("X-API-Key", API_KEY)
				.send({
					email: testUser.email,
					// Missing password
				})

			expect(response.status).toBe(400)
		})
	})
})
