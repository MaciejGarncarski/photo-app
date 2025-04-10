import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import Link from 'next/link'

import { authQueryOptions } from '@/hooks/use-auth'
import { getQueryClient } from '@/utils/get-query-client'

import { NavButtons } from '@/components/navbar/navbar-buttons/navbar-buttons'
import { UserOptions } from '@/components/navbar/user-options'
import { SettingsModal } from '@/components/settings-modal/settings-modal'

import styles from './navbar.module.css'

const getNavData = async () => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(authQueryOptions)

	return queryClient
}

export const Navbar = async () => {
	const queryClient = await getNavData()

	return (
		<nav className={styles.navbar}>
			<h1 className={styles.heading}>
				<Link href="/">Photo App</Link>
			</h1>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NavButtons />
				<UserOptions />
				<SettingsModal />
			</HydrationBoundary>
		</nav>
	)
}
