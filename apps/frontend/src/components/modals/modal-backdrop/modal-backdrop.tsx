'use client'

import type { MouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import styles from './modal-backdrop.module.css'

type Props = {
	closeModal: () => void
	children: ReactNode
}

export const ModalBackdrop = ({ closeModal, children }: Props) => {
	if (!document) {
		return null
	}

	const handleOverlayClick = (mouseEv: MouseEvent) => {
		if (mouseEv.target === mouseEv.currentTarget) {
			closeModal()
		}
	}

	return createPortal(
		<div
			onClick={handleOverlayClick}
			role="dialog"
			onKeyUp={(event) => {
				if (event.key === 'Escape') {
					closeModal()
				}
			}}
			className={styles.backdrop}
		>
			{children}
		</div>,
		document.body,
	)
}
