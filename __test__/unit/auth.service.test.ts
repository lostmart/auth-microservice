// src/__tests__/unit/auth.service.test.ts
import authService from "../../services/auth.service"
import userModel from "../../models/user.model"
import { hashPassword } from "../../utils/password.util"

jest.mock("../../models/user.model")
jest.mock("../../services/refreshToken.service")

describe("AuthService", () => {
	describe("login", () => {
		it("should return tokens on valid credentials", async () => {
			const mockUser = {
				id: "123",
				email: "test@example.com",
				passwordHash: await hashPassword("Test123!"),
				firstName: "Test",
				lastName: "User",
				role: "customer",
			}

			jest.spyOn(userModel, "findByEmail").mockResolvedValue(mockUser)

			const result = await authService.login("test@example.com", "Test123!")

			expect(result).toHaveProperty("accessToken")
			expect(result).toHaveProperty("refreshToken")
			expect(result.user.email).toBe("test@example.com")
		})

		it("should throw error on invalid credentials", async () => {
			jest.spyOn(userModel, "findByEmail").mockResolvedValue(null)

			await expect(
				authService.login("wrong@example.com", "wrong")
			).rejects.toThrow("Invalid credentials")
		})
	})
})
