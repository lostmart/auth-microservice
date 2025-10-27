import db from "./database"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10 // Higher = more secure but slower

interface SeedUser {
	first_name: string
	last_name: string
	email: string
	password: string
	phone?: string
	role: string
	is_verified: number
}

const seedUsers: SeedUser[] = [
	{
		first_name: "Admin",
		last_name: "User",
		email: "admin@parisclassictours.fr",
		password: "admin123",
		phone: "+33 1 42 86 82 00",
		role: "admin",
		is_verified: 1,
	},
	{
		first_name: "Pierre",
		last_name: "Martin",
		email: "pierre.martin@parisclassictours.fr",
		password: "driver123",
		phone: "+33 6 12 34 56 78",
		role: "driver",
		is_verified: 1,
	},
	{
		first_name: "Marie",
		last_name: "Lefevre",
		email: "marie.lefevre@email.fr",
		password: "customer123",
		phone: "+33 6 98 76 54 32",
		role: "customer",
		is_verified: 1,
	},
	{
		first_name: "Jean",
		last_name: "Dupont",
		email: "jean.dupont@email.fr",
		password: "customer123",
		role: "customer",
		is_verified: 0, // Unverified user example
	},
	{
		first_name: "Sophie",
		last_name: "Bernard",
		email: "sophie.bernard@parisclassictours.fr",
		password: "driver123",
		phone: "+33 6 11 22 33 44",
		role: "driver",
		is_verified: 1,
	},
]

export const seedDatabase = async () => {
	console.log("Seeding database...")

	// Check if users already exist
	const existingUsers = db
		.prepare("SELECT COUNT(*) as count FROM users")
		.get() as { count: number }

	if (existingUsers.count > 0) {
		console.log("Database already seeded, skipping...")
		return
	}

	// Prepare insert statement
	const insertUser = db.prepare(`
    INSERT INTO users (first_name, last_name, email, password_hash, phone, role, is_verified)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

	// Insert all users
	for (const user of seedUsers) {
		const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)

		insertUser.run(
			user.first_name,
			user.last_name,
			user.email,
			hashedPassword,
			user.phone || null,
			user.role,
			user.is_verified
		)

		console.log(`✓ Seeded user: ${user.email} (${user.role})`)
	}

	console.log("Database seeding completed!")
}
