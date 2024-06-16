import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
	mockReset(db)
})

export const db = mockDeep<PrismaClient>()
