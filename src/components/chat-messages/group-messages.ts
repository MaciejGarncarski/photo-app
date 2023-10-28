import { mapMessages } from '@/src/utils/map-messages';

import { ChatMessage, ChatMessages } from '@/src/schemas/chat.schema';

type Message = ChatMessage & {
  shouldShowTime: boolean;
};

type MessageGroup = Array<Array<Message>>;

export const groupMessagesByUser = (pages: Array<ChatMessages>) => {
  const allMessages = pages.flatMap(mapMessages);

  const isEmpty = allMessages.length === 0;

  const groupedMessages = allMessages.reduce<MessageGroup>(
    (acc, curr, idx, arr) => {
      if (!acc[0]) {
        acc.push([curr]);
        return acc;
      }

      const previousMessage = arr[idx - 1];

      if (previousMessage.shouldShowTime) {
        acc.push([curr]);
        return acc;
      }

      if (previousMessage.senderId === curr.senderId) {
        acc[acc.length - 1].push(curr);
        return acc;
      }

      acc.push([curr]);
      return acc;
    },
    [],
  );

  return { isEmpty, groupedMessages };
};
