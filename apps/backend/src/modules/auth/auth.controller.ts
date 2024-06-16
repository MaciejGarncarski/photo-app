import { verify } from 'argon2'
import type { FastifyReply, FastifyRequest } from 'fastify'

import type { RegisterValues, SignInValues } from './auth.schema.js'
import { registerUser } from './auth.service.js'
import { db } from '../../utils/db.js'
import { mapPrismaUser } from '../../utils/map-prisma-user.js'

export const signInCredentialsHandler = async (
	request: FastifyRequest<{
		Body: SignInValues
	}>,
	reply: FastifyReply,
) => {
	const { email, password } = request.body

	const user = await db.user.findFirst({
		where: {
			email,
		},
	})

	if (!user) {
		return reply.notFound('Invalid credentials.')
	}

	const isPasswordEqual = await verify(user?.password || '', password)

	if (!isPasswordEqual) {
		return reply.badRequest('Invalid credentials.')
	}

	const mappedUser = mapPrismaUser(user)

	request.session.userId = mappedUser.id
	return { data: mappedUser }
}

export const registerCredentialsHandler = async (
	request: FastifyRequest<{
		Body: RegisterValues
	}>,
	reply: FastifyReply,
) => {
	const data = request.body

	if (data.password !== data.confirmPassword) {
		return reply.badRequest('Passwords do not match.')
	}

	const emailTaken = Boolean(
		await db.user.count({
			where: {
				email: data.email,
			},
		}),
	)

	if (emailTaken) {
		return reply.badRequest('Email is already taken.')
	}

	const usernameTaken = Boolean(
		await db.user.count({
			where: {
				username: data.username,
			},
		}),
	)

	if (usernameTaken) {
		return reply.badRequest('Username is already taken.')
	}

	const registeredUser = await registerUser(data)
	request.session.userId = registeredUser.id

	return reply.status(201).send({ data: registerUser })
}

export const getCurrentUserHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { userId } = request.session

	if (!userId) {
		return reply.notFound('User not found.')
	}

	const userData = await db.user.findFirst({
		where: {
			userId: userId,
		},
	})

	if (!userData) {
		return reply.notFound('User not found.')
	}

	const mappedUser = mapPrismaUser(userData)
	return { data: mappedUser }
}

export const signOutHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await request.session.destroy()
	return reply.status(204).send()
}
