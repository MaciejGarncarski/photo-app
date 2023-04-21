import { z } from 'zod';

import { User, userSchema } from '@/src/schemas/user.schema';

const chatMessageSchema = z.object({
  sender: z.custom<User>(),
  receiver: z.custom<User>(),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
  createdAt: z.date(),
  id: z.string(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

const chatMessagesResponseSchema = z.object({
  messages: z.array(chatMessageSchema),
  totalPages: z.number(),
  roundedMaxPages: z.number(),
  currentPage: z.number(),
  messagesCount: z.number(),
});

export type ChatMessagesResponse = z.infer<typeof chatMessagesResponseSchema>;

const chatUsersResponseSchema = z.object({
  users: z.array(userSchema),
  totalPages: z.number(),
  currentPage: z.number(),
  usersCount: z.number(),
});

export type ChatUsersResponse = z.infer<typeof chatUsersResponseSchema>;
