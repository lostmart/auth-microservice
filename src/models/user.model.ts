import db from "../config/database"
import { CreateUserData, User, UserPublic } from "../types/user.interface"




// Database operations for users
export class UserModel {
	// Find user by email
	static findByEmail(email: string): User | undefined {
		return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
			| User
			| undefined
	}

	// Find user by ID
	static findById(id: number): User | undefined {
		return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
			| User
			| undefined
	}

	// Create a new user
	static create(userData: CreateUserData): number {
		const result = db
			.prepare(
				`
      INSERT INTO users (first_name, last_name, email, password_hash, phone, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `
			)
			.run(
				userData.first_name,
				userData.last_name,
				userData.email,
				userData.password_hash,
				userData.phone || null,
				userData.role || "customer"
			)

		return result.lastInsertRowid as number
	}

	// Get all users (for admin)
	static findAll(): User[] {
		return db.prepare("SELECT * FROM users").all() as User[]
	}

	// Update user
	static update(id: number, updates: Partial<User>): boolean {
		const fields = Object.keys(updates)
			.map((key) => `${key} = ?`)
			.join(", ")
		const values = [...Object.values(updates), id]

		const result = db
			.prepare(
				`UPDATE users SET ${fields}, updated_at = datetime('now') WHERE id = ?`
			)
			.run(...values)

		return result.changes > 0
	}

	// Delete user (soft delete by setting is_active = 0)
	static deactivate(id: number): boolean {
		const result = db
			.prepare(
				"UPDATE users SET is_active = 0, updated_at = datetime('now') WHERE id = ?"
			)
			.run(id)

		return result.changes > 0
	}

	// Hard delete (for admin/testing)
	static delete(id: number): boolean {
		const result = db.prepare("DELETE FROM users WHERE id = ?").run(id)
		return result.changes > 0
	}

	// Remove sensitive data from user object
	static toPublic(user: User): UserPublic {
		const { password_hash, is_active, updated_at, id, ...publicData } = user
		return publicData
	}
}
