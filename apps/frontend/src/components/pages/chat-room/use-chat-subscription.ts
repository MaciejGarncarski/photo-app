import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/use-auth'
import { socket } from '@/utils/api/socket'

import { useChatRoomData } from '@/components/pages/chat-room/use-chat-room-data'
import { useNotificationSoundPreference } from '@/components/settings-modal/use-notification-sound-preference'

export const useChatSubscription = () => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { data: chatRoomData, isError: chatRoomError } = useChatRoomData()
	const { isSoundEnabled } = useNotificationSoundPreference()
	const { sessionUser } = useAuth()

	useEffect(() => {
		if (chatRoomError) {
			router.push('/chat/')
			toast.error('Cannot connect to chat')
		}
	}, [chatRoomError, router])

	useEffect(() => {
		if (typeof chatRoomData !== 'undefined' && chatRoomData?.id !== 0) {
			socket.emit('join chat room', { chatRoomId: chatRoomData?.id })
		}

		const notificationAudio = new Audio('/notification.mp3')

		const newMessage = (message: {
			senderId: string
			receiverId: string
			text: string
			createdAt: string
			id: string
		}) => {
			const userId =
				sessionUser?.id === message.receiverId
					? message.senderId
					: message.receiverId
			queryClient.invalidateQueries({ queryKey: ['chatMessages', userId] })

			if (isSoundEnabled && sessionUser?.id !== message.senderId) {
				notificationAudio.play()

				if (window.navigator.vibrate) {
					window.navigator.vibrate(100)
				}
			}
		}

		socket.on('new message', newMessage)

		return () => {
			socket.off('new message', newMessage)
		}
	}, [
		chatRoomData,
		chatRoomData?.id,
		isSoundEnabled,
		queryClient,
		sessionUser?.id,
	])
}
