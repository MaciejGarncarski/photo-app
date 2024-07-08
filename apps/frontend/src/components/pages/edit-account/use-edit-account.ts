import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editAccount } from '@/services/user.service'

export const useEditAccount = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: editAccount,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})
}
