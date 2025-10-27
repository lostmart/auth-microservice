import express from "express"
const router = express.Router()

// Example auth route: Login
router.post("/login", (req, res) => {
	try {
		const { username, password } = req.body

		// Placeholder logic for authentication
		if (username === "admin" && password === "password") {
			res.json({ message: "Login successful", token: "fake-jwt-token" })
		} else {
			res.status(401).json({ message: "Invalid credentials" })
		}
	} catch (error) {
		res.status(400).json({ message: "Not really ..." })
	}
})

// Example auth route: Register
router.post("/register", (req, res) => {
	const { username, password } = req.body
	// Placeholder logic for registration
	res.json({ message: `User ${username} registered successfully` })
})

export default router
