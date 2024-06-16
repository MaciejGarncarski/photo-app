import { type User as PrismaUser } from '@prisma/client'

import { type User } from '../modules/user/user.schema.js'

type PrismaUserWithAvatar = PrismaUser

export const mapPrismaUser = (user: PrismaUserWithAvatar) => {
	const mappedUser = {
		bio: user.bio,
		createdAt: user.createdAt.toString(),
		id: user.userId,
		avatar: user.avatarUrl || null,
		name: user.name,
		username: user.username || '',
	} satisfies User

	return mappedUser
}
