import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000
import app from "./app"
import { version } from "os"

// Health check route
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the Auth Microservice",
		author: "Martin P",
		version: "1.0.0",
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
