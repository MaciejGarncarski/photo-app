import { type ReactNode, Suspense } from 'react'

import { Navbar } from '@/components/navbar/navbar'

import styles from './layout.module.scss'

type Props = {
	children: ReactNode
}

export const Layout = ({ children }: Props) => {
	return (
		<div className={styles.layout}>
			<Suspense fallback={null}>
				<Navbar />
			</Suspense>
			<div className={styles.container}>{children}</div>
		</div>
	)
}
