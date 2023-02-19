import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';
import { transformPost } from '@/utils/transformPost';

import { Loading } from '@/components/atoms/loading/Loading';
import { Account } from '@/components/pages/account/Account';
import { PostData } from '@/components/pages/collection/useCollection';

const PostPage = ({ post }: { post: PostData }) => {
  const router = useRouter();

  if (!router.isReady) {
    return <Loading />;
  }

  return <Account isModalOpen username={post.author.username ?? ''} />;
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const postData = await prisma.post.findFirst({
    where: {
      id: Number(string(query.id)),
    },
    include: {
      author: true,
      _count: {
        select: {
          posts_likes: true,
          posts_comments: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  if (!postData) {
    return {
      props: {},
    };
  }

  const post = await transformPost(postData);

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default PostPage;
