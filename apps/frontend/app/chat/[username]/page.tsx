import type { Metadata } from 'next'

import { getPageTitle } from '@/utils/get-page-title'

import { ChatRoom } from '@/components/pages/chat-room/chat-room'

type Params = {
	params: {
		username: string
	}
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	if (!params.username) {
		return {
			title: getPageTitle('Chat'),
		}
	}

	return {
		title: getPageTitle(`Chat with @${params.username}`),
	}
}

const ChatRoomPage = () => {
	return <ChatRoom />
}

export default ChatRoomPage
