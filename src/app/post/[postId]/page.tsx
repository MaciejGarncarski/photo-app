import { Metadata } from 'next';

import { getQueryClient } from '@/src/utils/api/get-query-client';
import { setTitle } from '@/src/utils/set-title';

import { PostById } from '@/src/components/pages/post-by-id/post-by-id';
import { getPost } from '@/src/services/posts.service';
import { getUser } from '@/src/services/user.service';

type Props = {
  params: { postId: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const queryClient = getQueryClient();
  const { postId } = params;

  const postData = await queryClient.fetchQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data: post } = await getPost({ postId: postId });

      if (!post['data']) {
        throw new Error('No post data.');
      }

      return post['data'];
    },
  });

  if (!postData) {
    return {
      title: setTitle('Post'),
    };
  }
  const {
    data: { data: userData },
  } = await getUser({ userId: postData.authorId });

  const image = postData.images[0];

  return {
    title: setTitle('Post'),
    metadataBase: new URL('https://ik.imagekit.io'),
    openGraph: {
      title: setTitle(`@${userData.username} Post`),
      description: postData.description,

      images: [
        {
          url: image.thumbnailUrl,
          width: image.width,
          height: image.height,
        },
      ],
      locale: 'en_GB',
      type: 'article',
    },
  };
};

const PostPage = async () => {
  return <PostById />;
};

export default PostPage;
