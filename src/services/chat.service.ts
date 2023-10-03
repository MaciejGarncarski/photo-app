import { apiClient } from '@/src/utils/api-client';

import { ChatRoom } from '@/src/components/pages/chat-room/use-chat-room-data';
import {
  chatMessagesResponseSchema,
  chatUsersResponseSchema,
} from '@/src/schemas/chat';

type DeleteChatMessage = {
  messageId: string;
};

export const deleteChatMessage = ({ messageId }: DeleteChatMessage) => {
  return apiClient({ url: `chat/message/${messageId}`, method: 'DELETE' });
};

type GetChatRoomData = {
  receiverId: string;
};

export const getChatRoomData = ({
  receiverId,
}: GetChatRoomData): Promise<ChatRoom> => {
  return apiClient({ url: `chat/check-user/${receiverId}`, method: 'GET' });
};

type GetChatUsers = {
  pageParam: number;
  searchedUser: string;
};

export const getChatUsers = async ({
  pageParam = 0,
  searchedUser,
}: GetChatUsers) => {
  return await apiClient({
    url: `chat/users?skip=${pageParam}&searchedUser=${searchedUser}`,
    schema: chatUsersResponseSchema,
  });
};

type GetChatMessages = {
  pageParam: number;
  friendId?: string;
};

export const getChatMessages = async ({
  pageParam = 0,
  friendId,
}: GetChatMessages) => {
  return apiClient({
    schema: chatMessagesResponseSchema,
    url: `chat/messages/${friendId}?skip=${pageParam}`,
    method: 'GET',
  });
};
