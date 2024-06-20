import dynamic from 'next/dynamic'
import { type ReactNode } from 'react'

import styles from './layout.module.scss'

type Props = {
	children: ReactNode
}

const Navbar = dynamic(
	() => import('@/components/navbar/navbar').then((m) => m.Navbar),
	{
		ssr: false,
	},
)

export const Layout = ({ children }: Props) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.container}>{children}</div>
		</div>
	)
}
