// src/controllers/user.controller.ts
import { Request, Response } from "express"
import authService from "../services/auth.service" // Import the instance (default export)

// Get all users (admin only)
export const getAllUsers = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const users = await authService.getAllUsers() // Await the async method on the instance

		res.status(200).json({
			count: users.length,
			users,
		})
	} catch (error: any) {
		// Type error as any for broad catching
		console.error("Get all users error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}
