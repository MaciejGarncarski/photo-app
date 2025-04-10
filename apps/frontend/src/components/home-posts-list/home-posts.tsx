import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { authQueryOptions } from '@/hooks/use-auth'
import { getUserQueryOptions } from '@/hooks/use-user'
import { getQueryClient } from '@/utils/get-query-client'

import { HomePostsList } from '@/components/home-posts-list/home-posts-list'
import { getHomepagePostsOptionsServerSide } from '@/components/pages/home/use-homepage-posts'

const getData = async () => {
	const queryClient = getQueryClient()

	const prefetchSession = queryClient.prefetchQuery(authQueryOptions)
	const prefetchPosts = queryClient.fetchInfiniteQuery(
		getHomepagePostsOptionsServerSide,
	)

	const [posts] = await Promise.all([prefetchPosts, prefetchSession])

	const authorIds = posts.pages[0].data.map(({ authorId }) => authorId)

	const prefetchPostAuthors = authorIds.map((authorId) => {
		return queryClient.prefetchQuery(getUserQueryOptions(authorId))
	})

	await Promise.all([...prefetchPostAuthors])

	return queryClient
}

export async function HomePosts() {
	const queryClient = await getData()

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomePostsList />
		</HydrationBoundary>
	)
}
