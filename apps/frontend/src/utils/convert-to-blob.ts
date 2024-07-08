import type { Area } from 'react-easy-crop'

const createImage = (url: string) =>
	new Promise<HTMLImageElement>((resolve) => {
		const image = new Image()
		image.addEventListener('load', () => resolve(image))
		image.src = url
	})

export const convertToBlob = async (imageSrc: string, pixelCrop: Area) => {
	const image = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	if (!ctx) {
		return null
	}

	canvas.width = image.width
	canvas.height = image.height

	ctx.translate(image.width / 2, image.height / 2)
	ctx.translate(-image.width / 2, -image.height / 2)

	ctx.drawImage(image, 0, 0)

	const data = ctx.getImageData(
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
	)

	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height

	ctx.putImageData(data, 0, 0)

	return new Promise<Blob>((resolve) => {
		canvas.toBlob(
			(file) => {
				if (file) {
					resolve(file)
				}
			},
			'image/jpeg',
			1,
		)
	})
}
