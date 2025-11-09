// src/routes/auth.routes.ts
import { Router } from "express"
import authController from "../controllers/auth.controller"
import { authenticateToken } from "../middleware/auth.middleware"

const router = Router()

// Public routes (protected by API key at app level)
router.post("/register", authController.register)
router.post("/login", authController.login)

// Protected routes (require JWT token)
router.get("/me", authenticateToken, authController.getProfile)
router.put("/profile", authenticateToken, authController.updateProfile)

export default router
