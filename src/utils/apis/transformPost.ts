import { Post } from '@prisma/client';
import { Session } from 'next-auth';

import { getUserResponse } from '@/src/utils/apis/getUserResponse';

import { PostImage } from '@/src/components/atoms/accountPost/AccountPost';

import { User } from '@/src/pages/api/account/userId/[userId]';

import { prisma } from '../../../prisma/prismadb';

export type PostData = {
  authorId: string;
  author: User | null;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  description: string;
  imagesData: Array<PostImage | null>;
  postId: number;
  isLiked: boolean;
};

type PostToTransform = Post & {
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

export const transformPost = async (post: PostToTransform, session?: Session | null): Promise<PostData> => {
  const isLiked = await prisma.postLike.findFirst({
    where: {
      post_id: post.id,
      user_id: session?.user?.id,
    },
  });

  const postImageIds = [post.image1, post.image2, post.image3];

  const postImages = await Promise.all(
    postImageIds.map(async (imageId) => {
      const postImage = await prisma.postImage.findFirst({
        where: {
          id: imageId ?? -1,
        },
      });

      return postImage;
    }),
  );

  const authorData = await prisma.user.findFirst({
    where: {
      id: post.author_id,
    },
  });

  if (!authorData) {
    return {
      author: null,
      authorId: post.author_id,
      likesCount: post._count.posts_likes,
      commentsCount: post._count.posts_comments,
      createdAt: post.created_at,
      description: post.description,
      imagesData: postImages,
      postId: post.id,
      isLiked: session ? Boolean(isLiked) : false,
    };
  }

  const { response } = await getUserResponse({ userData: authorData, sessionUserId: session?.user?.id });

  return {
    author: response,
    authorId: post.author_id,
    likesCount: post._count.posts_likes,
    commentsCount: post._count.posts_comments,
    createdAt: post.created_at,
    description: post.description,
    imagesData: postImages,
    postId: post.id,
    isLiked: session ? Boolean(isLiked) : false,
  };
};
