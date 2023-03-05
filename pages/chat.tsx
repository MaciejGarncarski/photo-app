import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { useAuth } from '@/hooks/useAuth';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';

import { authOptions } from './api/auth/[...nextauth]';

const ChatPage = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <AccessDenied />;
  }

  return null;
};

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  try {
    const latestFriend = await prisma.follower.findFirst({
      where: {
        to: userId,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        OR: [
          { userOne_id: userId, userTwo_id: latestFriend?.from },
          { userOne_id: latestFriend?.from, userTwo_id: userId },
        ],
      },
    });

    if (!chatRoom && latestFriend?.from && userId) {
      const { id } = await prisma.chatRoom.create({
        data: {
          userOne_id: latestFriend?.from,
          userTwo_id: userId,
        },
        select: {
          id: true,
        },
      });
      return {
        redirect: {
          permanent: false,
          destination: `/chat/${id}`,
        },
        props: {},
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: `/chat/${chatRoom?.id || ''}`,
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
