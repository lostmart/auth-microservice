import { Response } from "express"
import authService from "../services/auth.service"
import { AuthenticatedRequest } from "../types/express"

export class AuthController {
	async register(req: AuthenticatedRequest, res: Response) {
		try {
			const { email, password, first_name, last_name, phone, role } = req.body

			// Validate input
			if (!email || !password || !first_name || !last_name) {
				return res.status(400).json({
					message: "Missing required fields",
				})
			}

			const result = await authService.register({
				email,
				password,
				first_name,
				last_name,
				phone,
				role,
			})

			res.status(201).json({
				message: "User registered successfully",
				token: result.token,
				user: result.user,
			})
		} catch (error: any) {
			res.status(400).json({
				message: error.message || "Registration failed",
			})
		}
	}

	async login(req: AuthenticatedRequest, res: Response) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).json({
					message: "Email and password are required",
				})
			}

			const result = await authService.login({ email, password })

			res.json({
				message: "Login successful",
				token: result.token,
				user: result.user,
			})
		} catch (error: any) {
			res.status(401).json({
				message: error.message || "Login failed",
			})
		}
	}

	async getProfile(req: AuthenticatedRequest, res: Response) {
		try {
			const userId = req.user?.id

			if (!userId) {
				return res.status(401).json({ message: "Unauthorized" })
			}

			const user = await authService.getUserById(String(userId))

			res.json({ user })
		} catch (error: any) {
			res.status(404).json({
				message: error.message || "User not found",
			})
		}
	}

	async updateProfile(req: AuthenticatedRequest, res: Response) {
		try {
			const userId = req.user?.id

			if (!userId) {
				return res.status(401).json({ message: "Unauthorized" })
			}

			const { first_name, last_name, phone } = req.body

			const updatedUser = await authService.updateProfile(String(userId), {
				first_name,
				last_name,
				phone,
			})

			res.json({
				message: "Profile updated successfully",
				user: updatedUser,
			})
		} catch (error: any) {
			res.status(400).json({
				message: error.message || "Update failed",
			})
		}
	}
}

export default new AuthController()
