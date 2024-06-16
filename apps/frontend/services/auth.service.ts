import { fetcher } from '@/utils/api/api-client'

export const registerUser = fetcher
	.path('/auth/register')
	.method('post')
	.create()

export const signIn = fetcher.path('/auth/sign-in').method('post').create()
export const signOut = fetcher.path('/auth/me').method('delete').create()
export const getSessionUser = fetcher.path('/auth/me').method('get').create()
