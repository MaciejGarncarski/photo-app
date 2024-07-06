import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getSessionUser } from '@/services/auth.service'

export const authQueryOptions = queryOptions({
	queryKey: ['session'],
	queryFn: async () => {
		try {
			if (typeof window === 'undefined') {
				const { cookies } = await import('next/headers')
				const { data: sessionUser } = await getSessionUser(
					{},
					{
						headers: {
							Cookie: `sessionId=${cookies().get('sessionId')?.value}`,
						},
						cache: 'no-store',
					},
				)

				if (!sessionUser.data) {
					throw new Error('No session data')
				}

				return sessionUser.data
			}

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
