import { fastifyOauth2, type OAuth2Namespace } from '@fastify/oauth2'
import type { FastifyInstance } from 'fastify'

import type { GoogleUser } from './auth.schema.js'
import { createGoogleUser, signInGoogle } from './auth.service.js'
import type { User } from '../user/user.schema.js'
import { retry } from '../../utils/retry.js'

declare module 'fastify' {
	interface Session {
		userId: string
	}
	interface FastifyInstance {
		googleOAuth2: OAuth2Namespace
	}
}

export const googleAuthPlugin = async (server: FastifyInstance) => {
	await server.register(fastifyOauth2, {
		name: 'googleOAuth2',
		credentials: {
			client: {
				id: process.env.GOOGLE_CLIENT_ID,
				secret: process.env.GOOGLE_CLIENT_SECRET,
			},
			auth: fastifyOauth2.GOOGLE_CONFIGURATION,
		},
		scope: ['https://www.googleapis.com/auth/userinfo.profile'],
		startRedirectPath: '/auth/google',
		callbackUri: `${process.env.BACKEND_URL}/auth/google/callback`,
	})

	server.route({
		url: '/auth/google/callback',
		method: 'GET',
		async handler(request, reply) {
			try {
				const { token } =
					await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
						request,
						reply,
					)

				const googleAPiUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.access_token}`
				const response = await fetch(googleAPiUrl, {
					method: 'GET',
				})

				const responseJSON = (await response.json()) as GoogleUser
				const user = await signInGoogle(responseJSON.id)

				if (user) {
					await request.session.regenerate()
					request.session.set('userId', user.id)

					return reply.redirect(`${process.env.APP_URL}`)
				}

				const createdUser = await retry<User>(
					() => createGoogleUser(responseJSON, token),
					{
						retries: 20,
					},
				)

				if (createdUser) {
					await request.session.regenerate()
					request.session.set('userId', createdUser.id)

					return reply.redirect(`${process.env.APP_URL}`)
				}

				return reply.redirect(`${process.env.APP_URL}/auth/sign-in`)
			} catch (error) {
				return reply.redirect(`${process.env.APP_URL}/auth/sign-in`)
			}
		},
	})
}
