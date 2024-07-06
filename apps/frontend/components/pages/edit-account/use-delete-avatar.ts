import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteAvatar } from '@/services/user.service'

export const useDeleteAvatar = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deleteAvatar,
		onError: () => {
			toast.error('Cannot delete avatar. Try again later.')
		},
		onSuccess: () => {
			toast.success('Success!')
			void queryClient.invalidateQueries({ queryKey: ['user'] })
			void queryClient.invalidateQueries({ queryKey: ['session'] })
		},
	})
}
