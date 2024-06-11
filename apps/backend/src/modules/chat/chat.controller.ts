import type { FastifyReply, FastifyRequest } from 'fastify';

import type {
  ChatMessagesParams,
  ChatMessagesQuery,
  ChatRoomInput,
  ChatUsersQuery,
  CreateMessage,
  DeleteMessageParams,
} from './chat.schema.js';
import { chatMessages, chatUsers, createChatRoom, createMessage, deleteMessage } from './chat.service.js';
import { db } from '../../utils/db.js';

export const createChatRoomHandler = async (
  request: FastifyRequest<{ Params: ChatRoomInput }>,
  reply: FastifyReply,
) => {
  const { username } = request.params;
  const { userId } = request.session;

  const user = await db.user.findFirst({
    where: {
      userId,
    },
  });

  if (!user) {
    return reply.notFound();
  }

  if (user.username === username) {
    return reply.badRequest('Receiver is sender.');
  }

  const chatRoom = await createChatRoom(username, userId);

  if (!chatRoom) {
    return reply.notFound('Chat room not found.');
  }

  return { data: chatRoom };
};

export const chatRoomMessagesHandler = async (
  request: FastifyRequest<{ Params: ChatMessagesParams; Querystring: ChatMessagesQuery }>,
  reply: FastifyReply,
) => {
  const { receiverId } = request.params;
  const { userId } = request.session;

  if (userId === receiverId) {
    return reply.badRequest('Receiver is sender.');
  }

  const chatMessagesResponse = await chatMessages(userId, receiverId, parseInt(request.query.skip));
  return { data: chatMessagesResponse };
};

export const chatRoomUsersHandler = async (request: FastifyRequest<{ Querystring: ChatUsersQuery }>) => {
  const skip = parseInt(request.query.skip);
  const { userId } = request.session;

  const chatUsersData = await chatUsers(userId, skip);
  return { data: chatUsersData };
};

export const deleteMessageHandler = async (
  request: FastifyRequest<{ Params: DeleteMessageParams }>,
  reply: FastifyReply,
) => {
  const { userId } = request.session;

  const {
    params: { messageId },
  } = request;

  const response = await deleteMessage(userId, messageId);

  if (response === 'ok') {
    return reply.status(204).send();
  }

  return reply.badRequest('Cannot delete message.');
};

export const createMessageHandler = async (request: FastifyRequest<{ Body: CreateMessage }>, reply: FastifyReply) => {
  const { receiverId, senderId, message } = request.body;

  const response = await createMessage({ senderId, receiverId, message });
  if (response) {
    request.server.io.to(response.roomName).emit('new message', response.createdMessage);
    return { status: 'ok' };
  }

  return reply.badRequest('cannot send message');
};
