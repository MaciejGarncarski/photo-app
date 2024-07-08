import { useAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import type { Area } from 'react-easy-crop'

import { convertToBlob } from '@/utils/convert-to-blob'

import { imageSourcesAtom } from '@/components/crop-image/crop-image'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'

export const useCropImage = () => {
	const [aspect, setAspect] = useState(1)
	const [zoom, setZoom] = useState(1)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const { finalImages, setFinalImages } = useFinalImages()
	const [imageSources, setImageSources] = useAtom(imageSourcesAtom)
	const [isCropping, setIsCropping] = useState(false)

	const [cropAreaPixels, setCropAreaPixels] = useState<Area>({
		x: 0,
		y: 0,
		height: 0,
		width: 0,
	})

	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCropAreaPixels(croppedAreaPixels)
	}, [])

	const saveCrop = useCallback(async () => {
		setIsCropping(true)

		const lastImage = imageSources[imageSources.length - 1]

		if (cropAreaPixels && lastImage) {
			const blob = await convertToBlob(lastImage, cropAreaPixels)
			const imageId = nanoid()

			if (!blob) {
				return
			}

			setImageSources((prev) => {
				return prev.filter((src) => src !== lastImage)
			})

			setFinalImages([
				...finalImages,
				{
					file: blob,
					id: imageId,
				},
			])

			setIsCropping(false)
		}
	}, [
		cropAreaPixels,
		finalImages,
		imageSources,
		setFinalImages,
		setImageSources,
	])

	return {
		aspect,
		setAspect,
		zoom,
		setZoom,
		crop,
		setCrop,
		onCropComplete,
		isCropping,
		saveCrop,
	}
}
