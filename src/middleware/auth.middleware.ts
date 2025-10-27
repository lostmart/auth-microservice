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
	const timestamp = new Date().toISOString()
	const method = req.method
	const url = req.originalUrl
	const ip = req.ip || req.socket.remoteAddress

	console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`)
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

// Middleware to check user roles
export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = (req as any).user // We'll type this properly later

		if (!user) {
			return res.status(401).json({ message: "Authentication required" })
		}

		if (!allowedRoles.includes(user.role)) {
			return res.status(403).json({
				message: "Insufficient permissions",
				required: allowedRoles,
				current: user.role,
			})
		}

		next()
	}
}
