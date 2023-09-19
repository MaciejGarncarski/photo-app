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

export const userApiResponseSchema = userSchema.extend({
  postsCount: z.number(),
  followersCount: z.number(),
  friendsCount: z.number(),
  isFollowing: z.boolean(),
});

export type UserApiResponse = z.infer<typeof userApiResponseSchema>;

export const userWithPreferencesSchema = userSchema.extend({
  theme: z.optional(z.enum(['DARK', 'LIGHT']).nullable()),
  notificationSound: z.optional(z.enum(['ON', 'OFF']).nullable()),
});

export type UserWithPreferences = z.infer<typeof userWithPreferencesSchema>;
