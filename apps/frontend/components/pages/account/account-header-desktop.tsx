import { Chat, GearSix } from '@phosphor-icons/react'

import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'

import { AccountStats } from '@/components/account-stats-bar/account-stats-bar'
import { Avatar } from '@/components/avatar/avatar'
import { Button } from '@/components/buttons/button/button'
import { ButtonLink } from '@/components/buttons/button-link/button-link'
import { FollowButton } from '@/components/buttons/follow-button/follow-button'

import styles from './account.module.scss'

type Props = {
	userId: string
	isOwner: boolean
	isModalOpen: boolean
	openModal: () => void
}

export const AccountHeaderDesktop = ({
	userId,
	isOwner,
	isModalOpen,
	openModal,
}: Props) => {
	const { isSignedIn } = useAuth()
	const { data, isPending } = useUser({ userId })

	if (isPending || !data) {
		return null
	}

	const { bio, name, username } = data

	return (
		<main className={styles.accountDesktop}>
			<div className={styles.leftCol}>
				<Avatar userId={userId} size="big" />
				{!isOwner && isSignedIn && (
					<div className={styles.accountButtons}>
						<FollowButton userId={userId} />
						<ButtonLink href={`/chat/${data.username}`}>
							<Chat weight="fill" />
						</ButtonLink>
					</div>
				)}
				{isOwner && (
					<Button type="button" variant="primary" onClick={openModal}>
						<GearSix />
						<span className={styles.menuButtonText}>Settings</span>
						<span className="visually-hidden">
							{isModalOpen ? 'Close menu' : 'Open menu'}
						</span>
					</Button>
				)}
			</div>
			<div className={styles.rightCol}>
				<h2 className={styles.username}>{username}</h2>
				<AccountStats userId={userId} />
				{name && <p className={styles.name}>{name}</p>}
				<p className={styles.bio}>{bio || 'No bio yet.'}</p>
			</div>
		</main>
	)
}
