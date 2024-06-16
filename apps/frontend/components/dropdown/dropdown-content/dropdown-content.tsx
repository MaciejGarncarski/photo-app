import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { type ReactNode, Ref } from 'react'

import styles from './dropdown-content.module.scss'

type Props = {
	children: ReactNode
	ref?: Ref<HTMLDivElement>
} & Dropdown.DropdownMenuContentProps

export const DropdownContent = ({ children, ref, ...otherProps }: Props) => {
	return (
		<Dropdown.Content
			asChild
			ref={ref}
			{...otherProps}
			onEscapeKeyDown={(ev) => ev.stopPropagation()}
		>
			<div className={styles.content}>
				{children}
				<Dropdown.Arrow className={styles.arrow} />
			</div>
		</Dropdown.Content>
	)
}
