/* eslint-disable no-console */
import type { preHandlerHookHandler } from 'fastify'

export const authorize: preHandlerHookHandler = function (
	this,
	request,
	reply,
	done,
) {
	console.log(`USERID: ${request.session.userId}`)
	console.log('COOKIES', request.cookies)

	if (!request.session.userId) {
		return reply.unauthorized('Unauthorized.')
	}

	done()
}
