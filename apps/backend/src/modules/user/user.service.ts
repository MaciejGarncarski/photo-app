import type { SavedMultipartFile } from '@fastify/multipart'

import type { EditAccountInput, UserWithStats } from './user.schema.js'
import { db } from '../../utils/db.js'
import { getCount } from '../../utils/get-count.js'
import fs from 'node:fs'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

type Config =
	| {
			userId?: never
			username: string
	  }
	| {
			username?: never
			userId: string
	  }

export const getUser = async (config: Config, sessionUserId?: string) => {
	const userData = await db.user.findFirst({
		where: config,
		select: {
			bio: true,
			createdAt: true,
			userId: true,
			avatarUrl: true,
			name: true,
			username: true,
			toUser: true,
		},
	})

	if (!userData) {
		return null
	}

	const { bio, createdAt, avatarUrl, userId, name, username } = userData

	const counts = await getCount(userId)

	const sessionUserData = sessionUserId
		? await db.user.findFirst({
				where: {
					userId: sessionUserId,
				},
			})
		: null

	const isFollowing =
		sessionUserData &&
		sessionUserData?.userId !== userId &&
		Boolean(
			userData.toUser.find(
				(follower) => follower.from === sessionUserData.userId,
			),
		)

	const user = {
		bio,
		createdAt: createdAt.toString(),
		...counts,
		userId,
		avatar: avatarUrl,
		isFollowing: isFollowing || false,
		name,
		username: username || '',
	} satisfies UserWithStats
	return user
}

export const followUser = async (userId: string, sessionUserId: string) => {
	await db.follower.create({
		data: {
			from: sessionUserId,
			to: userId,
		},
		select: {
			createdAt: true,
			id: true,
		},
	})
}

export const unfollowUser = async (userId: string, sessionUserId: string) => {
	await db.follower.deleteMany({
		where: {
			from: sessionUserId,
			to: userId,
		},
	})
}

export const deleteAvatar = async (sessionUserId: string) => {
	await cloudinary.api.delete_folder(`${sessionUserId}/avatar/custom/`)

	return db.user.update({
		data: {
			avatarUrl: null,
		},
		where: {
			userId: sessionUserId,
		},
	})
}

export const editAccount = (
	sessionUserId: string,
	{ bio, name, username }: EditAccountInput,
) => {
	return db.user.update({
		where: {
			userId: sessionUserId,
		},
		data: {
			bio,
			name,
			username,
		},
	})
}

export const updateAvatar = async (
	sessionUserId: string,
	fileData: SavedMultipartFile,
) => {
	const imageFile = fs.readFileSync(fileData.filepath)

	const folder = `${sessionUserId}/avatar/custom/`

	const imageResponse = await new Promise<UploadApiResponse | undefined>(
		(resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						fileName: `${sessionUserId}-custom-avatar`,
						folder,
					},
					(err, result) => {
						return resolve(result)
					},
				)
				.end(imageFile)
		},
	)

	if (!imageResponse) {
		throw new Error('Image upload failed')
	}

	const created = await db.user.update({
		data: {
			avatarUrl: imageResponse.url,
		},
		where: {
			userId: sessionUserId,
		},
	})

	return created
}
