import dotenv from "dotenv"

// Load environment variables FIRST
dotenv.config()

// NOW initialize database (after env vars are loaded)
import { initDatabase } from "./config/initDatabase"

// THEN import app
import app from "./app"

const PORT = process.env.PORT || 3000

// Initialize database before starting server
async function startServer() {
	try {
		// Initialize database
		await initDatabase()
		console.log("✅ Database initialized")

		// Routes
		app.get("/", (req, res) => {
			res.json({
				message: "Welcome to the Auth Microservice",
				author: "Martin P",
				version: "1.0.0",
			})
		})

		// Start server
		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`)
		})
	} catch (error) {
		console.error("❌ Failed to start server:", error)
		process.exit(1)
	}
}

startServer()
