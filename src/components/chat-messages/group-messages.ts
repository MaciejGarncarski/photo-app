import { checkTimeBetweenMessages } from '@/src/utils/check-time-between-messages';

import { ChatMessage } from '@/src/schemas/chat';

type Message = ChatMessage & {
  shouldShowTime: boolean;
};

type MessageGroup = Array<Array<Message>>;

export const groupMessagesByUser = (messages: Array<ChatMessage>) => {
  const groupedMessages = messages.reduce<MessageGroup>((acc, curr, idx) => {
    if (!acc[0]) {
      acc.push([{ ...curr, shouldShowTime: true }]);
      return acc;
    }

    const previousMessage = acc[acc.length - 1][0];
    const timePassed = checkTimeBetweenMessages(
      curr.createdAt,
      previousMessage.createdAt,
    );

    if (idx === messages.length - 1) {
      if (previousMessage.senderId === curr.senderId) {
        acc[acc.length - 1].push({ ...curr, shouldShowTime: timePassed });
        return acc;
      }
      acc.push([{ ...curr, shouldShowTime: true }]);
      return acc;
    }

    if (previousMessage.senderId === curr.senderId) {
      if (previousMessage.id !== curr.id) {
        if (timePassed) {
          acc.push([{ ...curr, shouldShowTime: true }]);
          return acc;
        }

        acc[acc.length - 1].push({ ...curr, shouldShowTime: timePassed });
      }
      return acc;
    }

    acc.push([{ ...curr, shouldShowTime: timePassed }]);
    return acc;
  }, []);

  return groupedMessages;
};
