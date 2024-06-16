import type { preHandlerHookHandler } from 'fastify'

export const authorize: preHandlerHookHandler = function (
	this,
	request,
	reply,
	done,
) {
	if (!request.session.userId) {
		return reply.unauthorized('Unauthorized.')
	}

	done()
}
