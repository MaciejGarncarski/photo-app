const ONE_HOUR = 1000 * 60 * 60

export const checkTimeBetweenMessages = (
	date: Date | string,
	prevDate: Date | string,
) => {
	const time = new Date(date).getTime()
	const prevTime = new Date(prevDate).getTime()

	if (prevTime - time > ONE_HOUR) {
		return true
	}

	return false
}
