import { faker } from '@faker-js/faker'
import { getUserMock } from '../__mocks__/user.js'
import { getCount } from '../get-count.js'
import { db } from '../__mocks__/db.js'
import type { PrismaPromise } from '@prisma/client'

vi.mock('../db.js')

const postsCount = faker.number.int({ max: 50 })
const friendsCount = faker.number.int({ max: 50 })
const followersCount = faker.number.int({ max: 50 })

const userMock = getUserMock()

describe('getCount function test', async () => {
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

	it('should return valid count', async () => {
		const count = await getCount(userMock.userId)

		expect(count).toStrictEqual({
			postsCount: postsCount,
			friendsCount: friendsCount,
			followersCount: followersCount,
		})
	})
})
