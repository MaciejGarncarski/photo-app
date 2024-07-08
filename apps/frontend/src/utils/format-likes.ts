export const formatLikes = (likesNumber?: number) => {
	if (!likesNumber) {
		return
	}

	const formatter = new Intl.NumberFormat('en', {
		compactDisplay: 'short',
		notation: 'compact',
	})
	return formatter.format(likesNumber).toLowerCase()
}
