import { Suspense } from 'react'

import { HomePosts } from '@/components/home-posts-list/home-posts'
import { NewPostNotification } from '@/components/new-post-notification/new-post-notification'
import { PostPlaceholder } from '@/components/post/post-placeholder/post-placeholder'

import styles from './home.module.scss'

export const Home = () => {
	return (
		<div className={styles.home}>
			<NewPostNotification />
			<Suspense
				fallback={
					<div>
						<PostPlaceholder />
					</div>
				}
			>
				<HomePosts />
			</Suspense>
		</div>
	)
}
