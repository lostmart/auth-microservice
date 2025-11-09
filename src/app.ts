// src/app.ts
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"

import {
	apiKeyValidator,
	requestLogger,
	authenticateToken,
} from "./middleware/auth.middleware"

const app = express()

// CORS Configuration
const corsOptions = {
	origin:
		process.env.NODE_ENV === "production"
			? process.env.FRONTEND_URL
			: ["http://localhost:5173", "http://localhost:3000"],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
	credentials: true,
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// Routes
app.use("/api/v1/auth", apiKeyValidator, authRoutes)
app.use("/api/v1/users", apiKeyValidator, userRoutes)

// Health check route
app.get("/api/v1/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

export default app
