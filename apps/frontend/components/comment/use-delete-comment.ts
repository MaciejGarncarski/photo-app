import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteComment } from '@/services/comment.service'

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deleteComment,
		onError: () => toast.error('Error, try again later.'),
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['infinite comments'] })
		},
	})
}
