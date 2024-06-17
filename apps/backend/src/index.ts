import { cookie } from './consts/cookie.js'
import { authorize } from './middlewares/auth.middleware.js'
import { routerPlugin } from './modules/plugins/router.plugin.js'
import { envVariables } from './utils/envVariables.js'
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import fastifySensible from '@fastify/sensible'
import { fastifySession, type SessionStore } from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyMultipart, { ajvFilePlugin } from '@fastify/multipart'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import Fastify, { type preHandlerHookHandler } from 'fastify'

const port = parseInt(process.env.PORT || '3001')

declare module 'fastify' {
	interface FastifyInstance {
		authorize: preHandlerHookHandler
	}
}

const start = async () => {
	const app = Fastify({
		ajv: {
			plugins: [ajvFilePlugin],
		},
	}).withTypeProvider<TypeBoxTypeProvider>()

	await app.register(fastifySwagger, {
		mode: 'dynamic',
		openapi: {
			info: {
				title: 'PhotoApp api swagger',
				description: 'testing the PhotoApp api',
				version: '0.0.0',
			},
		},
	})

	await app.register(fastifySwaggerUi, {
		routePrefix: '/documentation',
		staticCSP: true,
		uiConfig: {
			docExpansion: 'full',
		},
	})

	await app.register(fastifySensible)

	const PrismaStore = new PrismaSessionStore(new PrismaClient(), {
		checkPeriod: 2 * 60 * 1000,
		dbRecordIdIsSessionId: true,
	})

	await app.register(fastifyMultipart, {
		attachFieldsToBody: true,
		limits: {
			fileSize: 6500000,
		},
	})

	await app.register(cors, {
		credentials: true,
		origin: envVariables.APP_URL,
	})

	await app.register(fastifyCookie)

	app.decorate('authorize', authorize)

	await app.register(fastifySession, {
		secret: envVariables.SECRET,
		cookie: cookie,
		saveUninitialized: false,
		rolling: true,
		store: PrismaStore as SessionStore,
	})
	await app.register(routerPlugin, { prefix: '/' })

	try {
		app.listen({ port, host: '0.0.0.0' }, (err) => {
			if (err) {
				// eslint-disable-next-line no-console
				console.log(err)
				process.exit(1)
			}
			// eslint-disable-next-line no-console
			console.log('App running on port: ', port)
		})
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}

start()
