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

export const userWithPreferencesSchema = userSchema.extend({
  theme: z.optional(z.enum(['DARK', 'LIGHT']).nullable()),
  notificationSound: z.optional(z.enum(['ON', 'OFF']).nullable()),
});

export type UserWithPreferences = z.infer<typeof userWithPreferencesSchema>;
