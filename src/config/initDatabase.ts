import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function initDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected (PostgreSQL)')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export default prisma