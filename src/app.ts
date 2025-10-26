import express from "express"

import db from "./config/database"
import { initDatabase } from "./config/initDatabase"

// Initialize database tables
initDatabase()

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

// Health check route
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() })
})

export default app
