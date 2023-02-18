import { Post, User } from '@prisma/client';
import { Session } from 'next-auth';

import { prisma } from '@/lib/prismadb';

import { PostData } from '@/components/pages/collection/useCollection';

type PostToTransform = Post & {
  author: User;
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

export const transformPost = async (post: PostToTransform, session?: Session | null): Promise<PostData> => {
  const isInCollection = await prisma.collection.findFirst({
    where: {
      post_id: post.id,
      user_id: session?.user?.id,
    },
  });

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

  return {
    author: post.author,
    authorId: post.author_id,
    likesCount: post._count.posts_likes,
    commentsCount: post._count.posts_comments,
    createdAt: post.created_at,
    description: post.description,
    imagesData: postImages,
    postId: post.id,
    isInCollection: Boolean(isInCollection),
    isLiked: Boolean(isLiked),
  };
};
