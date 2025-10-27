import jwt from "jsonwebtoken"

const JWT_SECRET =
	process.env.JWT_SECRET || "fallback-secret-change-in-production"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h"

export interface JWTPayload {
	id: number
	email: string
	role: string
}

// Generate a JWT token
export const generateToken = (payload: JWTPayload): string => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	} as jwt.SignOptions)
}

// Verify and decode a JWT token
export const verifyToken = (token: string): JWTPayload | null => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
		return decoded
	} catch (error) {
		return null
	}
}
