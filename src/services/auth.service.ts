import userModel from "../models/user.model"
import {
	hashPassword,
	comparePassword,
	validatePassword,
} from "../utils/password.util"
import { validateEmail } from "../utils/validation.util"
import { generateToken } from "../utils/jwt.util"
import { UserPublic } from "../types/user.interface"

export class AuthService {
	async register(input: {
		email: string
		password: string
		first_name: string
		last_name: string
		phone?: string
		role?: string
	}) {
		// Validate email
		if (!validateEmail(input.email)) {
			throw new Error("Invalid email format")
		}

		// Validate password
		const passwordValidation = validatePassword(input.password)
		if (!passwordValidation.valid) {
			throw new Error(passwordValidation.message)
		}

		// Check if user exists
		const existingUser = await userModel.findByEmail(input.email) // ← await + lowercase
		if (existingUser) {
			throw new Error("User already exists")
		}

		// Hash password
		const passwordHash = await hashPassword(input.password)

		// Create user data
		const userData = {
			firstName: input.first_name, // Convert snake_case to camelCase for Prisma
			lastName: input.last_name,
			email: input.email,
			passwordHash: passwordHash,
			phone: input.phone,
			role: input.role || "customer",
		}

		// Create user
		const user = await userModel.create(userData) // ← await + lowercase

		// Generate token
		const token = generateToken({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		return {
			token,
			user: {
				first_name: user.firstName, // Convert back to snake_case for API response
				last_name: user.lastName,
				email: user.email,
				role: user.role,
				phone: user.phone,
				is_verified: user.isVerified ? 1 : 0,
				created_at: user.createdAt.toISOString(),
			},
		}
	}

	async login(input: { email: string; password: string }) {
		// Find user
		const user = await userModel.findByEmail(input.email) // ← await + lowercase
		if (!user) {
			throw new Error("Invalid credentials")
		}

		// Verify password
		const isPasswordValid = await comparePassword(
			input.password,
			user.passwordHash
		)
		if (!isPasswordValid) {
			throw new Error("Invalid credentials")
		}

		// Generate token
		const token = generateToken({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		return {
			token,
			user: {
				first_name: user.firstName,
				last_name: user.lastName,
				email: user.email,
				role: user.role,
				phone: user.phone,
				is_verified: user.isVerified ? 1 : 0,
				created_at: user.createdAt.toISOString(),
			},
		}
	}

	async getUserById(userId: string) {
		const user = await userModel.findById(userId) // ← await + lowercase
		if (!user) {
			throw new Error("User not found")
		}

		return {
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
			role: user.role,
			phone: user.phone,
			is_verified: user.isVerified ? 1 : 0,
			created_at: user.createdAt.toISOString(),
		}
	}

	async updateProfile(
		userId: string,
		updates: {
			first_name?: string
			last_name?: string
			phone?: string
		}
	) {
		// Find user first
		const user = await userModel.findById(userId) // ← await + lowercase
		if (!user) {
			throw new Error("User not found")
		}

		// Convert snake_case to camelCase for Prisma
		const prismaUpdates: any = {}
		if (updates.first_name) prismaUpdates.firstName = updates.first_name
		if (updates.last_name) prismaUpdates.lastName = updates.last_name
		if (updates.phone) prismaUpdates.phone = updates.phone

		// Update user
		const updatedUser = await userModel.updateUser(userId, prismaUpdates) // ← await + lowercase

		return {
			first_name: updatedUser.firstName,
			last_name: updatedUser.lastName,
			email: updatedUser.email,
			role: updatedUser.role,
			phone: updatedUser.phone,
			is_verified: updatedUser.isVerified ? 1 : 0,
			created_at: updatedUser.createdAt.toISOString(),
		}
	}

	async getAllUsers(): Promise<UserPublic[]> {
		const users = await userModel.getAllUsers()
		return users.map(
			(user): UserPublic => ({
				first_name: user.firstName,
				last_name: user.lastName,
				email: user.email,
				role: user.role,
				is_verified: user.isVerified ? 1 : 0,
				created_at: user.createdAt.toISOString(),
			})
		)
	}
}

export default new AuthService()
