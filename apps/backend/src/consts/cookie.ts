import type { CookieOptions } from '@fastify/session'
import ms from 'ms'

const isProd = process.env.COOKIE_DOMAIN === 'production'

export const cookie: CookieOptions = {
	sameSite: 'lax',
	httpOnly: true,
	maxAge: ms('7 days'),
	domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
	secure: isProd,
}
