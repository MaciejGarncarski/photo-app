import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { HomePosts } from '@/components/home-posts-list/home-posts'
import { PostPlaceholder } from '@/components/post/post-placeholder/post-placeholder'

import styles from './home.module.scss'

const NewPostNotification = dynamic(() =>
	import('@/components/new-post-notification/new-post-notification').then(
		(m) => m.NewPostNotification,
	),
)

export const Home = () => {
	return (
		<div className={styles.home}>
			<Suspense fallback={null}>
				<NewPostNotification />
			</Suspense>
			<Suspense fallback={<PostPlaceholder />}>
				<HomePosts />
			</Suspense>
		</div>
	)
}
