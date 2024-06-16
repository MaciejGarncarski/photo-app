import { getSessionUser } from '@/services/auth.service'

export const isAuthenticated = async () => {
	try {
		const response = await getSessionUser(
			{},
			{
				cache: 'no-store',
			},
		)

		if (response.status === 200) {
			// eslint-disable-next-line no-console
			console.log('AUTHENTICATED')
			return true
		}

		return false
	} catch (error) {
		return false
	}
}
