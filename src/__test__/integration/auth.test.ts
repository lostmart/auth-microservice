// src/__tests__/integration/auth.test.ts
import request from "supertest"

import { PrismaClient } from "@prisma/client"
import app from "../../app"
import { log } from "../helpers/testHelpers"

const prisma = new PrismaClient()

describe("Auth API Integration Tests", () => {
	beforeAll(async () => {
		// Clean database
		await prisma.user.deleteMany()
	})
	afterAll(async () => {
		await prisma.$disconnect()
	})

	describe("POST /api/v1/auth/register", () => {
		let lastResponse: request.Response

		it("should register a new user", async () => {
			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", process.env.API_KEY!)
				.send({
					email: "newuser@example.com",
					password: "Test123!",
					first_name: "New",
					last_name: "User",
				})

			log.response(response, "Register new user")

			expect(response.status).toBe(201)
			expect(response.body.message).toBe("User registered successfully")
			expect(response.body.token).toBeDefined()
			expect(response.body.user).toBeDefined()
		})

		it("should reject weak passwords", async () => {
			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", process.env.API_KEY!)
				.send({
					email: "weak@example.com",
					password: "123",
					first_name: "Weak",
					last_name: "Password",
				})
			log.response(response, "Register new user")

			expect(response.status).toBe(400)
			expect(response.body.message).toContain("Password")
		})

		it("should reject malformed email", async () => {
			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", process.env.API_KEY!)
				.send({
					email: "not-an-email",
					password: "Test123!",
					first_name: "Bad",
					last_name: "Email",
				})

			expect(response.status).toBe(400)
			expect(response.body.message).toBe("Invalid email format")
		})
	})
	// describe("POST /api/v1/auth/login", () => {
	// 	beforeAll(async () => {
	// 		// Create test user
	// 		await request(app)
	// 			.post("/api/v1/auth/register")
	// 			.set("X-API-Key", process.env.API_KEY!)
	// 			.send({
	// 				email: "login@example.com",
	// 				password: "Test123!",
	// 				firstName: "Login",
	// 				lastName: "Test",
	// 			})
	// 	})
	// 	it("should login with valid credentials", async () => {
	// 		const response = await request(app)
	// 			.post("/api/v1/auth/login")
	// 			.set("X-API-Key", process.env.API_KEY!)
	// 			.send({
	// 				email: "login@example.com",
	// 				password: "Test123!",
	// 			})
	// 		expect(response.status).toBe(200)
	// 		expect(response.body).toHaveProperty("accessToken")
	// 		expect(response.body).toHaveProperty("refreshToken")
	// 	})
	// })
})
