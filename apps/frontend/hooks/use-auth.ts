import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getSessionUser } from '@/services/auth.service'

export const authQueryOptions = queryOptions({
	queryKey: ['session'],
	queryFn: async () => {
		try {
			const { data: sessionUser } = await getSessionUser({})

			if (!sessionUser.data) {
				throw new Error('No session data')
			}

			return sessionUser.data
		} catch (error) {
			return null
		}
	},
	initialData: undefined,
	staleTime: 20 * 1000,
	retry: false,
})

export const useAuth = () => {
	const {
		data: sessionUser,
		isPending,
		isRefetching,
		isFetching,
	} = useSuspenseQuery(authQueryOptions)

	const isSignedIn = Boolean(sessionUser?.id)

	return useMemo(() => {
		return {
			sessionUser,
			isSignedIn,
			isPending,
			isRefetching,
			isFetching,
		}
	}, [isFetching, isPending, isRefetching, isSignedIn, sessionUser])
}
