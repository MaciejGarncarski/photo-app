import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { authQueryOptions } from '@/hooks/use-auth'
import { getUserQueryOptions } from '@/hooks/use-user'
import { getPageTitle } from '@/utils/get-page-title'
import { getQueryClient } from '@/utils/get-query-client'
import { isAuthenticated } from '@/utils/is-authenticated'

import { Chat } from '@/components/pages/chat/chat'
import { chatUsersQueryOptions } from '@/components/pages/chat/use-chat-users'

export const metadata: Metadata = {
	title: getPageTitle('Chat'),
}

const ChatPage = async () => {
	unstable_noStore()

	if (!(await isAuthenticated())) {
		redirect('/access-denied')
	}

	const queryClient = getQueryClient()

	const prefetchChatUsers = queryClient.fetchInfiniteQuery(
		chatUsersQueryOptions,
	)
	const prefetchSession = queryClient.prefetchQuery(authQueryOptions)

	const [chatUsers] = await Promise.all([prefetchChatUsers, prefetchSession])

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
