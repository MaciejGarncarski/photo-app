import { type Static, Type } from '@fastify/type-provider-typebox'

export const signInSchema = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String(),
})

export type SignInValues = Static<typeof signInSchema>

export const username = Type.String()

export const registerSchema = Type.Object({
	email: Type.String({ format: 'email' }),
	username: Type.String(),
	password: Type.String({ minLength: 5 }),
	confirmPassword: Type.String({ minLength: 5 }),
})

export type RegisterValues = Static<typeof registerSchema>

export const googleUserSchema = Type.Object({
	id: Type.String(),
	name: Type.String(),
	given_name: Type.String(),
	picture: Type.String(),
	locale: Type.String(),
})

export type GoogleUser = Static<typeof googleUserSchema>
