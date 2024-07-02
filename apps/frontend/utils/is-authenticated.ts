import { getSessionUser } from '@/services/auth.service'

export const isAuthenticated = async () => {
	try {
		const { cookies } = await import('next/headers')
		// eslint-disable-next-line no-console
		console.log(`sessionId=${cookies().get('sessionId')?.value}`)

		const response = await getSessionUser(
			{},
			{
				headers: {
					Cookie: `sessionId=${cookies().get('sessionId')?.value}`,
				},
				cache: 'no-store',
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
