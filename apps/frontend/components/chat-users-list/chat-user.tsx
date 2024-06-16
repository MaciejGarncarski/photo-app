'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useUser } from '@/hooks/use-user'
import { formatDateRelative } from '@/utils/format-date-relative'

import { Avatar } from '@/components/avatar/avatar'

import styles from './chat-users-list.module.scss'

type Props = {
	userId: string
	message: string
	messageCreatedAt: string | null
}

export const ChatUser = ({ userId, message, messageCreatedAt }: Props) => {
	const { data, isPending } = useUser({ userId })
	const params = useParams()

	const isActive = userId === (params?.receiverId as string)

	return (
		<>
			{isPending || !data ? (
				<li key={`placeholder-${userId}`} className={styles.listItem}>
					<div className={styles.placeholderLoading} />
				</li>
			) : (
				<li className={styles.listItem}>
					<Link
						href={`/chat/${data.username}`}
						className={clsx(isActive && styles.linkActive, styles.link)}
					>
						<Avatar userId={userId} size="small" />
						<span className={styles.rightCol}>
							<span className={styles.username}>@{data.username}</span>
							<span className={styles.message}>
								{message || 'No messages yet.'}
							</span>
						</span>
						{messageCreatedAt && (
							<span className={styles.createdAt}>
								<time dateTime={messageCreatedAt}>
									{formatDateRelative(messageCreatedAt)}
								</time>
							</span>
						)}
					</Link>
				</li>
			)}
		</>
	)
}
