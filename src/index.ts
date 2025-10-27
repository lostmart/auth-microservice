import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000
import app from "./app"

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
