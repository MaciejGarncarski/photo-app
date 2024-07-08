import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '@/utils/get-page-title'
import { isAuthenticated } from '@/utils/is-authenticated'

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

const ChatRoomPage = async () => {
	const isSignedIn = await isAuthenticated()

	if (!isSignedIn) {
		redirect('/access-denied')
	}

	return <ChatRoom />
}

export default ChatRoomPage
