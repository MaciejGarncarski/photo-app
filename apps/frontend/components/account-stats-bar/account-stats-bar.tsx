import { useUserStats } from '@/components/account-stats-bar/use-user-stats'
import { FollowersFriendsModal } from '@/components/modals/followers-friends-modal/followers-friends-modal'

import styles from './account-stats-bar.module.scss'

type Props = {
	userId: string
}

export const AccountStats = ({ userId }: Props) => {
	const { followersModal, friendsModal, listData } = useUserStats({ userId })

	return (
		<>
			<ul className={styles.list}>
				{listData.map(({ onClick, title, titleOne, count }) => {
					return (
						<li className={styles.listItem} key={title}>
							<button type="button" className={styles.button} onClick={onClick}>
								<span className={styles.listItemNumber}>{count}</span>
								<span className={styles.listItemText}>
									{count === 1 ? titleOne : title}
								</span>
							</button>
						</li>
					)
				})}
			</ul>
			{friendsModal.isModalOpen && (
				<FollowersFriendsModal
					type="friends"
					closeModal={friendsModal.closeModal}
					userId={userId}
				/>
			)}
			{followersModal.isModalOpen && (
				<FollowersFriendsModal
					type="followers"
					closeModal={followersModal.closeModal}
					userId={userId}
				/>
			)}
		</>
	)
}
