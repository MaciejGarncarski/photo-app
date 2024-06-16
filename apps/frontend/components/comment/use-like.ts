import { useMutation, useQueryClient } from '@tanstack/react-query'

import { likeComment, unlikeComment } from '@/services/comment.service'

export const useCommentLike = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			commentId,
			isLiked,
		}: {
			commentId: string
			isLiked: boolean
		}) => {
			if (isLiked) {
				return unlikeComment({ commentId })
			}

			return likeComment({ commentId })
		},

		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['infinite comments'] })
		},
	})
}
