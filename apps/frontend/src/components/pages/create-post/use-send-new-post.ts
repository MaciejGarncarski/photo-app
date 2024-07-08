import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hooks/use-auth'
import { apiClient } from '@/utils/api/api-client'

import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/use-homepage-posts'
import type { CreatePostInput } from '@/schemas/post.schema'

const uplaodPost = ({ description, images }: CreatePostInput) => {
	const formData = new FormData()

	formData.append('description', description)

	for (const image of images) {
		if (image) {
			formData.append('images', image)
		}
	}

	return apiClient({
		method: 'POST',
		body: formData,
		url: '/posts',
	})
}

export const useSendNewPost = () => {
	const queryClient = useQueryClient()
	const { sessionUser } = useAuth()

	return useMutation({
		mutationFn: async ({ description, images }: CreatePostInput) => {
			if (!sessionUser?.id) {
				throw new Error()
			}

			return uplaodPost({ description, images })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY })
		},
	})
}
