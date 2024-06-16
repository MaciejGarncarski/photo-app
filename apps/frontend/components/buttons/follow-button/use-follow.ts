import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUser } from '@/hooks/use-user'

import { followOtherUser, unfollowOtherUser } from '@/services/user.service'

type FollowMutation = {
	userId: string
}

type UserWithDetails = {
	username: string
	name: string | null
	id: string
	image: string | null
	customImage: string | null
	bio: string | null
	createdAt: string
	postsCount: number
	followersCount: number
	friendsCount: number
	isFollowing: boolean
}

export const useFollowMutation = ({ userId }: FollowMutation) => {
	const queryClient = useQueryClient()
	const { data } = useUser({ userId })

	return useMutation({
		mutationFn: () => {
			if (data?.isFollowing) {
				return unfollowOtherUser({ userId })
			}

			return followOtherUser({ userId })
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['user', userId] })
			const oldUserData = queryClient.getQueryData<UserWithDetails>([
				'user',
				userId,
			])

			queryClient.setQueryData<UserWithDetails>(['user', userId], (user) => {
				if (!user) {
					return user
				}

				return {
					...user,
					isFollowing: !user.isFollowing,
					followersCount:
						(user?.followersCount ?? 0) + (user.isFollowing ? -1 : 1),
				}
			})

			return {
				oldUserData,
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['user', userId] })
			await queryClient.invalidateQueries({
				queryKey: ['user', data?.username],
			})
			await queryClient.invalidateQueries({ queryKey: ['session'] })
		},
	})
}
