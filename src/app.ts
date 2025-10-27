import express from "express"

import db from "./config/database"
import { initDatabase } from "./config/initDatabase"
import authRoutes from "./routes/auth.routes"

// Initialize database (async)
initDatabase().catch((err) => {
	console.error("Failed to initialize database:", err)
	process.exit(1)
})

import {
	apiKeyValidator,
	requestLogger,
	authenticateToken,
} from "./middleware/auth.middleware"

const app = express()

// CORS Middleware
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")
	next()
})

// Middleware
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(requestLogger) // Log all requests

// Routes
app.use("/api/v1/auth", apiKeyValidator, authRoutes)

// Health check route
app.get("/api/v1/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

export default app
