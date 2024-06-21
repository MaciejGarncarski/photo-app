import { TypeBoxError } from '@fastify/type-provider-typebox'
import { Prisma } from '@prisma/client'
import { type FastifyPluginAsync } from 'fastify'
import fastifySocketIO from 'fastify-socket.io'

import { authRoutesPlugin } from '../auth/auth.route.js'
import { googleAuthPlugin } from '../auth/googleAuth.plugin.js'
import { chatPlugin } from '../chat/chat.plugin.js'
import { chatRoutesPlugin } from '../chat/chat.route.js'
import { followerStatsRoutesPlugin } from '../follower-stats/follower-stats.route.js'
import { postRoutesPlugin } from '../post/post.route.js'
import { userRoutesPlugin } from '../user/user.route.js'

export const routerPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.route({
		method: 'GET',
		url: '/ping',
		handler: (_, rep) => {
			rep.code(200).send('pong')
		},
	})
	fastify.register(fastifySocketIO.default)
	fastify.register(authRoutesPlugin)
	fastify.register(followerStatsRoutesPlugin)
	fastify.register(postRoutesPlugin)
	fastify.register(userRoutesPlugin)
	fastify.register(chatRoutesPlugin)
	fastify.register(googleAuthPlugin)
	fastify.register(chatPlugin)

	const originalErrorHandler = fastify.errorHandler

	fastify.setErrorHandler((error, req, rep) => {
		// eslint-disable-next-line no-console
		console.log({ fastifyErr: error })

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return rep.internalServerError(
				`Something went wrong with Prisma. Error code: ${error.code}`,
			)
		}

		if (error instanceof TypeBoxError) {
			return rep.internalServerError(
				`Something went wrong with parsing. Error code: ${error.code}`,
			)
		}

		return originalErrorHandler(error, req, rep)
	})
}
