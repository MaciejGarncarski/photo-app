/* eslint-disable no-console */
import type { preHandlerHookHandler } from 'fastify'

export const authorize: preHandlerHookHandler = function (
	this,
	request,
	reply,
	done,
) {
	console.log(request.session, request.headers.origin)

	if (!request.session.userId) {
		return reply.unauthorized('Unauthorized.')
	}

	done()
}
