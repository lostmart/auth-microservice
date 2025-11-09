import argon2 from "argon2"

export const validatePassword = (
	password: string
): { valid: boolean; message?: string } => {
	if (password.length < 8) {
		return { valid: false, message: "Password must be at least 8 characters" }
	}

	if (!/[A-Z]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one uppercase letter",
		}
	}

	if (!/[a-z]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one lowercase letter",
		}
	}

	if (!/[0-9]/.test(password)) {
		return {
			valid: false,
			message: "Password must contain at least one number",
		}
	}

	if (!/[!@#$%^&*]/.test(password)) {
		return {
			valid: false,
			message:
				"Password must contain at least one special character (!@#$%^&*)",
		}
	}

	return { valid: true }
}

export const hashPassword = async (password: string): Promise<string> => {
	return await argon2.hash(password)
}

export const comparePassword = async (
	password: string,
	hash: string
): Promise<boolean> => {
	return await argon2.verify(hash, password)
}
