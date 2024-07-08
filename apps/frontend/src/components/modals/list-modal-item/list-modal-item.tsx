import Link from 'next/link'
import type { ReactNode } from 'react'

import styles from './list-modal-item.module.css'

type Props = {
	icon: ReactNode
	children: ReactNode
	loadingText?: string
}

type WithButton = {
	type: 'button'
	href?: never
	onClick: () => void
	disabled?: boolean
}

type WithLink = {
	type: 'link'
	href: string
	onClick?: () => void
	disabled?: never
}

type ModalListItemConditionalProps = WithButton | WithLink

type ModalListItemProps = Props & ModalListItemConditionalProps

export const ListModalItem = ({
	type,
	icon,
	children,
	disabled,
	href,
	onClick,
}: ModalListItemProps) => {
	return (
		<li className={styles.item}>
			{type === 'button' && (
				<button
					type="button"
					onClick={onClick}
					disabled={disabled}
					className={styles.content}
				>
					{icon}
					{children}
				</button>
			)}
			{type === 'link' && (
				<Link href={href} className={styles.content} onClick={onClick}>
					{icon}
					{children}
				</Link>
			)}
		</li>
	)
}
