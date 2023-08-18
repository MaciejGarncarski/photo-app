import { apiClient } from '@/src/utils/api-client';

import { ChatRoom } from '@/src/components/pages/chat-room/use-chat-room-data';
import { chatMessagesResponseSchema } from '@/src/schemas/chat';

type DeleteChatMessage = {
  messageId: string;
};

export const deleteChatMessage = ({ messageId }: DeleteChatMessage) => {
  return apiClient({ url: `chat/${messageId}`, method: 'DELETE' });
};

type GetChatRoomData = {
  receiverId: string;
};

export const getChatRoomData = ({
  receiverId,
}: GetChatRoomData): Promise<ChatRoom> => {
  return apiClient({ url: `chat/${receiverId}/check`, method: 'GET' });
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
    url: `chat/${friendId}/chatMessages?skip=${pageParam}`,
    method: 'GET',
  });
};
