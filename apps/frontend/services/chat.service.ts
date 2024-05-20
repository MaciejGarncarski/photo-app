import { fetcher } from "@/utils/api/api-client";

export const addChatMessage = fetcher
  .path("/chat/message")
  .method("post")
  .create();

export const deleteChatMessage = fetcher
  .path("/chat/message/{messageId}")
  .method("delete")
  .create();

export const getChatRoomData = fetcher
  .path("/chat/check-user/{username}")
  .method("get")
  .create();

export const getChatUsers = fetcher.path("/chat/users").method("get").create();

export const getChatMessages = fetcher
  .path("/chat/messages/{receiverId}")
  .method("get")
  .create();
