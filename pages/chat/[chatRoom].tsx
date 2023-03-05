import { ChatRoom } from '@prisma/client';
import { GetServerSideProps } from 'next';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Chat } from '@/components/pages/chat/Chat';

const FriendChatPage = ({ chatRoomData }: { chatRoomData: ChatRoom }) => {
  if (!chatRoomData) {
    return <AccessDenied />;
  }

  return <Chat chatRoomData={chatRoomData} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
