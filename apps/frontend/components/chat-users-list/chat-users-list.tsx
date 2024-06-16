'use client'

import { Fragment } from 'react'

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

import { ChatUser } from '@/components/chat-users-list/chat-user'
import { Loader } from '@/components/loader/loader'
import { useChatUsers } from '@/components/pages/chat/use-chat-users'

import styles from './chat-users-list.module.scss'

export const ChatUsersList = () => {
	const { data, hasNextPage, fetchNextPage } = useChatUsers()

	const { ref } = useInfiniteScroll({
		hasNextPage: Boolean(hasNextPage),
		fetchNextPage,
		enabled: true,
	})

	if (data?.pages[0].usersCount === 0) {
		return <p className={styles.notFound}>No other users found.</p>
	}

	return (
		<ul className={styles.list}>
			{data.pages.map((page) => {
				return page.users.map(({ userId, message, messageCreatedAt }, idx) => {
					return (
						<Fragment key={userId}>
							<ChatUser
								userId={userId}
								message={message || ''}
								messageCreatedAt={messageCreatedAt || ''}
							/>
							{page.users.length - 1 !== idx && (
								<li>
									<hr className={styles.separator} />
								</li>
							)}
						</Fragment>
					)
				})
			})}
			{hasNextPage && (
				<div ref={ref} className={styles.loading}>
					<Loader color="accent" size="small" />
				</div>
			)}
		</ul>
	)
}
