import { useState } from 'react'

export const useCarousel = () => {
	const [currentImage, setCurrentImage] = useState(0)

	const handlePrevImage = () => {
		setCurrentImage((prev) => {
			if (prev >= 0) {
				return prev - 1
			}

			return prev
		})
	}

	const handleNextImage = () => {
		setCurrentImage((prev) => {
			if (prev <= 2) {
				return prev + 1
			}

			return prev
		})
	}

	return { currentImage, handlePrevImage, handleNextImage }
}
