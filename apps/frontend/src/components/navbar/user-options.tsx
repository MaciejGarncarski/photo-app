'use client'

import { useAuth } from '@/hooks/use-auth'

import { Avatar } from '@/components/avatar/avatar'

import styles from './navbar.module.css'

export const UserOptions = () => {
	const { sessionUser } = useAuth()

	if (!sessionUser) {
		return null
	}

	return (
		<div className={styles.signedInInfo}>
			<div className={styles.info}>
				<Avatar userId={sessionUser.id} size="small" />
				{sessionUser.name && (
					<p className={styles.nameContainer}>
						<span className={styles.name}>{sessionUser.name}</span>
						<span className={styles.username}>@{sessionUser.username}</span>
					</p>
				)}
				{!sessionUser.name && (
					<p className={styles.onlyUsername}>@{sessionUser.username}</p>
				)}
			</div>
		</div>
	)
}
