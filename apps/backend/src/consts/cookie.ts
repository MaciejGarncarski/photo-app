import type { CookieOptions } from '@fastify/session'
import ms from 'ms'
import { envVariables } from '../utils/envVariables.js'

const isProd = envVariables.STATUS === 'production'

// eslint-disable-next-line no-console
console.log({
	httpOnly: true,
	maxAge: ms('2 days'),
	sameSite: isProd ? 'lax' : 'lax',
	secure: isProd ? true : false,
})

export const cookie: CookieOptions = {
	sameSite: 'lax',
	httpOnly: true,
	maxAge: ms('7 days'),
	domain: envVariables.COOKIE_DOMAIN,
	secure: isProd,
}
