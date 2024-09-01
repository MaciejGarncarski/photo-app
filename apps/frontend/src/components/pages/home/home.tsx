import { HomePosts } from '@/components/home-posts-list/home-posts'
import { NewPostNotification } from '@/components/new-post-notification/new-post-notification'

import styles from './home.module.css'

export const Home = () => {
	return (
		<div className={styles.home}>
			<NewPostNotification />
			<HomePosts />
		</div>
	)
}
