import type { MultipartFile, MultipartValue } from '@fastify/multipart'
import type { FastifyReply, FastifyRequest } from 'fastify'

import type {
	DeletePostInput,
	EditPostInput,
	EditPostParams,
	GetHomepagePostsInput,
	GetUserPostsParamsInput,
	GetUserPostsQueryInput,
	PostByIdInput,
	PostLikeInputSchema,
} from './post.schema.js'
import {
	addPostLike,
	createPost,
	deletePost,
	deletePostLike,
	editPost,
	getHomepagePosts,
	getPostById,
	getUserPosts,
} from './post.service.js'

export const getHomepagePostsHandler = async (
	request: FastifyRequest<{ Querystring: GetHomepagePostsInput }>,
) => {
	const response = await getHomepagePosts(parseInt(request.query.skip))
	return response
}

export const getUserPostsHandler = async (
	request: FastifyRequest<{
		Querystring: GetUserPostsQueryInput
		Params: GetUserPostsParamsInput
	}>,
	reply: FastifyReply,
) => {
	const {
		query: { skip },
		params: { authorId },
	} = request

	const response = await getUserPosts({ authorId, skip })

	if (!response) {
		return reply.notFound()
	}

	return response
}

type RequestBody = {
	images: Array<MultipartFile> | MultipartFile
	description: { value: string }
}

export const createPostHandler = async (
	request: FastifyRequest<{ Body: RequestBody }>,
	reply: FastifyReply,
) => {
	const images = await request.saveRequestFiles()
	const descriptionField = images[0]?.fields
		.description as MultipartValue<string>
	const description = descriptionField.value

	const { userId } = request.session

	if (!images) {
		return reply.badRequest('No image provided')
	}

	const imagesArray = Array.isArray(images) ? images : [images]

	const data = await createPost(
		{ description: description },
		userId,
		imagesArray,
	)
	request.server.io.emit('new post')

	return reply.status(201).send({ data })
}

export const deletePostHandler = async (
	request: FastifyRequest<{ Params: DeletePostInput }>,
	reply: FastifyReply,
) => {
	const response = await deletePost(parseInt(request.params.postId), request)

	if (response === 'deleted') {
		return reply.status(204).send()
	}

	return reply.badRequest('Cannot delete post')
}

export const getPostByIdHandler = async (
	request: FastifyRequest<{ Params: PostByIdInput }>,
	reply: FastifyReply,
) => {
	const data = await getPostById(parseInt(request.params.postId), request)

	if (!data) {
		return reply.notFound('Post not found.')
	}

	return { data }
}

export const addPostLikeHandler = async (
	request: FastifyRequest<{ Params: PostLikeInputSchema }>,
	reply: FastifyReply,
) => {
	const { userId } = request.session

	const postLike = await addPostLike(parseInt(request.params.postId), userId)
	return reply.status(201).send({ data: postLike })
}

export const deletePostLikeHandler = async (
	request: FastifyRequest<{ Params: PostLikeInputSchema }>,
	reply: FastifyReply,
) => {
	const { userId } = request.session

	await deletePostLike(parseInt(request.params.postId), userId)
	return reply.status(204).send()
}

export const editPostHandler = async (
	request: FastifyRequest<{ Params: EditPostParams; Body: EditPostInput }>,
) => {
	const { postId } = request.params
	const { description } = request.body
	const { userId } = request.session

	const data = await editPost(parseInt(postId), userId, description)
	return { data }
}
