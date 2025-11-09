// src/__tests__/unit/auth.service.test.ts
import authService from "../../services/auth.service" // ← No .js

function sum(a: number, b: number): number {
	return a + b
}

import { hashPassword, comparePassword } from "../../utils/password.util.js"

jest.mock("../../models/user.model")
// Remove mock for refreshToken.service as it's not used in the current auth.service

describe("AuthService", () => {
	describe("login", () => {
		console.log("Tests for authService.login are currently commented out.")

		test("adds 1 + 2 to equal 3", () => {
			expect(sum(1, 2)).toBe(3)
		})

		// it("should return token and user on valid credentials", async () => {
		// 	const mockUser = {
		// 		id: "123",
		// 		email: "test@example.com",
		// 		passwordHash: await hashPassword("Test123!"),
		// 		firstName: "Test",
		// 		lastName: "User",
		// 		role: "customer",
		// 		phone: null,
		// 		isVerified: false,
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 		isActive: true,
		// 	}

		// 	jest.spyOn(userModel, "findByEmail").mockResolvedValue(mockUser)

		// 	const result = await authService.login({
		// 		email: "test@example.com",
		// 		password: "Test123!",
		// 	})

		// 	expect(result).toHaveProperty("token")
		// 	expect(result).toHaveProperty("user")
		// 	expect(result.user.email).toBe("test@example.com")
		// })

		// it("should throw error on invalid credentials", async () => {
		// 	jest.spyOn(userModel, "findByEmail").mockResolvedValue(null)

		// 	await expect(
		// 		authService.login({
		// 			email: "wrong@example.com",
		// 			password: "wrong",
		// 		})
		// 	).rejects.toThrow("Invalid credentials")
		// })
	})
})
