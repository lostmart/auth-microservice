import db from "./database"
import { seedDatabase } from "./seed"

export const initDatabase = async () => {
	const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'customer',
      is_verified INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `

	db.exec(createUsersTable)
	console.log("Database tables initialized")

	// Seed in development and staging/demo environments
	const shouldSeed =
		process.env.NODE_ENV === "development" ||
		process.env.SEED_DATABASE === "true"

	if (shouldSeed) {
		await seedDatabase()
	} else {
		console.log("Skipping database seeding (production mode)")
	}
}
