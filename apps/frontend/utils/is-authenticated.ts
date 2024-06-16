import { getSessionUser } from '@/services/auth.service'

export const isAuthenticated = async () => {
	try {
		const response = await getSessionUser(
			{},
			{
				cache: 'no-cache',
			},
		)

		if (response.data.data.id) {
			return true
		}

		return false
	} catch (error) {
		return false
	}
}
