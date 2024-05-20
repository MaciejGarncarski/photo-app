import type { Metadata } from "next";

import { getPageTitle } from "@/utils/get-page-title";

import { ChatRoom } from "@/components/pages/chat-room/chat-room";
import { ProtectedPage } from "@/components/pages/protected-page/protected-page";

type Params = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  if (!params.username) {
    return {
      title: getPageTitle("Chat"),
    };
  }

  return {
    title: getPageTitle(`Chat with @${params.username}`),
  };
}

const ChatRoomPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <ChatRoom />
    </ProtectedPage>
  );
};

export default ChatRoomPage;
