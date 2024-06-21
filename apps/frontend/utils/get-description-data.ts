const LONG_DESCRIPTION = 40

export const getDescriptionData = (description: string) => {
	const descriptionWithNewLine = description.replace(/\r?\n/g, '<br />')
	const isDescriptionLong = description.length > LONG_DESCRIPTION
	const croppedDescription = `${description.slice(0, LONG_DESCRIPTION)}...`
	const shortDescription = croppedDescription.trimEnd()

	return {
		descriptionWithNewLine,
		isDescriptionLong,
		shortDescription,
	}
}
