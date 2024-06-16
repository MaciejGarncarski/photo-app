'use client'

import { PlusCircle } from '@phosphor-icons/react'
import { Suspense } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

import { ButtonLink } from '@/components/buttons/button-link/button-link'
import { HomePost } from '@/components/home-post/home-post'
import { useHomepagePosts } from '@/components/pages/home/use-homepage-posts'
import { PostPlaceholder } from '@/components/post/post-placeholder/post-placeholder'

import styles from './home-posts-list.module.scss'

export const HomePostsList = () => {
	const { data, hasNextPage, fetchNextPage } = useHomepagePosts()
	const { isSignedIn } = useAuth()

	const { ref } = useInfiniteScroll({
		hasNextPage: Boolean(hasNextPage),
		fetchNextPage,
		enabled: true,
	})

	const noPosts = data?.pages[0] && data.pages[0].postsCount < 1

	if (noPosts) {
		return (
			<div className={styles.noPosts}>
				<p>No posts yet.</p>
				{isSignedIn && (
					<ButtonLink href="/create-post">
						<PlusCircle />
						Create post now
					</ButtonLink>
				)}
			</div>
		)
	}

	return (
		<div className={styles.posts}>
			{data?.pages.map((page, pageIdx) => {
				return page.data.map(({ id }, idx) => {
					return (
						<Suspense fallback={<PostPlaceholder />} key={id}>
							<HomePost
								priority={idx <= 1}
								postId={id}
								ref={
									pageIdx === data.pages.length - 1 &&
									idx === page.data.length - 1
										? ref
										: undefined
								}
							/>
						</Suspense>
					)
				})
			})}
		</div>
	)
}
