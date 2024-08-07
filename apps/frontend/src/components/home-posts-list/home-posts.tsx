import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'

import { authQueryOptions } from '@/hooks/use-auth'
import { getUserQueryOptions } from '@/hooks/use-user'

import { HomePostsList } from '@/components/home-posts-list/home-posts-list'
import { getPostQueryOptions } from '@/components/pages/account/use-post'
import { getHomepagePostsOptions } from '@/components/pages/home/use-homepage-posts'

export async function HomePosts() {
	const queryClient = new QueryClient()

	const prefetchSession = queryClient.prefetchQuery(authQueryOptions)
	const prefetchPosts = queryClient.fetchInfiniteQuery(getHomepagePostsOptions)

	const [posts] = await Promise.all([prefetchPosts, prefetchSession])

	const postIds = posts.pages[0].data.map(({ id }) => id)
	const authorIds = posts.pages[0].data.map(({ authorId }) => authorId)

	const prefetchPostsById = postIds.map((postId) => {
		return queryClient.prefetchQuery(getPostQueryOptions(postId))
	})

	const prefetchPostAuthors = authorIds.map((authorId) => {
		return queryClient.prefetchQuery(getUserQueryOptions(authorId))
	})

	await Promise.all([...prefetchPostsById, ...prefetchPostAuthors])

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomePostsList />
		</HydrationBoundary>
	)
}
