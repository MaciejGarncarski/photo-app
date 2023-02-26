import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';

import { authOptions } from './api/auth/[...nextauth]';

const ChatPage = () => {
  return null;
};

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const latestFriend = await prisma.follower.findFirst({
      where: {
        to: session?.user?.id ?? '',
      },
      orderBy: {
        id: 'desc',
      },
    });

    return {
      redirect: {
        permanent: false,
        destination: `/chat/${latestFriend?.from}`,
      },
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ChatPage;
