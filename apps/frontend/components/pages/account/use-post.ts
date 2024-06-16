import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { getPost } from '@/services/posts.service'

export const getPostQueryOptions = (postId: number) =>
	queryOptions({
		queryKey: ['post', postId],
		queryFn: async () => {
			const { data: post } = await getPost(
				{ postId: postId.toString() },
				{
					next: {
						tags: [`post-${postId}`],
					},
				},
			)

			if (!post.data) {
				throw new Error('No post data.')
			}

			return post.data
		},
	})

export const usePost = ({ postId }: { postId: number }) => {
	return useSuspenseQuery(getPostQueryOptions(postId))
}
