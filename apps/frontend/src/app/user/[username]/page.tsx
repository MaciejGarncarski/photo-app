import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'

import { getUserQueryOptions } from '@/hooks/use-user'
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
	const { username } = await params

	const usernameTitle = getPageTitle(`@${username}`)

	try {
		const {
			data: { data: userData },
		} = await getUserByUsername(
			{ username: username },
			{
				cache: 'no-store',
			},
		)

		if (!userData.avatar) {
			return {
				title: usernameTitle,
			}
		}

		const description = `${userData.name ? `${userData.name} - @${userData.username}` : userData.username}. Bio: ${userData.bio || 'No bio yet.'}. Followers: ${userData.followersCount}, friends: ${userData.friendsCount}, posts: ${userData.postsCount}.`

		return {
			title: usernameTitle,
			description: description,
			keywords: userData.bio
				? `${userData.username}, ` +
					userData.bio.replaceAll(',', '').split(' ').join(', ')
				: undefined,
			openGraph: {
				title: usernameTitle,
				description: description,
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

const getAccountData = async (username: string) => {
	const queryClient = getQueryClient()

	const user = await queryClient.fetchQuery(
		getUserByUsernmeQueryOptions(username),
	)

	const posts = await queryClient.fetchInfiniteQuery(
		getAccountPostsQueryOptions(user.userId),
	)

	const postIds = posts.pages[0].data.map(({ id }) => id)
	const authorIds = posts.pages[0].data.map(({ authorId }) => authorId)

	const prefetchPostsById = postIds.map((postId) => {
		return queryClient.prefetchQuery(getPostQueryOptions(postId))
	})

	const prefetchPostAuthors = authorIds.map((authorId) => {
		return queryClient.prefetchQuery(getUserQueryOptions(authorId))
	})

	await Promise.all([...prefetchPostsById, ...prefetchPostAuthors])

	return queryClient
}

export default async function AccountPage({ params }: Props) {
	const { username } = await params
	const queryClient = await getAccountData(username)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Account />
		</HydrationBoundary>
	)
}
