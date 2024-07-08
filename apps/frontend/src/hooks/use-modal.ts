import { useState } from 'react'

export const useModal = (initialOpen = false) => {
	const [isModalOpen, setIsModalOpen] = useState(initialOpen)

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	return {
		isModalOpen,
		closeModal,
		openModal,
		setIsModalOpen,
	}
}
