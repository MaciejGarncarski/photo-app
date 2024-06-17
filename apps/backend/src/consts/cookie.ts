import type { CookieOptions } from '@fastify/session'
import ms from 'ms'
import { envVariables } from '../utils/envVariables.js'

const isProd = envVariables.STATUS === 'production'

export const cookie: CookieOptions = {
	httpOnly: true,
	maxAge: ms('2 days'),
	sameSite: isProd ? 'strict' : 'lax',
	secure: isProd ? true : false,
}
