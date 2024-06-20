import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'

import { authQueryOptions } from '@/hooks/use-auth'
import { userQueryOptions } from '@/hooks/use-user'
import { getUserByUsernmeQueryOptions } from '@/hooks/use-user-by-username'
import { getPageTitle } from '@/utils/get-page-title'
import { getQueryClient } from '@/utils/get-query-client'

import { getAccountPostsQueryOptions } from '@/components/account-posts-list/use-account-posts'
import { Account } from '@/components/pages/account/account'
import { getPostQueryOptions } from '@/components/pages/account/use-post'
import { APP_URL } from '@/constants'
import { getUserByUsername } from '@/services/user.service'

type Props = {
	params: { username: string }
}

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const { username } = params

	const usernameTitle = getPageTitle(`@${username}`)

	try {
		const {
			data: { data: userData },
		} = await getUserByUsername({ username: username })

		if (!userData.avatar) {
			return {
				title: usernameTitle,
			}
		}

		return {
			title: usernameTitle,
			metadataBase: new URL('https://ik.imagekit.io'),
			description: userData.bio,
			openGraph: {
				title: usernameTitle,
				description: userData.bio || undefined,
				url: APP_URL,
				siteName: 'Photo App',
				locale: 'en_GB',
				type: 'profile',
				username: username,
				images: [
					{
						url: userData?.avatar,
						width: 720,
						height: 720,
					},
				],
			},
		}
	} catch (error) {
		return {
			title: usernameTitle,
		}
	}
}

export default async function AccountPage({ params }: Props) {
	const { username } = params
	const queryClient = getQueryClient()

	const prefetchSession = queryClient.prefetchQuery(authQueryOptions)
	const prefetchUser = queryClient.fetchQuery(
		getUserByUsernmeQueryOptions(username),
	)

	const [user] = await Promise.all([prefetchUser, prefetchSession])

	const posts = await queryClient.fetchInfiniteQuery(
		getAccountPostsQueryOptions(user.userId),
	)

	const postIds = posts.pages[0].data.map(({ id }) => id)
	const authorIds = posts.pages[0].data.map(({ authorId }) => authorId)

	const prefetchPostsById = postIds.map((postId) => {
		return queryClient.prefetchQuery(getPostQueryOptions(postId))
	})

	const prefetchPostAuthors = authorIds.map((authorId) => {
		return queryClient.prefetchQuery(userQueryOptions(authorId))
	})

	await Promise.all([...prefetchPostsById, ...prefetchPostAuthors])

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Account />
		</HydrationBoundary>
	)
}
