import { useState } from 'react'

import type { FinalImages } from '@/components/pages/create-post/create-post-schema'
import { usePreviewImages } from '@/components/pages/create-post/use-preview-images'

export const useFinalImages = () => {
	const [finalImages, setFinalImages] = useState<FinalImages>([])
	const { previewImages } = usePreviewImages(finalImages)

	const onRemove = (id: string) => {
		const filteredState = finalImages.filter((finalImg) => {
			return finalImg?.id !== id
		})
		setFinalImages(filteredState)
	}

	return {
		finalImages,
		setFinalImages,
		previewImages,
		onRemove,
	}
}
