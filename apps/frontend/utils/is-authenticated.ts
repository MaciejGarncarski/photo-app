import { getSessionUser } from '@/services/auth.service'

export const isAuthenticated = async () => {
	try {
		const response = await getSessionUser(
			{},
			{
				cache: 'no-cache',
			},
		)

		if (response.status === 200) {
			return true
		}

		return false
	} catch (error) {
		return false
	}
}
