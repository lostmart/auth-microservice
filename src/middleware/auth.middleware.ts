import { NextFunction, Request, Response, RequestHandler } from "express"
import { verifyToken } from "../utils/jwt.util"

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
	user?: {
		id: string
		email: string
		role: string
	}
}

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

// Middleware to check for a valid JWT token
export const authenticateToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader && authHeader.split(" ")[1] // Format: "Bearer TOKEN"

	if (!token) {
		return res.status(401).json({ message: "No token provided" })
	}

	// Verify the token using our JWT utility
	const decoded = verifyToken(token)

	if (!decoded) {
		return res.status(403).json({ message: "Invalid or expired token" })
	}

	// Attach user info to request for use in route handlers
	;(req as AuthenticatedRequest).user = decoded

	next()
}

// Middleware to check user roles
export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = (req as AuthenticatedRequest).user

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
