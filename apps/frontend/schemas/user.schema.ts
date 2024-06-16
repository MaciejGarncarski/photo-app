import { z } from 'zod'

export const userSchema = z.object({
	username: z.string(),
	name: z.string().nullable(),
	id: z.string(),
	bio: z.string().nullable(),
	avatar: z.string().nullable(),
	createdAt: z.string(),
})

export type User = z.infer<typeof userSchema>

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim

export const fullName = z
	.string()
	.min(4, { message: 'Full name must contain at least 2 characters.' })
	.optional()

export const username = z
	.string()
	.min(4, { message: 'Minimum 4 characters.' })
	.max(9, { message: 'Maximum 9 characters allowed.' })
	.regex(usernameRegex, { message: 'Invalid username' })
	.optional()

export const bio = z
	.string()
	.max(200, { message: 'Bio contains too many characters.' })
	.optional()

export const AccountDetailsSchema = z.object({
	username,
	fullName,
	bio,
})

export type AccountDetails = z.infer<typeof AccountDetailsSchema>
