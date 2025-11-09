import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UserModel {
	async create(userData: {
		firstName: string
		lastName: string
		email: string
		passwordHash: string
		phone?: string
		role?: string
	}) {
		return await prisma.user.create({
			data: userData,
		})
	}

	async findByEmail(email: string) {
		return await prisma.user.findUnique({
			where: { email },
		})
	}

	async findById(id: string) {
		return await prisma.user.findUnique({
			where: { id },
		})
	}

	async updateUser(id: string, data: any) {
		return await prisma.user.update({
			where: { id },
			data,
		})
	}

	async getAllUsers() {
		return await prisma.user.findMany({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				isVerified: true,
				createdAt: true,
			},
		})
	}
}

export default new UserModel()
