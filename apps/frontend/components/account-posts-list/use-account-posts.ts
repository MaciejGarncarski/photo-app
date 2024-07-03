import {
	infiniteQueryOptions,
	useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { nextPageParam } from '@/utils/api/next-page-param'

import { getUserPosts } from '@/services/posts.service'

type UseAccountPost = {
	userId: string
}

export const getAccountPostsQueryOptions = (userId: string) =>
	infiniteQueryOptions({
		queryKey: ['account posts', userId],
		queryFn: async ({ pageParam }) => {
			const { data } = await getUserPosts({
				authorId: userId,
				skip: pageParam,
			})

			if (!data) {
				throw new Error('Fetch failed')
			}

			return data
		},
		initialPageParam: 0,
		refetchOnWindowFocus: false,
		enabled: userId !== '',
		getNextPageParam: nextPageParam,
	})

export const useAccountPosts = ({ userId }: UseAccountPost) => {
	return useSuspenseInfiniteQuery(getAccountPostsQueryOptions(userId))
}
