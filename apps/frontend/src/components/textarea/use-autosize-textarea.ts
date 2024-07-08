import { MutableRefObject, useEffect } from 'react'

export const useAutosizeTextArea = (
	textAreaRef: MutableRefObject<HTMLTextAreaElement | null>,
	value: string,
	maxHeight?: number,
) => {
	const MAX_SCROLL_HEIGHT = maxHeight || 150

	useEffect(() => {
		const textarea = textAreaRef.current

		if (textarea) {
			textarea.style.height = '0px'
			const scrollHeight = textarea.scrollHeight

			if (scrollHeight < MAX_SCROLL_HEIGHT) {
				textarea.style.height = scrollHeight + 'px'
			}
			if (scrollHeight >= MAX_SCROLL_HEIGHT) {
				textarea.style.height = MAX_SCROLL_HEIGHT + 'px'
			}
		}
	}, [MAX_SCROLL_HEIGHT, textAreaRef, value])
}
