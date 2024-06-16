import {
	infiniteQueryOptions,
	useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { nextPageParam } from '@/utils/api/next-page-param'

import { getChatUsers } from '@/services/chat.service'

export const chatUsersQueryOptions = infiniteQueryOptions({
	queryKey: ['chat users'],
	queryFn: async ({ pageParam = 0 }) => {
		const { data } = await getChatUsers({
			skip: pageParam.toString(),
		})

		if (!data.data) {
			throw new Error('No data')
		}

		return data.data
	},
	initialPageParam: 0,
	refetchOnWindowFocus: false,
	getNextPageParam: nextPageParam,
})

export const useChatUsers = () => {
	return useSuspenseInfiniteQuery(chatUsersQueryOptions)
}
