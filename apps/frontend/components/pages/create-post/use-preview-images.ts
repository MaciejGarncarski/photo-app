import { useMemo } from 'react'

import type { FinalImages } from '@/components/pages/create-post/create-post-schema'

export type PreviewImages = Array<
	| {
			id: string
			src: string
	  }
	| undefined
>

export const usePreviewImages = (images: FinalImages) => {
	const previewImages: PreviewImages = images.map((finalImg) => {
		if (finalImg?.file) {
			const img = URL.createObjectURL(finalImg?.file)
			return {
				id: finalImg?.id,
				src: img,
			}
		}
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const memoized = useMemo(() => previewImages, [images])

	return { previewImages: memoized }
}
