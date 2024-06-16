import type { CookieOptions } from '@fastify/session'
import ms from 'ms'

const isProd = process.env.NODE_ENV === 'production'

export const cookie: CookieOptions = {
	httpOnly: true,
	maxAge: ms('2 days'),
	sameSite: isProd ? 'strict' : 'lax',
	secure: isProd ? true : false,
}
