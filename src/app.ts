import express from "express"

const app = express()

// Middleware
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Health check route
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

export default app
