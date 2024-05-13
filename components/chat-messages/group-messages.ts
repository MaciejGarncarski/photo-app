import { checkTimeBetweenMessages } from '@/utils/check-time-between-messages';

import { ChatMessage, ChatMessages } from '@/schemas/chat.schema';

type Message = ChatMessage & {
  shouldShowTime: boolean;
};

type MessageGroup = Array<Array<Message>>;

export const mapMessages = (el: ChatMessages) => {
  return el.messages.map((message, idx, arr) => {
    if (!arr[idx + 1]) {
      return {
        ...message,
        shouldShowTime: true,
      };
    }

    return {
      ...message,
      shouldShowTime: checkTimeBetweenMessages(
        arr[idx + 1].createdAt,
        message.createdAt,
      ),
    };
  });
};

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
