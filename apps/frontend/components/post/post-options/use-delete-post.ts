import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/hooks/use-auth'

import { revalidateHomePage } from '@/components/pages/create-post/action'
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/use-homepage-posts'
import { deletePost } from '@/services/posts.service'

export const useDeletePost = () => {
	const queryClient = useQueryClient()
	const { sessionUser } = useAuth()

	return useMutation({
		mutationFn: deletePost,
		onSuccess: async () => {
			await revalidateHomePage()
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['account posts', sessionUser?.id],
			})
			await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY })
		},
	})
}
