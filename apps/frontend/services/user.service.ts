import { fetcher } from '@/utils/api/api-client'

export const getUser = fetcher.path('/user/{userId}').method('get').create()

export const getUserByUsername = fetcher
	.path('/user/username/{username}')
	.method('get')
	.create()

export const editAccount = fetcher.path('/user/edit').method('put').create()

export const deleteAvatar = fetcher
	.path('/user/avatar')
	.method('delete')
	.create()

export const followOtherUser = fetcher
	.path('/user/{userId}/follow')
	.method('post')
	.create()

export const unfollowOtherUser = fetcher
	.path('/user/{userId}/follow')
	.method('delete')
	.create()

export const getFollowers = fetcher
	.path('/follower-stats/followers')
	.method('get')
	.create()

export const getFriends = fetcher
	.path('/follower-stats/friends')
	.method('get')
	.create()
