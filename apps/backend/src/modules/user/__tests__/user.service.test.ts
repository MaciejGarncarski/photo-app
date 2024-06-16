import { getUser } from '../user.service.js'
import { db } from '../../../utils/__mocks__/db.js'
import { faker } from '@faker-js/faker'
import { getCount } from '../../../utils/getCount.js'
import type { PrismaPromise } from '@prisma/client'
import { getUserMock } from '../../../utils/__mocks__/user.js'

vi.mock('../../../utils/db.js')

const postsCount = faker.number.int({ max: 50 })
const friendsCount = faker.number.int({ max: 50 })
const followersCount = faker.number.int({ max: 50 })
const userMock = getUserMock()

describe('user.service test', () => {
	beforeEach(() => {
		db.post.count.mockResolvedValue(postsCount)
		db.user.findFirst.mockResolvedValue(userMock)
		db.post.count.mockResolvedValue(postsCount)
		db.follower.count.mockImplementation((args) => {
			return new Promise((resolve) => {
				if (!args) {
					resolve(0)
				}

				if (args?.where?.to) {
					resolve(followersCount)
				}

				resolve(friendsCount)
			}) as PrismaPromise<number>
		})
	})

	describe('getCount function test', async () => {
		it('should return valid count', async () => {
			const count = await getCount(userMock.userId)

			expect(count).toStrictEqual({
				postsCount: postsCount,
				friendsCount: friendsCount,
				followersCount: followersCount,
			})
		})
	})

	describe('getUser function test', async () => {
		it('should return user if found', async () => {
			const user = await getUser({
				username: userMock.username,
			})

			expect(user).not.toBe(null)
			expect(user?.username).toBe(userMock.username)
			expect(user).toStrictEqual({
				bio: userMock.bio,
				createdAt: new Date(userMock.createdAt).toString(),
				postsCount: postsCount,
				followersCount: followersCount,
				friendsCount: friendsCount,
				userId: userMock.userId,
				avatar: userMock.avatarUrl,
				isFollowing: false,
				name: userMock.name,
				username: userMock.username,
			})
		})
	})
})
