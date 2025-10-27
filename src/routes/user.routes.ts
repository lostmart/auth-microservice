import { Router } from "express"
import { getAllUsers } from "../controllers/user.controller"
import {
	authenticateToken,
	authorizeRoles,
} from "../middleware/auth.middleware"

const router = Router()

// Admin only route
router.get("/", authenticateToken, authorizeRoles("admin"), getAllUsers)

export default router
