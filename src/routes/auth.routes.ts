import express from "express"
import { login, register } from "../controllers/auth.controller"
const router = express.Router()

// Example auth route: Login
router.post("/login", login)

// Example auth route: Register
router.post("/register", register)

export default router
