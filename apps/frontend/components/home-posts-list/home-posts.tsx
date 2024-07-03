import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'

import { getUserQueryOptions } from '@/hooks/use-user'

import { HomePostsList } from '@/components/home-posts-list/home-posts-list'
import { getHomepagePostsOptions } from '@/components/pages/home/use-homepage-posts'

export async function HomePosts() {
	const queryClient = new QueryClient()

	const posts = await queryClient.fetchInfiniteQuery(getHomepagePostsOptions)
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
