import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

const DATABASE_PATH = process.env.DATABASE_PATH || "./data/dev.db"

// Ensure the data directory exists
const dataDir = path.dirname(DATABASE_PATH)
if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true })
}

// Create database connection
const db = new Database(DATABASE_PATH, {
	verbose: process.env.NODE_ENV === "development" ? console.log : undefined,
})

// Enable important pragmas
db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")
db.pragma("synchronous = NORMAL")

console.log(`Database connected: ${DATABASE_PATH}`)

// Graceful shutdown handler
export const closeDatabase = () => {
	db.close()
	console.log("Database connection closed")
}

// Handle process termination
process.on("SIGINT", () => {
	closeDatabase()
	process.exit(0)
})

process.on("SIGTERM", () => {
	closeDatabase()
	process.exit(0)
})

export default db
