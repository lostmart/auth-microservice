import { NextFunction, Request, Response, RequestHandler } from "express"

// Middleware to check API key in request headers
export const apiKeyValidator: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const apiKey = req.headers["x-api-key"]
    const validApiKey = process.env.API_KEY

    if (apiKey && apiKey === validApiKey) {
        next()
    } else {
        res.status(403).json({ message: "Forbidden: Invalid API Key" })
    }
}

// Middleware to log request details
export const requestLogger: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
	next()
}

// Middleware to check for a valid authentication token
export const authenticateToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader && authHeader.split(" ")[1]

	if (token == null) {
		return res.status(401).json({ message: "No token provided" })
	}

	// Placeholder logic for token verification
	if (token === "fake-jwt-token") {
		next()
	} else {
		return res.status(403).json({ message: "Invalid token" })
	}
}
