import { InfiniteData } from '@tanstack/react-query';

import { Post, PostsResponse } from '@/src/schemas/post.schema';

export type InfinitePost = InfiniteData<PostsResponse>;

export const updateInfinitePostsLike = (
  oldInfiniteData?: InfinitePost,
  postData?: Post,
) => {
  if (!postData || !oldInfiniteData) {
    return;
  }

  const newPages = oldInfiniteData.pages.map((newPage) => {
    const newPosts = newPage.posts.map((item) => {
      if (item.id === postData.id) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likesCount: item.likesCount + (item.isLiked ? -1 : 1),
        };
      }
      return item;
    });

    const newPageData = {
      ...oldInfiniteData.pages[0],
      posts: newPosts,
    } satisfies PostsResponse;
    return newPageData;
  });

  const updatedData = {
    pageParams: oldInfiniteData.pageParams,
    pages: newPages,
  } satisfies InfinitePost;

  return updatedData;
};
