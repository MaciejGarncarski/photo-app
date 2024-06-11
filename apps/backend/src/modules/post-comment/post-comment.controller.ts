import type { FastifyReply, FastifyRequest } from 'fastify';

import type {
  AddPostCommentInput,
  CommentLikeInput,
  DeletePostCommentInput,
  GetPostCommentsInput,
  GetPostCommentsQuery,
} from './post-comment.schema.js';
import { addComment, addCommentLike, deleteComment, deleteCommentLike, getComments } from './post-comment.service.js';

export const addPostCommentHandler = async (request: FastifyRequest<{ Body: AddPostCommentInput }>) => {
  const { userId } = request.session;
  const { body } = request;

  const comment = await addComment(body.commentText, parseInt(request.body.postId), userId);

  return { data: comment };
};

export const deletePostCommentHandler = async (
  request: FastifyRequest<{ Params: DeletePostCommentInput }>,
  reply: FastifyReply,
) => {
  const { commentId } = request.params;
  const { userId } = request.session;

  const response = await deleteComment(parseInt(commentId), userId);
  if (response === 'ok') {
    return reply.status(204).send();
  }

  return reply.badRequest('Cannot delete comment.');
};

export const getCommentsHandler = async (
  request: FastifyRequest<{ Params: GetPostCommentsInput; Querystring: GetPostCommentsQuery }>,
) => {
  const {
    query: { skip },
    params: { postId },
  } = request;
  const { userId } = request.session;
  const commentsData = await getComments(parseInt(postId), parseInt(skip), userId);
  return { data: commentsData };
};

export const addCommentLikeHandler = async (
  request: FastifyRequest<{ Params: CommentLikeInput }>,
  reply: FastifyReply,
) => {
  const { userId } = request.session;
  const response = await addCommentLike(parseInt(request.params.commentId), userId);

  if (response === 'ok') {
    return reply.status(204).send();
  }

  return reply.badRequest('Comment is already liked.');
};

export const deleteCommentLikeHandler = async (
  request: FastifyRequest<{ Params: CommentLikeInput }>,
  reply: FastifyReply,
) => {
  const { userId } = request.session;
  await deleteCommentLike(parseInt(request.params.commentId), userId);
  return reply.status(204).send();
};
