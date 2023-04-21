import { InfiniteData } from '@tanstack/react-query';

import { Post, PostsResponse } from '@/src/schemas/post.schema';

type InfinitePost = InfiniteData<PostsResponse>;

export const updateInfinitePostsLike = (oldData?: InfinitePost, newData?: Post) => {
  if (!newData || !oldData) {
    return;
  }

  const newPages = oldData.pages.map((newPage, idx) => {
    const newPosts = newPage.posts.map((item) => {
      if (item.id === newData.id) {
        if (item.isLiked) {
          return {
            ...item,
            isLiked: false,
            likesCount: item.likesCount - 1,
          };
        }

        return {
          ...item,
          isLiked: true,
          likesCount: item.likesCount + 1,
        };
      }
      return item;
    });

    const newPageData: PostsResponse = {
      ...oldData.pages[0],
      posts: newPosts,
    };

    return newPageData;
  });

  const newPost: InfinitePost = {
    pageParams: oldData.pageParams,
    pages: newPages,
  };
  return newPost;
};
