import { ChatMessage } from '@/src/schemas/chat';

export const groupMessagesByUser = (messages: Array<ChatMessage>) => {
  const groupedMessages = messages.reduce<Array<Array<ChatMessage>>>(
    (acc, curr) => {
      if (!acc[0]) {
        acc.push([curr]);
        return acc;
      }

      const previousMessage = acc[acc.length - 1][0];

      if (previousMessage.senderId === curr.senderId) {
        if (previousMessage.id !== curr.id) {
          acc[acc.length - 1].push(curr);
        }

        return acc;
      }

      acc.push([curr]);
      return acc;
    },
    [],
  );

  return groupedMessages;
};
