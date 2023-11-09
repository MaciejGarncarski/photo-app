import { Metadata } from 'next';

import { getQueryClient } from '@/src/utils/api/get-query-client';
import { getPageTitle } from '@/src/utils/get-page-title';

import { PostById } from '@/src/components/pages/post-by-id/post-by-id';
import { APP_URL } from '@/src/constants';
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
      const { data: post } = await getPost(
        { postId: postId },
        { cache: 'no-cache' },
      );

      if (!post['data']) {
        throw new Error('No post data.');
      }

      return post['data'];
    },
  });

  if (!postData) {
    return {
      title: getPageTitle('Post'),
    };
  }
  const {
    data: { data: userData },
  } = await getUser({ userId: postData.authorId }, { cache: 'no-cache' });

  const image = postData.images[0];

  return {
    title: getPageTitle(`@${userData.username} post`),
    metadataBase: new URL('https://ik.imagekit.io'),
    description: postData.description,
    openGraph: {
      title: getPageTitle(`@${userData.username} post`),
      description: postData.description,
      url: APP_URL,
      siteName: 'Photo App',
      locale: 'en_GB',
      type: 'article',
      images: [
        {
          alt: `${userData.username} post. Description: ${postData.description}`,
          url: image.thumbnailUrl,
          width: image.width,
          height: image.height,
        },
      ],
    },
  };
};

const PostPage = async () => {
  return <PostById />;
};

export default PostPage;
