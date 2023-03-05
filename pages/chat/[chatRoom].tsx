import { ChatRoom } from '@prisma/client';
import { GetServerSideProps } from 'next';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { Chat } from '@/components/pages/chat/Chat';

const FriendChatPage = ({ chatRoomData }: { chatRoomData: ChatRoom }) => {
  return <Chat chatRoomData={chatRoomData} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const chatRoomData = await prisma.chatRoom.findFirst({
      where: {
        id: Number(string(query.chatRoom)),
      },
    });

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
