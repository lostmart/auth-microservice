import { Router } from "express"
import {
	register,
	login,
	getMe,
	updateProfile,
} from "../controllers/auth.controller"
import { authenticateToken } from "../middleware/auth.middleware"

const router = Router()

// Public routes (protected by API key at app level)
router.post("/register", register)
router.post("/login", login)

// Protected routes (require JWT token)
router.get("/me", authenticateToken, getMe)
router.put("/profile", authenticateToken, updateProfile)

export default router
