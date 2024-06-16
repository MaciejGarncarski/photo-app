import { verify } from 'argon2'
import { vi } from 'vitest'

export const mockArgon2 = () => {
	vi.mock('@quixo3/prisma-session-store', async () => {
		const actual = await vi.importActual('@quixo3/prisma-session-store')
		return {
			...actual,
			PrismaSessionStore: vi.fn(),
		}
	})

	vi.mock('argon2', async () => {
		const actual = await vi.importActual('argon2')
		return {
			...actual,
			verify: vi.fn(),
		}
	})

	vi.mocked(verify).mockReturnValue(new Promise((res) => res(true)))
}
