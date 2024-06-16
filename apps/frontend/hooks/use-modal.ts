import { useState } from 'react'

export const useModal = (initialState = false) => {
	const [isModalOpen, setIsModalOpen] = useState(initialState)

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
	}
}
