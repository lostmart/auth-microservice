import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"

// Extend Request to include user from JWT
interface AuthenticatedRequest extends Request {
	user?: {
		id: string // Changed from number to string
		email: string
		role: string
	}
}

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
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

		// Call service
		const result = await AuthService.register({
			first_name,
			last_name,
			email,
			password,
			phone,
			role,
		})

		res.status(201).json({
			message: "User registered successfully",
			...result,
		})
	} catch (error: any) {
		if (error.message === "User with this email already exists") {
			res.status(409).json({ message: error.message })
			return
		}

		console.error("Registration error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body

		// Validate required fields
		if (!email || !password) {
			res.status(400).json({ message: "Email and password are required" })
			return
		}

		// Call service
		const result = await AuthService.login({ email, password })

		res.status(200).json({
			message: "Login successful",
			...result,
		})
	} catch (error: any) {
		if (
			error.message === "Invalid email or password" ||
			error.message === "Account is disabled"
		) {
			res.status(401).json({ message: error.message })
			return
		}

		console.error("Login error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

// Get current user profile
export const getMe = async (req: Request, res: Response): Promise<void> => {
	try {
		const authReq = req as AuthenticatedRequest
		const userId = authReq.user?.id

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" })
			return
		}

		const user = AuthService.getUserProfile(userId)

		res.status(200).json({ user })
	} catch (error: any) {
		console.error("Get profile error:", error)

		if (error.message === "User not found") {
			res.status(404).json({ message: error.message })
			return
		}

		res.status(500).json({ message: "Internal server error" })
	}
}

// Update current user profile
export const updateProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const authReq = req as AuthenticatedRequest
		const userId = authReq.user?.id

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" })
			return
		}

		const { first_name, last_name, phone, password } = req.body

		const updatedUser = await AuthService.updateProfile(userId, {
			first_name,
			last_name,
			phone,
			password,
		})

		res.status(200).json({
			message: "Profile updated successfully",
			user: updatedUser,
		})
	} catch (error: any) {
		console.error("Update profile error:", error)

		if (error.message === "User not found") {
			res.status(404).json({ message: error.message })
			return
		}

		res.status(500).json({ message: "Internal server error" })
	}
}
