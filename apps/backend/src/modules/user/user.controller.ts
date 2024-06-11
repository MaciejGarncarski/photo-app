import type { MultipartFile } from '@fastify/multipart';
import type { FastifyReply, FastifyRequest } from 'fastify';

import type { EditAccountInput, FollowUserInput, GetUserInput, GetUserInputByUsername } from './user.schema.js';
import { deleteAvatar, editAccount, followUser, getUser, unfollowUser, updateAvatar } from './user.service.js';

export const getUserHandler = async (
  request: FastifyRequest<{
    Params: GetUserInput;
  }>,
  reply: FastifyReply,
) => {
  const {
    params: { userId },
  } = request;

  const data = await getUser({ userId: userId }, request);

  if (data) {
    return { data };
  }

  return reply.notFound('User not found.');
};

export const getUserByUsernameHandler = async (
  request: FastifyRequest<{
    Params: GetUserInputByUsername;
  }>,
  reply: FastifyReply,
) => {
  const {
    params: { username },
  } = request;

  const data = await getUser({ username: username }, request);

  if (data) {
    return { data };
  }

  return reply.badRequest('Invalid user data.');
};

export const followUserHandler = async (request: FastifyRequest<{ Params: FollowUserInput }>, reply: FastifyReply) => {
  const { userId } = request.session;

  await followUser(request.params.userId, userId);
  return reply.status(204).send();
};

export const unfollowUserHandler = async (
  request: FastifyRequest<{ Params: FollowUserInput }>,
  reply: FastifyReply,
) => {
  const { userId } = request.session;

  await unfollowUser(request.params.userId, userId);
  return reply.status(204).send();
};

export const updateAvatarHandler = async (
  request: FastifyRequest<{ Body: { image: MultipartFile } }>,
  reply: FastifyReply,
) => {
  const { userId } = request.session;
  const fileData = request.body.image;

  if (!fileData) {
    return reply.badRequest('No image provided.');
  }

  const updatedAvatar = await updateAvatar(userId, fileData);
  return { data: updatedAvatar };
};

export const deleteAvatarHandler = async (request: FastifyRequest) => {
  const { userId } = request.session;

  const data = await deleteAvatar(userId);
  return { data };
};

export const editAccountHandler = async (request: FastifyRequest<{ Body: EditAccountInput }>) => {
  const { userId } = request.session;

  const data = await editAccount(userId, request.body);

  return { data };
};
