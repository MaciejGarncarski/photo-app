export type ChatMessage = {
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  id: string;
};

export type ChatMessages = {
  messages: {
    senderId: string;
    receiverId: string;
    text: string;
    createdAt: string;
    id: string;
  }[];
  totalPages: number;
  currentPage: number;
  messagesCount: number;
};

export type ChatUsers = {
  users: Array<string>;
  totalPages: number;
  currentPage: number;
  usersCount: number;
};
