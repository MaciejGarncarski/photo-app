import { ChatRoom as ChatRoomType } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { Loader } from '@/components/atoms/loader/Loader';
import { ChatRoom } from '@/components/pages/chatRoom/ChatRoom';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const FriendChatPage = ({ chatRoomData }: { chatRoomData: ChatRoomType }) => {
  if (!chatRoomData) {
    return <Loader />;
  }

  return <ChatRoom chatRoomData={chatRoomData} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res, req, query }) => {
  const session = await getServerSession(req, res, authOptions);

  const userId = session?.user?.id;

  const redirect = {
    redirect: {
      permanent: true,
      destination: '/chat',
    },
    props: {},
  };

  if (!session) {
    return redirect;
  }

  try {
    const chatRoomData = await prisma.chatRoom.findFirst({
      where: {
        id: Number(string(query.chatRoom)),
        OR: [
          {
            userOne_id: userId,
            userTwo_id: {
              not: {
                equals: 'undefined',
              },
            },
          },
          {
            userTwo_id: userId,
            userOne_id: {
              not: {
                equals: 'undefined',
              },
            },
          },
        ],
      },
    });

    if (!chatRoomData) {
      return redirect;
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
