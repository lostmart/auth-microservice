import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000
import app from "./app"
import {
	apiKeyValidator,
	requestLogger,
	authenticateToken,
} from "./middleware/auth.middleware"

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the Auth Microservice",
		author: "Martin P",
		version: "1.0.0",
	})
})

// Health check route
app.get("/api/v1/health", apiKeyValidator, (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
