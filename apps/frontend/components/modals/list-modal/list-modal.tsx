'use client'

import { type ReactNode, Ref } from 'react'
import ReactFocusLock from 'react-focus-lock'

import { ModalCloseButton } from '@/components/buttons/modal-close-button/modal-close-button'
import { ModalBackdrop } from '@/components/modals/modal-backdrop/modal-backdrop'

import styles from './list-modal.module.scss'

type Props = {
	closeModal: () => void
	headingText: string
	children: ReactNode
	isVisible: boolean
	ref?: Ref<HTMLDivElement>
}

export const ListModal = ({
	closeModal,
	headingText,
	children,
	isVisible,
	ref,
}: Props) => {
	return (
		<>
			{isVisible && (
				<ModalBackdrop closeModal={closeModal}>
					<div role="dialog" ref={ref} className={styles.container}>
						<ReactFocusLock className={styles.focusLock}>
							<div className={styles.header}>
								<h3 className={styles.heading}>{headingText}</h3>
								<ModalCloseButton onCloseModal={closeModal} variant="primary" />
							</div>
							<ul className={styles.list}>{children}</ul>
						</ReactFocusLock>
					</div>
				</ModalBackdrop>
			)}
		</>
	)
}
