import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'

import { authQueryOptions } from '@/hooks/use-auth'
import { getUserQueryOptions } from '@/hooks/use-user'

import { HomePostsList } from '@/components/home-posts-list/home-posts-list'
import { getHomepagePostsOptionsServerSide } from '@/components/pages/home/use-homepage-posts'

export async function HomePosts() {
	const queryClient = new QueryClient()

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

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomePostsList />
		</HydrationBoundary>
	)
}
