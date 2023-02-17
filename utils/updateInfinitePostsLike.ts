import { InfiniteData } from '@tanstack/react-query';

import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type InfinitePost = InfiniteData<InfinitePosts<PostData>>;

export const updateInfinitePostsLike = (oldData?: InfinitePost, newData?: PostData) => {
  if (!newData || !oldData) {
    return;
  }

  const newPages = oldData.pages.map((newPage, idx) => {
    const newPosts = newPage.posts.map((item) => {
      if (item.postId === newData.postId) {
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

    const newCursor = oldData.pages[idx].cursor;
    const newPostsCount = oldData.pages[idx].postsCount;

    const newPageData: InfinitePosts<PostData> = {
      cursor: newCursor,
      postsCount: newPostsCount,
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
