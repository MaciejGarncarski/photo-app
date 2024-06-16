import type { FastifyRequest } from 'fastify'

import type { FollowersInput } from './follower-stats.schema.js'
import { getFollowersStats, getFriendsStats } from './follower-stats.service.js'

export const getFollowersStatsHandler = async (
	request: FastifyRequest<{ Querystring: FollowersInput }>,
) => {
	const { skip, userId } = request.query
	const sessionUserId = request.session.userId

	const data = await getFollowersStats(userId, parseInt(skip), sessionUserId)

	return { data }
}

export const getFriendsStatsHandler = async (
	request: FastifyRequest<{ Querystring: FollowersInput }>,
) => {
	const { skip, userId } = request.query
	const sessionUserId = request.session.userId

	const data = await getFriendsStats(userId, parseInt(skip), sessionUserId)
	return { data }
}
