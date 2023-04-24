import { apiClient } from '@/src/utils/apis/apiClient';

import { ChatRoom } from '@/src/components/pages/chatRoom/useChatRoomData';
import { ChatMessagesResponse } from '@/src/schemas/chat';

type DeleteChatMessage = {
  messageId: string;
};

export const deleteChatMessage = ({ messageId }: DeleteChatMessage) => {
  return apiClient.delete(`chat/${messageId}`);
};

type GetChatRoomData = {
  receiverId: string;
};

export const getChatRoomData = async ({ receiverId }: GetChatRoomData) => {
  const { data } = await apiClient.get<ChatRoom>(`chat/${receiverId}/check`);
  return data;
};

type GetChatMessages = {
  pageParam: number;
  friendId?: string;
};

export const getChatMessages = async ({ pageParam = 0, friendId }: GetChatMessages) => {
  const { data } = await apiClient.get<ChatMessagesResponse>(`chat/${friendId}/chatMessages?skip=${pageParam}`);
  return data;
};
