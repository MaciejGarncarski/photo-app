import { atom, useAtom } from 'jotai'

import type { FinalImages } from '@/components/pages/create-post/create-post-schema'
export type PreviewImages = Array<
	| {
			id: string
			src: string
	  }
	| undefined
>

const finalImagesAtom = atom<FinalImages>([])

export const useFinalImages = () => {
	const [finalImages, setFinalImages] = useAtom(finalImagesAtom)

	const previewImages: PreviewImages = finalImages.map((finalImg) => {
		if (finalImg?.file) {
			const img = URL.createObjectURL(finalImg?.file)
			return {
				id: finalImg?.id,
				src: img,
			}
		}
	})

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
