// src/__tests__/integration/auth.test.ts
import request from "supertest"

import { PrismaClient } from "@prisma/client"
import app from "../../app"

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
		it("should register a new user", async () => {
			const response = await request(app)
				.post("/api/v1/auth/register")
				.set("X-API-Key", process.env.API_KEY!)
				.send({
					email: "newuser@example.com",
					password: "Test123!",
					first_name: "New",
					last_name: "User",
					phone: "1234567890",
					role: "user",
				})

			// Debug: Log the response if it fails
			if (response.status !== 201) {
				console.log("Response body:", response.body)
				console.log("Response status:", response.status)
			}

			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty("user")
			expect(response.body).toHaveProperty("token")
		})

		// it("should reject weak passwords", async () => {
		// 	const response = await request(app)
		// 		.post("/api/v1/auth/register")
		// 		.set("X-API-Key", process.env.API_KEY!)
		// 		.send({
		// 			email: "weak@example.com",
		// 			password: "123",
		// 			firstName: "Weak",
		// 			lastName: "Password",
		// 		})
		// 	expect(response.status).toBe(400)
		// 	expect(response.body.message).toContain("Password")
		// })
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
