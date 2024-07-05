import type { SavedMultipartFile } from '@fastify/multipart'
import type { FastifyRequest } from 'fastify'
import { nanoid } from 'nanoid'
import fs from 'node:fs'
import type {
	CreatePostInput,
	GetUserPostsInput,
	PostDetails,
	PostsResponse,
} from './post.schema.js'
import { db } from '../../utils/db.js'
import { imageKit } from '../../utils/imagekit.js'

const POSTS_PER_SCROLL = 3

export const getHomepagePosts = async (skip: number) => {
	const postsRequest = db.post.findMany({
		skip: skip * POSTS_PER_SCROLL,
		take: POSTS_PER_SCROLL,
		select: {
			authorId: true,
			createdAt: true,
			id: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
	const postsCountRequest = db.post.count()
	const [postsList, postsCount] = await Promise.all([
		postsRequest,
		postsCountRequest,
	])
	const maxPages = postsCount / POSTS_PER_SCROLL
	const totalPages = Math.ceil(maxPages) - 1

	const posts = postsList.map(({ authorId, createdAt, id }) => {
		return {
			id,
			createdAt: createdAt.toString(),
			authorId: authorId,
		}
	})

	const response: PostsResponse = {
		postsCount,
		totalPages,
		currentPage: skip,
		data: posts,
	}

	return response
}

export const createPost = async (
	{ description }: CreatePostInput,
	sessionUserId: string,
	images: Array<SavedMultipartFile>,
) => {
	const post = await db.$transaction(
		async (tx) => {
			const post = await tx.post.create({
				data: {
					authorId: sessionUserId,
					description,
				},
			})

			const readImages = images.map((image) => fs.readFileSync(image.filepath))

			const uploadedImagesData = await Promise.all(
				readImages.map((imageFile) => {
					return imageKit.upload({
						file: imageFile,
						fileName: `${nanoid()}.webp`,
						folder: `post-images/${post.id}/`,
					})
				}),
			)

			const postImageData = uploadedImagesData.map((imageData) => {
				return {
					fileId: imageData.fileId,
					height: imageData.height,
					name: imageData.name,
					size: imageData.size,
					thumbnailUrl: imageData.thumbnailUrl,
					url: imageData.url,
					width: imageData.width,
					postId: post.id,
				}
			})

			await tx.postImage.createMany({
				data: postImageData,
			})

			return post
		},
		{ maxWait: 20000, timeout: 30000 },
	)

	return post
}

export const deletePost = async (postId: number, request: FastifyRequest) => {
	const sessionUserId = request.session.userId

	const postData = await db.post.findFirst({
		where: {
			id: postId,
		},
		select: { images: true, authorId: true },
	})

	if (!postData) {
		return
	}
	const isAbleToDelete = postData.authorId === sessionUserId

	if (!isAbleToDelete) {
		return
	}

	await imageKit.deleteFolder(`post-images/${postId}/`)
	await db.post.deleteMany({
		where: {
			id: postId,
		},
	})

	await db.postImage.deleteMany({
		where: {
			postId: postId,
		},
	})

	return 'deleted'
}

export const getPostById = async (postId: number, request: FastifyRequest) => {
	const sessionUserId = request.session.userId

	const postFromDb = await db.post.findFirst({
		where: {
			id: postId,
		},
		include: {
			author: true,
			images: true,
			postsLikes: {
				where: sessionUserId
					? {
							userId: sessionUserId,
						}
					: {},
			},
			_count: {
				select: {
					postsLikes: true,
					postsComments: true,
				},
			},
		},
	})

	if (!postFromDb) {
		return null
	}

	const {
		_count: { postsComments: commentsCount, postsLikes: likesCount },
		authorId,
		createdAt,
		description,
		id,
		images,
		postsLikes,
	} = postFromDb

	const data: PostDetails = {
		authorId: authorId,
		commentsCount: commentsCount || 0,
		likesCount: likesCount || 0,
		createdAt: createdAt.toString(),
		description,
		images,
		id,
		isLiked: sessionUserId ? Boolean(postsLikes[0]) : false,
	}

	return data
}

export const addPostLike = async (postId: number, sessionUserId: string) => {
	const likeAlreadyExists = await db.postLike.findFirst({
		where: {
			postId: postId,
			userId: sessionUserId,
		},
	})

	if (likeAlreadyExists) {
		return
	}

	return db.postLike.create({
		data: {
			postId: postId,
			userId: sessionUserId,
		},
		select: {
			id: true,
		},
	})
}

export const deletePostLike = async (postId: number, sessionUserId: string) => {
	await db.postLike.deleteMany({
		where: {
			postId: postId,
			userId: sessionUserId,
		},
	})
}

export const editPost = async (
	postId: number,
	sessionUserId: string,
	newDescription: string,
) => {
	const postToBeEdited = await db.post.findFirst({
		where: {
			id: postId,
		},
	})

	if (postToBeEdited?.authorId !== sessionUserId) {
		return
	}

	return db.post.update({
		data: {
			description: newDescription,
		},
		where: {
			id: postId,
		},
	})
}

const USER_POSTS_PER_SCROLL = 9

export const getUserPosts = async ({ skip, authorId }: GetUserPostsInput) => {
	const postsRequest = db.post.findMany({
		skip: skip * USER_POSTS_PER_SCROLL,
		take: USER_POSTS_PER_SCROLL,

		where: {
			authorId: authorId,
		},
		select: {
			id: true,
			createdAt: true,
			authorId: true,
		},
		orderBy: {
			id: 'desc',
		},
	})

	const postsCountRequest = db.post.count({
		where: {
			authorId: authorId,
		},
	})

	const [postsCount, posts] = await Promise.all([
		postsCountRequest,
		postsRequest,
	])
	const totalPages = Math.ceil(postsCount / USER_POSTS_PER_SCROLL) - 1

	const transformedPosts = posts.map((post) => {
		return {
			...post,
			createdAt: post.createdAt.toString(),
		}
	})

	const response: PostsResponse = {
		postsCount,
		totalPages,
		currentPage: skip,
		data: transformedPosts,
	}

	return response
}
