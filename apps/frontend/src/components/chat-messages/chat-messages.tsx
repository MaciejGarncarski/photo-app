import type { InfiniteData } from '@tanstack/react-query'
import { Fragment, Ref } from 'react'

import { formatDateFull } from '@/utils/format-date-full'

import { ChatMessageGroup } from '@/components/chat-message-group/chat-message-group'
import { groupMessagesByUser } from '@/components/chat-messages/group-messages'
import { Loader } from '@/components/loader/loader'
import type { ChatMessages as ChatMessagesType } from '@/schemas/chat.schema'

import styles from './chat-messages.module.css'

type Props = {
	messagesData: InfiniteData<ChatMessagesType>
	hasNextPage: boolean
	isPending: boolean
	ref: Ref<HTMLLIElement>
}

export const ChatMessages = ({
	hasNextPage,
	isPending,
	messagesData,
	ref,
}: Props) => {
	const { groupedMessages, isEmpty } = groupMessagesByUser(messagesData.pages)

	if (isEmpty) {
		return (
			<div className={styles.messages}>
				<p className={styles.noMessages}>No messages yet.</p>
			</div>
		)
	}

	return (
		<ul className={styles.messages}>
			{groupedMessages.map((group) => {
				const message = group[group.length - 1]

				return (
					<Fragment key={message.id}>
						<ChatMessageGroup messageGroup={group} />
						{message.shouldShowTime && (
							<li className={styles.time}>
								<time dateTime={message.createdAt}>
									{formatDateFull(message.createdAt)}
								</time>
							</li>
						)}
					</Fragment>
				)
			})}

			{hasNextPage && !isPending && (
				<li className={styles.loading} ref={ref}>
					<Loader color="accent" size="big" />
				</li>
			)}
		</ul>
	)
}
