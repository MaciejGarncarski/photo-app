import { Collection, Post, User } from '@prisma/client';
import { Session } from 'next-auth';

import { prisma } from '@/lib/prismadb';

type CollectionResponse = Collection & {
  post: Post & {
    author: User;
    _count: {
      posts_likes: number;
      posts_comments: number;
    };
  };
};

type TransformCollection = {
  collectionPost: CollectionResponse;
  session: Session;
};

export const transformCollectionPost = async ({ collectionPost, session }: TransformCollection) => {
  const {
    post: { id, _count },
  } = collectionPost;

  const isInCollection = await prisma.collection.findFirst({
    where: {
      post_id: id,
      user_id: session?.user?.id,
    },
  });

  const like = await prisma.postLike.findFirst({
    where: {
      post_id: id,
      user_id: session.user?.id,
    },
  });

  return {
    ...collectionPost.post,
    isLiked: Boolean(like),
    isInCollection: Boolean(isInCollection),
    likesCount: _count.posts_likes,
    commentsCount: _count.posts_comments,
  };
};
