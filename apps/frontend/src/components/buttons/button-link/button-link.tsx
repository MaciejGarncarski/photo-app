import { IconContext } from '@phosphor-icons/react'
import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'

import styles from './button-link.module.css'

type Props = {
	href: string
	children: ReactNode
}

export const ButtonLink = ({ children, href }: Props) => {
	return (
		<IconContext.Provider
			value={{
				weight: 'bold',
				size: 20,
			}}
		>
			<Link href={href} className={clsx(styles.button, 'button')}>
				{children}
			</Link>
		</IconContext.Provider>
	)
}
