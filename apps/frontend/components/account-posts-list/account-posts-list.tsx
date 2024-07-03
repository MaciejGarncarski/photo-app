import { Suspense } from 'react'

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

import { AccountPost } from '@/components/account-post/account-post'
import { useAccountPosts } from '@/components/account-posts-list/use-account-posts'
import { Loader } from '@/components/loader/loader'

import styles from './account-posts-list.module.scss'

type Props = {
	userId: string
}

export const AccountPostsList = ({ userId }: Props) => {
	const { data, hasNextPage, fetchNextPage } = useAccountPosts({
		userId,
	})

	const { ref } = useInfiniteScroll({
		hasNextPage: Boolean(hasNextPage),
		fetchNextPage,
		enabled: true,
	})

	const hasPosts = data.pages[0].postsCount !== 0

	return (
		<>
			<div className={styles.posts}>
				{!hasPosts && <p className={styles.noPosts}>No posts yet.</p>}
				{data.pages.map((page) => {
					return page.data.map(({ id }) => {
						return (
							<Suspense key={id} fallback={<p>loo</p>}>
								<AccountPost postId={id} />
							</Suspense>
						)
					})
				})}
			</div>
			{hasNextPage && hasPosts && (
				<div ref={ref} className={styles.loading}>
					<Loader color="primary" size="small" />
				</div>
			)}
		</>
	)
}
