import { z } from "zod";

export const addChatMessageSchema = z.object({
  text: z.string().trim().min(1),
});

export type AddChatMessage = z.infer<typeof addChatMessageSchema>;

export type ChatMessage = {
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  id: string;
};

export type ChatMessages = {
  messages: {
    senderId: string;
    receiverId: string;
    text: string;
    createdAt: string;
    id: string;
  }[];
  totalPages: number;
  currentPage: number;
  messagesCount: number;
};

export type ChatUsers = {
  users: Array<string>;
  totalPages: number;
  currentPage: number;
  usersCount: number;
};
