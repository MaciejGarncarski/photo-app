import { useMutation } from '@tanstack/react-query'

import { clientEnv } from '@/utils/env'

export const useDownloadPost = () => {
	return useMutation({
		mutationFn: async ({
			postId,
			imageIndex,
		}: {
			postId: number
			imageIndex: number
		}) => {
			const response = await fetch(
				`${clientEnv.NEXT_PUBLIC_API_ROOT}/posts/${postId}/image?imageIndex=${imageIndex}`,
				{
					credentials: 'include',
				},
			)

			const blob = await response.blob()
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', `post-${postId}-image-${imageIndex}`)
			document.body.appendChild(link)
			link.click()
			link.remove()
		},
	})
}
