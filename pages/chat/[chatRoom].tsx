import { ChatRoom } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Chat } from '@/components/pages/chat/Chat';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const FriendChatPage = ({ chatRoomData }: { chatRoomData: ChatRoom }) => {
  if (!chatRoomData) {
    return <AccessDenied />;
  }

  return <Chat chatRoomData={chatRoomData} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res, req, query }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
      props: {},
    };
  }

  try {
    const chatRoomData = await prisma.chatRoom.findFirst({
      where: {
        id: Number(string(query.chatRoom)),
      },
    });

    if (!chatRoomData) {
      return {
        redirect: {
          permanent: true,
          destination: '/chat',
        },
        props: {},
      };
    }

    return {
      props: {
        chatRoomData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default FriendChatPage;
