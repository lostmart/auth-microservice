export interface User {
	id: string
	first_name: string
	last_name: string
	email: string
	password_hash: string
	phone?: string
	role: string
	is_verified: number
	is_active: number
	created_at: string
	updated_at: string
}

export interface CreateUserData {
	first_name: string
	last_name: string
	email: string
	password_hash: string
	phone?: string
	role?: string
}

export interface UserPublic {
	first_name: string
	last_name: string
	email: string
	role: string
	phone?: string | null
	is_verified: number
	created_at: string
}