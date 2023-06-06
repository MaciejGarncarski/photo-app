import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/src/utils/tests/utils';

import { Post } from '@/src/schemas/post.schema';

import { PostSlider } from './PostSlider';

const mockedPost: Post = {
  authorId: 'mockedUser',
  commentsCount: 0,
  createdAt: new Date(),
  description: 'hello',
  id: 1,
  images: [
    {
      fileId: 'dasdasavca',
      height: 200,
      id: 1,
      name: 'zubr',
      postId: 1,
      size: 200,
      thumbnailUrl: 'xd.jpg',
      url: 'http://hello.pl/img.png',
      width: 200,
    },
    {
      fileId: 'second',
      height: 200,
      id: 2,
      name: 'zubr',
      postId: 1,
      size: 200,
      thumbnailUrl: 'xd.jpg',
      url: 'http://hello.pl/img.png',
      width: 200,
    },
  ],
  isLiked: true,
  likesCount: 1,
};

describe('Post slider test', () => {
  it('should change images', () => {
    render(<PostSlider post={mockedPost} priority={false} />);
    const nextImageButton = screen.getByRole('button', { name: /next image/i });
    const progressList = screen.getByRole('list');
    const [firstDot, secondDot] = progressList.children;
    expect(progressList).toBeInTheDocument();
    expect(nextImageButton).toBeInTheDocument();
    expect(firstDot).not.toHaveStyle('opacity: 0.45');
    fireEvent.click(nextImageButton);
    expect(secondDot).not.toHaveStyle('opacity: 0.45');
    expect(nextImageButton).not.toBeInTheDocument();
  });
});
