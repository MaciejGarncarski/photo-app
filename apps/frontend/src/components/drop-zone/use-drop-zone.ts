import { useAtom } from 'jotai'
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

import { errorMessages } from '@/components/crop-error/crop-error.data'
import { imageSourcesAtom } from '@/components/crop-image/crop-image'
import type { DropZoneErrors } from '@/components/pages/create-post/create-post-schema'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'

export const IMAGE_MIN_SIZE = 150
export const IMAGE_MAX_FILE_SIZE = 5000000
const SUPPORTED_FILE_TYPES = ['jpeg', 'jpg', 'png', 'webp']

type Arguments = {
	setError: (error: DropZoneErrors) => void
}

export const useDropZone = ({ setError }: Arguments) => {
	const [isActive, setIsActive] = useState(false)
	const [isUploadingImage, setIsUploadingImage] = useState(false)
	const [, setImageSources] = useAtom(imageSourcesAtom)
	const { finalImages } = useFinalImages()

	const inputRef = useRef<HTMLInputElement>(null)

	const handleFilesDrop = (files: FileList) => {
		const emptySpaces = 3 - finalImages.length

		if (files.length > 3) {
			toast.info(errorMessages.TOO_MANY_IMAGES)
		}

		if (finalImages.length > 1 && emptySpaces > files.length) {
			toast.info(errorMessages.TOO_MANY_IMAGES)
		}

		const fileArray = Array.from(files).filter(
			(_, idx) => idx <= emptySpaces - 1,
		)

		fileArray.forEach((file) => {
			const reader = new FileReader()
			const fileType = file.type.split('/')

			if (file.size > IMAGE_MAX_FILE_SIZE) {
				return setError('FILE_SIZE')
			}

			if (!SUPPORTED_FILE_TYPES.includes(fileType[1])) {
				return setError('INVALID_TYPE')
			}

			reader.addEventListener('load', () => {
				const image = new Image()

				image.src = URL.createObjectURL(file)

				image.onload = () => {
					const { height, width } = image
					if (width < IMAGE_MIN_SIZE || height < IMAGE_MIN_SIZE) {
						return setError('DIMENSIONS')
					}

					const readerResult = reader.result?.toString()

					if (readerResult) {
						setImageSources((prev) => [...prev, readerResult])
					}
				}
			})

			reader.readAsDataURL(file)
		})
	}

	const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
		if (!changeEv.target.files) {
			setError('NO_IMAGE_DETECTED')
			return
		}

		if (changeEv.target.files.length > 0) {
			setIsUploadingImage(true)

			handleFilesDrop(changeEv.target.files)
			setIsUploadingImage(false)
		}
	}

	const active = (dragEv: DragEvent<HTMLDivElement>) => {
		dragEv.preventDefault()
		setIsActive(true)
	}

	const inactive = (dragEv: DragEvent<HTMLDivElement>) => {
		dragEv.preventDefault()
		setIsActive(false)
	}

	const onDrop = (dropEv: DragEvent<HTMLDivElement>) => {
		dropEv.preventDefault()

		inactive(dropEv)
		const {
			dataTransfer: { files },
		} = dropEv

		if (!files) {
			return setError('NO_IMAGE_DETECTED')
		}

		setIsUploadingImage(true)
		handleFilesDrop(files)
	}

	return {
		active,
		inactive,
		onDrop,
		isActive,
		inputRef,
		isUploadingImage,
		onChange,
	}
}
