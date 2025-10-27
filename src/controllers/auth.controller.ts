import { Request, Response } from "express"
import db from "../config/database"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.util"

const SALT_ROUNDS = 10

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
	if (!req.body) {
		res.status(400).json({ message: "There is no body !" })
		return
	}

	try {
		const { first_name, last_name, email, password, phone, role } = req.body

		// Validate required fields
		if (!first_name || !last_name || !email || !password) {
			res.status(400).json({
				message:
					"Missing required fields: first_name, last_name, email, password",
			})
			return
		}

		// Check if user already exists
		const existingUser = db
			.prepare("SELECT id FROM users WHERE email = ?")
			.get(email)

		if (existingUser) {
			res.status(409).json({ message: "User with this email already exists" })
			return
		}

		// Hash the password
		const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

		// Insert new user
		const result = db
			.prepare(
				`
      INSERT INTO users (first_name, last_name, email, password_hash, phone, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `
			)
			.run(
				first_name,
				last_name,
				email,
				password_hash,
				phone || null,
				role || "customer"
			)

		// Generate JWT token
		const token = generateToken({
			id: result.lastInsertRowid as number,
			email,
			role: role || "customer",
		})

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				first_name,
				last_name,
				email,
				role: role || "customer",
			},
		})
	} catch (error) {
		console.error("Registration error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
	if (!req.body) {
		res.status(400).json({ message: "There is no body !" })
		return
	}

	try {
		const { email, password } = req.body

		// Validate required fields
		if (!email || !password) {
			res.status(400).json({ message: "Email and password are required" })
			return
		}

		// Find user by email
		const user = db
			.prepare(
				"SELECT id, first_name, last_name, email, password_hash, role, is_active FROM users WHERE email = ?"
			)
			.get(email) as any

		if (!user) {
			res.status(401).json({ message: "Invalid email or password" })
			return
		}

		// Check if account is active
		if (!user.is_active) {
			res.status(403).json({ message: "Account is disabled" })
			return
		}

		// Verify password
		const isValidPassword = await bcrypt.compare(password, user.password_hash)

		if (!isValidPassword) {
			res.status(401).json({ message: "Invalid email or password" })
			return
		}

		// Generate JWT token
		const token = generateToken({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		res.status(200).json({
			message: "Login successful",
			token,
		})
	} catch (error) {
		console.error("Login error:", error)
		res.status(500).json({
			message: "Internal server error",
		})
	}
}
