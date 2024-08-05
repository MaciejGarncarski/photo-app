import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'

import { getUserQueryOptions } from '@/hooks/use-user'
import { getPageTitle } from '@/utils/get-page-title'
import { getQueryClient } from '@/utils/get-query-client'

import { Chat } from '@/components/pages/chat/chat'
import { chatUsersQueryOptions } from '@/components/pages/chat/use-chat-users'

export const metadata: Metadata = {
	title: getPageTitle('Chat'),
}

const ChatPage = async () => {
	const queryClient = getQueryClient()

	const chatUsers = await queryClient.fetchInfiniteQuery(chatUsersQueryOptions)

	const usersIds = chatUsers.pages
		.flat()
		.map(({ users }) => users.map(({ userId }) => userId))
		.flat()

	await Promise.all(
		usersIds.map((userId) => {
			return queryClient.prefetchQuery(getUserQueryOptions(userId))
		}),
	)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Chat />
		</HydrationBoundary>
	)
}

export default ChatPage
