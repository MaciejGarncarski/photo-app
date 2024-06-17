import type { CookieOptions } from '@fastify/session'
import ms from 'ms'
import { envVariables } from '../utils/envVariables.js'

const isProd = envVariables.STATUS === 'production'

export const cookie: CookieOptions = {
	sameSite: 'lax',
	httpOnly: true,
	maxAge: ms('7 days'),
	domain: isProd ? envVariables.COOKIE_DOMAIN : undefined,
	secure: isProd,
}
