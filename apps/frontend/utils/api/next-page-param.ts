type PrevData = {
	totalPages: number
	currentPage: number
}

export const nextPageParam = (prevData: PrevData) => {
	if (prevData.totalPages < 0) {
		return
	}

	return prevData.currentPage === prevData.totalPages
		? undefined
		: prevData.currentPage + 1
}
