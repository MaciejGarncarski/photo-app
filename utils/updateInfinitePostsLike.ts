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
      if (item.id === newData.id) {
        const { posts_likes } = item._count;

        if (item.isLiked) {
          return {
            ...item,
            isLiked: false,
            _count: { ...item._count, posts_likes: posts_likes - 1 },
            likesCount: item.likesCount - 1,
          };
        }

        return {
          ...item,
          isLiked: true,
          _count: { ...item._count, posts_likes: posts_likes + 1 },
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
