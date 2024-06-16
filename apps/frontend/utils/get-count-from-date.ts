const ONE_MINUTE = 1000 * 60

export const MONTH = 30
export const WEEK = 7
export const DAY = 24
export const HOUR = 60

export const getCountFromDate = (date: Date) => {
	const currentTime = new Date().getTime()
	const oldTime = date.getTime()
	const secondsCount = Math.round((currentTime - oldTime) / 1000)
	const minutesCount = Math.round((currentTime - oldTime) / ONE_MINUTE)
	const hoursCount = Math.round(minutesCount / HOUR)

	return { hoursCount, minutesCount, secondsCount }
}
