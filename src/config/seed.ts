// src/config/seed.ts
import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/password.util"

const prisma = new PrismaClient()

const seedUsers = [
	{
		firstName: "Admin",
		lastName: "User",
		email: "admin@parisclassictours.fr",
		passwordHash: "", // Will be set later
		role: "admin",
		phone: "+33612345678",
	},
	{
		firstName: "Pierre",
		lastName: "Martin",
		email: "pierre.martin@parisclassictours.fr",
		passwordHash: "",
		role: "driver",
		phone: "+33623456789",
	},
	{
		firstName: "Marie",
		lastName: "Lefevre",
		email: "marie.lefevre@email.fr",
		passwordHash: "",
		role: "customer",
		phone: "+33634567890",
	},
]

export async function seedDatabase() {
	try {
		console.log("🌱 Starting database seed...")

		// Hash passwords
		seedUsers[0].passwordHash = await hashPassword("admin123")
		seedUsers[1].passwordHash = await hashPassword("driver123")
		seedUsers[2].passwordHash = await hashPassword("customer123")

		// Check if users already exist
		for (const userData of seedUsers) {
			const existingUser = await prisma.user.findUnique({
				where: { email: userData.email },
			})

			if (!existingUser) {
				await prisma.user.create({
					data: userData,
				})
				console.log(`✅ Created user: ${userData.email}`)
			} else {
				console.log(`⏭️  User already exists: ${userData.email}`)
			}
		}

		console.log("✅ Database seed completed!")
	} catch (error) {
		console.error("❌ Error seeding database:", error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

// Run seed if called directly
if (require.main === module) {
	seedDatabase().catch((error) => {
		console.error(error)
		process.exit(1)
	})
}
