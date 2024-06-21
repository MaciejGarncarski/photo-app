'use client'

import { PencilSimple, SignOut } from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { useAuth } from '@/hooks/use-auth'
import { useIsTabletOrMobile } from '@/hooks/use-is-tablet-or-mobile'
import { useModal } from '@/hooks/use-modal'
import { useSignOut } from '@/hooks/use-sign-out'
import { useUserByUsername } from '@/hooks/use-user-by-username'

import { AccountPostsList } from '@/components/account-posts-list/account-posts-list'
import { Button } from '@/components/buttons/button/button'
import { FetchErrorMessage } from '@/components/fetch-error-message/fetch-error-message'
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog'
import { ListModal } from '@/components/modals/list-modal/list-modal'
import { ListModalItem } from '@/components/modals/list-modal-item/list-modal-item'
import { AccountHeaderDesktopPlaceholder } from '@/components/pages/account/account-header-desktop-placeholder'

import styles from './account.module.scss'

type Props = {
	username?: string
}

const AccountHeaderMobile = dynamic(
	() =>
		import('@/components/pages/account/account-header-mobile').then(
			(m) => m.AccountHeaderMobile,
		),
	{ ssr: false },
)
const AccountHeaderDesktop = dynamic(
	() =>
		import('@/components/pages/account/account-header-desktop').then(
			(m) => m.AccountHeaderDesktop,
		),
	{ ssr: false, loading: AccountHeaderDesktopPlaceholder },
)

export const Account = ({ username }: Props) => {
	const { isTabletOrMobile } = useIsTabletOrMobile()
	const signOut = useSignOut()
	const pathname = usePathname()

	const { sessionUser } = useAuth()
	const settingsModal = useModal()
	const signOutModal = useModal()

	const { data: userData, isError } = useUserByUsername({
		username: username || (pathname.slice(1) as string),
	})

	const isOwner = sessionUser?.id === userData?.userId

	const accountHeaderProps = {
		userId: userData?.userId || '',
		isModalOpen: settingsModal.isModalOpen,
		openModal: settingsModal.openModal,
		isOwner,
	}

	if (isError) {
		return <FetchErrorMessage message="Cannot display this profile." />
	}

	return (
		<div className={styles.container}>
			{isTabletOrMobile ? (
				<AccountHeaderMobile {...accountHeaderProps} />
			) : (
				<AccountHeaderDesktop {...accountHeaderProps} />
			)}
			<ListModal
				isVisible={settingsModal.isModalOpen}
				closeModal={settingsModal.closeModal}
				headingText="Account"
			>
				<ListModalItem
					type="link"
					href="/edit-account"
					icon={<PencilSimple />}
					onClick={settingsModal.closeModal}
				>
					Edit account
				</ListModalItem>
				<ListModalItem
					type="button"
					onClick={signOutModal.openModal}
					icon={<SignOut />}
				>
					Sign out
				</ListModalItem>
			</ListModal>
			<ConfirmationDialog
				isVisible={signOutModal.isModalOpen}
				text="Do you want to sign out?"
				closeModal={signOutModal.closeModal}
			>
				<Button variant="primary" onClick={() => signOut.mutate()}>
					Sign out
					<SignOut />
				</Button>
				<Button variant="secondary" onClick={signOutModal.closeModal}>
					Cancel
				</Button>
			</ConfirmationDialog>
			{userData?.userId && <AccountPostsList userId={userData.userId} />}
		</div>
	)
}
