import ReactFocusLock from 'react-focus-lock'

import { ModalCloseButton } from '@/components/buttons/modal-close-button/modal-close-button'
import { FollowersFriendsItem } from '@/components/modals/followers-friends-modal/followers-friends-item/followers-friends-item'
import { useStatsModal } from '@/components/modals/followers-friends-modal/use-stats-modal'
import { ModalBackdrop } from '@/components/modals/modal-backdrop/modal-backdrop'

import styles from './followers-friends-modal.module.scss'

type Props = {
	userId: string
	type: 'friends' | 'followers'
	closeModal: () => void
}

export const FollowersFriendsModal = ({ closeModal, type, userId }: Props) => {
	const { isPending, data, isEmpty, ref } = useStatsModal({
		userId,
		type,
	})

	return (
		<ModalBackdrop closeModal={closeModal}>
			<div className={styles.container}>
				<ReactFocusLock autoFocus={false}>
					<div className={styles.header}>
						<h3 className={styles.heading}>{type.toUpperCase()}</h3>
						<ModalCloseButton onCloseModal={closeModal} variant="primary" />
					</div>
					{isEmpty && (
						<ul className={styles.list}>
							<li className={styles.noData}>No {type} yet.</li>
						</ul>
					)}
					{isPending ? (
						<ul className={styles.list} ref={ref}>
							{Array.from({ length: 2 }, (_, item) => item).map((el) => {
								return <li className={styles.placeholder} key={el} />
							})}
						</ul>
					) : (
						<ul className={styles.list}>
							{data?.pages.map((page) => {
								return page.users.map((userId) => {
									return <FollowersFriendsItem key={userId} userId={userId} />
								})
							})}
						</ul>
					)}
				</ReactFocusLock>
			</div>
		</ModalBackdrop>
	)
}
