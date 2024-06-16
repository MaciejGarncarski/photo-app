import { describe, expect, it } from 'vitest'
import { app } from '../../../vitest.setup.js'

describe('requests the "/auth/sign-in" route', () => {
	it('should return bad request if no request body given', async () => {
		const response = await app.inject({ url: '/auth/sign-in', method: 'POST' })
		expect(response.statusCode).toBe(400)
		expect(response.body).toContain('Bad Request')
	})

	it('should return session cookie on successful login', async () => {
		const response = await app.inject({
			url: '/auth/sign-in',
			method: 'POST',
			body: { email: 'email@email.com', password: '123' },
		})

		expect(response.body).toContain('"username":"tes1t"')
		expect(response.statusCode).toBe(200)
		// expect(response.headers['set-cookie']).toContain('sessionId=');
	})
})
