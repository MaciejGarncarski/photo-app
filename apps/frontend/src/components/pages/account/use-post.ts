import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { getPost } from '@/services/posts.service'

export const getPostQueryOptions = (postId: number) =>
	queryOptions({
		queryKey: ['post', postId],
		queryFn: async () => {
			if (typeof window === 'undefined') {
				const { cookies } = await import('next/headers')
				const cookiesData = await cookies()

				const { data: post } = await getPost(
					{ postId: postId.toString() },
					{
						headers: {
							Cookie: `sessionId=${cookiesData.get('sessionId')?.value}`,
						},
					},
				)

				if (!post.data) {
					throw new Error('No post data.')
				}

				return post.data
			}

			const { data: post } = await getPost({ postId: postId.toString() })

			if (!post.data) {
				throw new Error('No post data.')
			}

			return post.data
		},
	})

export const usePost = ({ postId }: { postId: number }) => {
	return useSuspenseQuery(getPostQueryOptions(postId))
}
