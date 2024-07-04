import { X } from '@phosphor-icons/react'
import clsx from 'clsx'

import styles from './modal-close-button.module.scss'

type Props = {
	onCloseModal: () => void
	variant: 'primary' | 'secondary'
}

export const ModalCloseButton = ({ onCloseModal, variant }: Props) => {
	const handleClose = () => {
		onCloseModal()
	}

	return (
		<button
			data-cy="modal close"
			className={clsx(styles[variant], styles.closeButton)}
			type="button"
			onClick={handleClose}
		>
			<X />
			<span className="visually-hidden">close modal</span>
		</button>
	)
}
