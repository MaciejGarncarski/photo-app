import { HomePostsList } from '@/components/home-posts-list/home-posts-list'
import { NewPostNotification } from '@/components/new-post-notification/new-post-notification'

import styles from './home.module.scss'

export const Home = () => {
	return (
		<div className={styles.home}>
			<NewPostNotification />
			<HomePostsList />
		</div>
	)
}
