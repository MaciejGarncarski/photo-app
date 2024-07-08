import clsx from 'clsx'

import { useAuth } from '@/hooks/use-auth'

import { Avatar } from '@/components/avatar/avatar'
import { ChatMessage } from '@/components/chat-message/chat-message'
import type { ChatMessage as TChatMessage } from '@/schemas/chat.schema'

import styles from './chat-message-group.module.css'

type Props = {
	messageGroup: Array<TChatMessage>
}

export const ChatMessageGroup = ({ messageGroup }: Props) => {
	const { senderId, receiverId } = messageGroup[0]
	const { sessionUser } = useAuth()

	const isReceiver = receiverId === sessionUser?.id

	return (
		<li className={clsx(isReceiver && styles.messageReceiver, styles.message)}>
			{isReceiver && (
				<div className={styles.avatar}>
					<Avatar userId={senderId} size="small" />
				</div>
			)}
			<div className={styles.textColumn}>
				{messageGroup.map(({ text, id, createdAt, receiverId }) => {
					const isReceiver = receiverId === sessionUser?.id

					return (
						<ChatMessage
							createdAt={createdAt}
							isReceiver={isReceiver}
							text={text}
							id={id}
							receiverId={receiverId}
							key={id}
						/>
					)
				})}
			</div>
		</li>
	)
}
