import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { unstable_noStore } from 'next/cache'

import { HomePostsList } from '@/components/home-posts-list/home-posts-list'
import { getHomepagePostsOptions } from '@/components/pages/home/use-homepage-posts'

export async function HomePosts() {
	unstable_noStore()
	const queryClient = new QueryClient()

	await queryClient.fetchInfiniteQuery(getHomepagePostsOptions)

	// const prefetchSession = await queryClient.prefetchQuery(authQueryOptions)

	// const [posts] = await Promise.all([prefetchHomepagePosts])

	// const postIds = posts.pages[0].data.map(({ id }) => id)
	// const authorIds = posts.pages[0].data.map(({ authorId }) => authorId)

	// const prefetchPostsById = postIds.map((postId) => {
	// 	return queryClient.prefetchQuery(getPostQueryOptions(postId))
	// })

	// const prefetchPostAuthors = authorIds.map((authorId) => {
	// 	return queryClient.prefetchQuery(userQueryOptions(authorId))
	// })

	// await Promise.all([...prefetchPostsById, ...prefetchPostAuthors])

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomePostsList />
		</HydrationBoundary>
	)
}
