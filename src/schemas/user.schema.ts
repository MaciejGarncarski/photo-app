import { z } from 'zod';

export const userSchema = z.object({
  username: z.string(),
  name: z.string().nullable(),
  id: z.string(),
  image: z.string().nullable(),
  bio: z.string().nullable(),
  customImage: z.string().nullable(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userWithPreferencesSchema = userSchema.extend({
  theme: z.optional(z.enum(['DARK', 'LIGHT']).nullable()),
  notificationSound: z.optional(z.enum(['ON', 'OFF']).nullable()),
});

export type UserWithPreferences = z.infer<typeof userWithPreferencesSchema>;

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
const smallCharactersRegexp = /^[a-z0-9_\-]+$/;

export const fullName = z
  .string()
  .min(4, { message: 'Full name must contain at least 2 characters.' })
  .optional();
export const username = z
  .string()
  .min(4, { message: 'Username must contain at least 4 characters.' })
  .regex(usernameRegex, { message: 'Invalid username' })
  .regex(smallCharactersRegexp, {
    message: 'Only lowercase characters allowed.',
  })
  .max(9, { message: 'Only 9 characters allowed.' })
  .optional();

export const bio = z
  .string()
  .max(200, { message: 'Bio contains too many characters.' })
  .optional();

export const AccountDetailsSchema = z.object({
  username,
  fullName,
  bio,
});

export type AccountDetails = z.infer<typeof AccountDetailsSchema>;
