import { checkTimeBetweenMessages } from '@/src/utils/check-time-between-messages';

import { ChatMessages } from '@/src/schemas/chat.schema';

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
