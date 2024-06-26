import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { getUserByUsername } from '@/services/user.service'

type Arguments = {
	username: string
}

export const getUserByUsernmeQueryOptions = (username: string) =>
	queryOptions({
		queryKey: ['user', username],
		queryFn: async () => {
			const { data: user } = await getUserByUsername({ username })

			if (!user.data) {
				throw new Error('No user data.')
			}

			return user.data
		},
		retry: 1,
		refetchOnWindowFocus: false,
	})

export const useUserByUsername = ({ username }: Arguments) => {
	return useSuspenseQuery(getUserByUsernmeQueryOptions(username))
}
