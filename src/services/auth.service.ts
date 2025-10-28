import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.util"
import { User, CreateUserData } from "../types/user.interface"
import { UserModel } from "../models/user.model"
import {
	LoginInput,
	RegisterInput,
	UpdateProfileInput,
} from "../types/input.interface"

const SALT_ROUNDS = 10

export class AuthService {
	// Register a new user
	static async register(input: RegisterInput) {
		// Check if user exists
		const existingUser = UserModel.findByEmail(input.email)
		if (existingUser) {
			throw new Error("User with this email already exists")
		}

		// Hash password
		const password_hash = await bcrypt.hash(input.password, SALT_ROUNDS)

		// Create user data
		const userData: CreateUserData = {
			first_name: input.first_name,
			last_name: input.last_name,
			email: input.email,
			password_hash,
			phone: input.phone,
			role: input.role || "customer",
		}

		// Save to database (returns ULID string)
		const userId = UserModel.create(userData)

		// Get created user
		const user = UserModel.findById(userId)
		if (!user) {
			throw new Error("Failed to create user")
		}

		// Generate token
		const token = generateToken({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		return {
			token,
			user: UserModel.toPublic(user),
		}
	}

	// Login user
	static async login(input: LoginInput) {
		// Find user
		const user = UserModel.findByEmail(input.email)
		if (!user) {
			throw new Error("Invalid email or password")
		}

		// Check if active
		if (!user.is_active) {
			throw new Error("Account is disabled")
		}

		// Verify password
		const isValidPassword = await bcrypt.compare(
			input.password,
			user.password_hash
		)
		if (!isValidPassword) {
			throw new Error("Invalid email or password")
		}

		// Generate token
		const token = generateToken({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		return {
			token,
			user: UserModel.toPublic(user),
		}
	}

	// Get user profile by ID
	static getUserProfile(userId: string) {
		// Changed from number to string
		const user = UserModel.findById(userId)
		if (!user) {
			throw new Error("User not found")
		}
		return UserModel.toPublic(user)
	}

	// Update user profile
	static async updateProfile(userId: string, input: UpdateProfileInput) {
		// Changed from number to string
		const user = UserModel.findById(userId)
		if (!user) {
			throw new Error("User not found")
		}

		// Prepare updates
		const updates: Partial<User> = {}

		if (input.first_name) updates.first_name = input.first_name
		if (input.last_name) updates.last_name = input.last_name
		if (input.phone !== undefined) updates.phone = input.phone

		// Hash new password if provided
		if (input.password) {
			updates.password_hash = await bcrypt.hash(input.password, SALT_ROUNDS)
		}

		// Update in database
		const success = UserModel.update(userId, updates)
		if (!success) {
			throw new Error("Failed to update profile")
		}

		// Return updated user
		const updatedUser = UserModel.findById(userId)
		if (!updatedUser) {
			throw new Error("Failed to retrieve updated user")
		}

		return UserModel.toPublic(updatedUser)
	}

	// Get all users (admin only)
	static getAllUsers() {
		const users = UserModel.findAll()
		return users.map((user) => UserModel.toPublic(user))
	}
}
