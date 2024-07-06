import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'

import { authQueryOptions } from '@/hooks/use-auth'

import { NavButtons } from '@/components/navbar/navbar-buttons/navbar-buttons'
import { UserOptions } from '@/components/navbar/user-options'
import { SettingsModal } from '@/components/settings-modal/settings-modal'

import styles from './navbar.module.scss'

export const Navbar = async () => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(authQueryOptions)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<nav className={styles.navbar}>
				<h1 className={styles.heading}>
					<Link href="/">Photo App</Link>
				</h1>
				<NavButtons />
				<UserOptions />
				<SettingsModal />
			</nav>
		</HydrationBoundary>
	)
}
