import { ChatMessage } from '@/src/schemas/chat.schema';

type Message = ChatMessage & {
  shouldShowTime: boolean;
};

type MessageGroup = Array<Array<Message>>;

export const groupMessagesByUser = (messages: Array<Message>) => {
  const groupedMessages = messages.reduce<MessageGroup>((acc, curr, idx) => {
    if (!acc[0]) {
      acc.push([curr]);
      return acc;
    }

    const previousMessage = messages[idx - 1];

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
  }, []);

  return groupedMessages;
};
