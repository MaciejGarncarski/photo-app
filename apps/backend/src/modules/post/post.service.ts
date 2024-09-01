import type { SavedMultipartFile } from '@fastify/multipart'
import type { FastifyRequest } from 'fastify'
import fs from 'node:fs'
import type {
	CreatePostInput,
	GetUserPostsInput,
	PostDetails,
	PostsResponse,
} from './post.schema.js'
import { db } from '../../utils/db.js'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { nanoid } from 'nanoid'

const POSTS_PER_SCROLL = 3

export const getHomepagePosts = async (skip: number, userId: string | null) => {
	const postsRequest = db.post.findMany({
		skip: skip * POSTS_PER_SCROLL,
		take: POSTS_PER_SCROLL,
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			author: true,
			images: true,
			postsLikes: {
				where: userId
					? {
							userId: userId,
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

	const postsCountRequest = db.post.count()
	const [postsList, postsCount] = await Promise.all([
		postsRequest,
		postsCountRequest,
	])

	const maxPages = postsCount / POSTS_PER_SCROLL
	const totalPages = Math.ceil(maxPages) - 1

	const posts = postsList.map(
		({
			authorId,
			createdAt,
			id,
			description,
			images,
			postsLikes,
			_count,
		}): PostDetails => {
			return {
				authorId: authorId,
				commentsCount: _count.postsComments || 0,
				likesCount: _count.postsLikes || 0,
				createdAt: createdAt.toString(),
				description,
				images,
				id,
				isLiked: userId ? Boolean(postsLikes[0]) : false,
			}
		},
	)

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
				readImages.map(async (imageFile) => {
					const imageResponse = await new Promise<
						UploadApiResponse | undefined
					>((resolve) => {
						cloudinary.uploader
							.upload_stream(
								{
									fileName: `${nanoid()}.webp`,
									folder: `post-images/${post.id}/`,
								},
								(error, uploadResult) => {
									return resolve(uploadResult)
								},
							)
							.end(imageFile)
					})

					if (!imageResponse) {
						throw new Error('Image upload failed')
					}

					return imageResponse
				}),
			)

			const postImageData = uploadedImagesData.map(
				({ height, original_filename, width, url, public_id, bytes }) => {
					return {
						fileId: public_id,
						height: height,
						name: original_filename,
						size: bytes,
						url: url,
						width: width,
						postId: post.id,
					}
				},
			)

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

	await cloudinary.api.delete_folder(`post-images/${postId}/`)
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
		skip: skip * POSTS_PER_SCROLL,
		take: POSTS_PER_SCROLL,
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			author: true,
			images: true,
			postsLikes: {
				where: authorId
					? {
							userId: authorId,
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

	const transformedPosts = posts.map(
		({
			authorId,
			createdAt,
			id,
			description,
			images,
			postsLikes,
			_count,
		}): PostDetails => {
			return {
				authorId: authorId,
				commentsCount: _count.postsComments || 0,
				likesCount: _count.postsLikes || 0,
				createdAt: createdAt.toString(),
				description,
				images,
				id,
				isLiked: authorId ? Boolean(postsLikes[0]) : false,
			}
		},
	)

	const response: PostsResponse = {
		postsCount,
		totalPages,
		currentPage: skip,
		data: transformedPosts,
	}

	return response
}
