import { mockedUser } from './mockedData';
import {
  InfinitePost,
  updateInfinitePostsLike,
} from '../updateInfinitePostsLike';

const post = {
  authorId: mockedUser.id,
  commentsCount: 0,
  createdAt: new Date(),
  description: 'test',
  id: 1,
  images: [],
  isLiked: false,
  likesCount: 0,
};

const infiniteData: InfinitePost = {
  pageParams: [0],
  pages: [
    {
      currentPage: 0,
      posts: [post],
      postsCount: 1,
      totalPages: 1,
    },
  ],
};

describe('updateInfinitePostsLike', () => {
  it('should update likes', () => {
    const newPost = updateInfinitePostsLike(infiniteData, post);
    expect(newPost?.pages[0].posts[0].likesCount).toBe(1);
  });
});
