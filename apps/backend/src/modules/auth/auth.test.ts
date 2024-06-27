import { mockArgon2 } from '../../../__mocks__/argon2.js'
import { buildApp } from '../../app.js'
import { db } from '../../utils/__mocks__/db.js'
import { getUserMock } from '../../utils/__mocks__/user.js'

vi.mock('../../utils/db.js')
mockArgon2()

describe('requests the "/auth/sign-in" route', async () => {
	const app = await buildApp()
	const mockedUser = getUserMock()

	it('should return bad request if no request body given', async () => {
		const response = await app.inject({ url: '/auth/sign-in', method: 'POST' })
		expect(response.statusCode).toBe(400)
		expect(response.body).toContain('Bad Request')
	})

	it('should return session cookie on successful login', async () => {
		db.user.findFirst.mockResolvedValue(mockedUser)

		const response = await app.inject({
			url: '/auth/sign-in',
			method: 'POST',
			body: { email: mockedUser.email, password: '123' },
		})

		expect(response.body).toContain(`"username":"${mockedUser.username}"`)
		expect(response.statusCode).toBe(200)
		expect(response.headers['set-cookie']).toContain('sessionId=')
	})

	afterAll(async () => {
		await app.close()
	})
})
