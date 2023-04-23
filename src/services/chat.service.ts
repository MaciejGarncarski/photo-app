import { apiClient } from '@/src/utils/apis/apiClient';

import { ChatRoom } from '@/src/components/pages/chatRoom/useChatRoomData';

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
