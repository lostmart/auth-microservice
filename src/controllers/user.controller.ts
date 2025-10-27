import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"

// Get all users (admin only)
export const getAllUsers = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const users = AuthService.getAllUsers()

		res.status(200).json({
			count: users.length,
			users,
		})
	} catch (error) {
		console.error("Get all users error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}
