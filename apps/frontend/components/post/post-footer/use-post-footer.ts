'use client'

import { useState } from 'react'

import { getDescriptionData } from '@/utils/get-description-data'

type Arguments = {
	description: string
}

export const usePostFooter = ({ description }: Arguments) => {
	const [showMore, setShowMore] = useState(false)

	const { isDescriptionLong, shortDescription } =
		getDescriptionData(description)

	const toggleShowMore = () => setShowMore((prev) => !prev)

	return { showMore, isDescriptionLong, shortDescription, toggleShowMore }
}
