import type { Token } from '@fastify/oauth2'
import { hash } from 'argon2'

import type { GoogleUser, RegisterValues } from '../auth/auth.schema.js'
import type { User } from '../user/user.schema.js'
import { db } from '../../utils/db.js'
import { mapPrismaUser } from '../../utils/map-prisma-user.js'
import { nanoid } from 'nanoid'

export const registerUser = async ({
	email,
	username,
	password,
}: RegisterValues) => {
	const hashedPassword = await hash(password)

	const createdUser = await db.user.create({
		data: {
			email,
			username,
			password: hashedPassword,
			avatarUrl: null,
		},
	})

	const mappedUser = {
		bio: createdUser.bio,
		createdAt: createdUser.createdAt.toString(),
		id: createdUser.userId,
		avatar: createdUser.avatarUrl,
		name: createdUser.name,
		username: createdUser.username || '',
	} satisfies User

	return mappedUser
}

export const createGoogleUser = async (
	googleUserData: GoogleUser,
	token: Token,
): Promise<User> => {
	const { id, picture, name } = googleUserData

	const { expires_at } = token
	const currentDate = new Date(expires_at)
	const expiresAt = Math.ceil(currentDate.getTime() / 1000)

	const temporaryUsername = `user-${nanoid(6)}`

	const user = await db.$transaction(async (tx) => {
		const account = await tx.account.findFirst({
			where: {
				providerAccountId: id,
			},
		})

		const accountExists = Boolean(account)

		const createdUser = await tx.user.create({
			data: {
				userId: account?.userId,
				name: name,
				username: temporaryUsername,
				avatarUrl: picture,
			},
		})

		if (!accountExists) {
			await tx.account.create({
				data: {
					userId: createdUser.userId,
					type: 'oauth',
					provider: 'google',
					providerAccountId: id,
					expiresAt: expiresAt,
				},
				select: {
					user: true,
				},
			})
		}

		const mappedUser = mapPrismaUser(createdUser)
		return mappedUser
	})

	return user
}

export const signInGoogle = async (googleId: string) => {
	const user = await db.$transaction(async (tx) => {
		const account = await tx.account.findFirst({
			where: {
				providerAccountId: googleId,
			},
		})

		if (!account) {
			return null
		}

		const user = await tx.user.findUnique({
			where: {
				userId: account.userId,
			},
		})

		if (user && account) {
			const mappedUser = mapPrismaUser(user)
			return mappedUser
		}

		return null
	})

	return user
}
