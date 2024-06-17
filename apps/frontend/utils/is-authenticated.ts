/* eslint-disable no-console */
import { getSessionUser } from '@/services/auth.service'

export const isAuthenticated = async () => {
	try {
		const response = await getSessionUser(
			{},
			{
				cache: 'no-store',
			},
		)

		console.log({ response })

		if (response.status === 200) {
			return true
		}

		return false
	} catch (error) {
		console.log({ isAuthenticatedError: error })

		return false
	}
}
