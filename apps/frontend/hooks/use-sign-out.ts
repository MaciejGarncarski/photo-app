import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { signOut } from '@/services/auth.service'

export const useSignOut = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => {
			return signOut({})
		},
		onSuccess: () => {
			router.push('/')
			router.refresh()
			queryClient.setQueryData(['session'], () => null)
		},
	})
}
