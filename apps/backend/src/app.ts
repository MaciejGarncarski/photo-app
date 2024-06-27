import { cookie } from './consts/cookie.js'
import { authorize } from './middlewares/auth.middleware.js'
import { routerPlugin } from './modules/plugins/router.plugin.js'
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
import { db } from './utils/db.js'

declare module 'fastify' {
	interface FastifyInstance {
		authorize: preHandlerHookHandler
	}
}

export const buildApp = async () => {
	const app = Fastify({
		trustProxy: true,
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

	const PrismaStore = new PrismaSessionStore(db, {
		checkPeriod: 2 * 60 * 1000,
		dbRecordIdIsSessionId: true,
	})

	await app.register(fastifyMultipart, {
		limits: {
			fileSize: 150_500_000,
		},
	})

	await app.register(cors, {
		credentials: true,
		origin: process.env.APP_URL,
	})

	await app.register(fastifyCookie)

	app.decorate('authorize', authorize)

	await app.register(fastifySession, {
		cookie: cookie,
		secret: process.env.SECRET || '',
		saveUninitialized: false,
		rolling: true,
		store: PrismaStore as SessionStore,
	})

	await app.register(routerPlugin, { prefix: '/' })

	return app
}
