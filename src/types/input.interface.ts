export interface RegisterInput {
	first_name: string
	last_name: string
	email: string
	password: string
	phone?: string
	role?: string
}

export interface LoginInput {
	email: string
	password: string
}

export interface RegisterInput {
	first_name: string
	last_name: string
	email: string
	password: string
	phone?: string
	role?: string
}

export interface LoginInput {
	email: string
	password: string
}

export interface UpdateProfileInput {
	first_name?: string
	last_name?: string
	phone?: string
	password?: string
}
