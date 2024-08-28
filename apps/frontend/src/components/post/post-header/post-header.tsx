'use client'

import { DotsThreeVertical, Trash } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'
import { useState } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { formatDateFull } from '@/utils/format-date-full'

import { Avatar } from '@/components/avatar/avatar'
import { Button } from '@/components/buttons/button/button'
import { FollowButton } from '@/components/buttons/follow-button/follow-button'
import { Loader } from '@/components/loader/loader'
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog'
import { usePost } from '@/components/pages/account/use-post'
import { usePostHeader } from '@/components/post/post-header/use-post-header'
import { PostOptions } from '@/components/post/post-options/post-options'
import { TooltipContent } from '@/components/tooltip-content/tooltip-content'

import styles from './post-header.module.css'

type Props = {
	tag?: 'header' | 'div'
	postId: number
}

export const PostHeader = ({ tag: Tag = 'header', postId }: Props) => {
	const { sessionUser } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const { data } = usePost({ postId })

	const {
		handleDeletePost,
		deletePostMutation,
		username,
		confirmationModal,
		menuModal,
		postData,
		dateFromNow,
	} = usePostHeader({
		authorId: data.authorId,
		createdAt: data.createdAt,
		postId,
	})

	const isAuthor = sessionUser?.id === data.authorId
	const authorId = data.authorId

	return (
		<Tag className={styles.header}>
			<Link href={`/user/${username}`} className={styles.userAnchor}>
				<Avatar userId={authorId} size="small" />
				<span className={styles.usernameContainer}>
					<span className={styles.username}>{username}</span>

					<Tooltip.Provider delayDuration={0}>
						<Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
							<Tooltip.Trigger asChild>
								<button type="button" className={styles.createdAt}>
									<span className={styles.dot}>&#8226;&nbsp;</span>
									<time dateTime={postData.createdAt.toString()}>
										{dateFromNow}
									</time>
								</button>
							</Tooltip.Trigger>
							{isOpen ? (
								<TooltipContent>
									{formatDateFull(postData.createdAt, {
										fullMonth: true,
									})}
								</TooltipContent>
							) : null}
						</Tooltip.Root>
					</Tooltip.Provider>
				</span>
			</Link>

			{sessionUser?.id && (
				<div className={styles.options}>
					{!isAuthor && <FollowButton userId={authorId} />}
					{isAuthor && (
						<button type="button" onClick={menuModal.openModal}>
							<span className="visually-hidden">Settings</span>
							<DotsThreeVertical size={28} />
						</button>
					)}
				</div>
			)}

			<PostOptions
				isVisible={menuModal.isModalOpen}
				key="options"
				postId={postId}
				authorId={authorId}
				closeModal={menuModal.closeModal}
				openConfirmation={confirmationModal.openModal}
			/>
			<ConfirmationDialog
				isVisible={confirmationModal.isModalOpen}
				text="Your post will be removed from our servers. This action is irreversible."
				closeModal={confirmationModal.closeModal}
			>
				<Button
					variant="destructive"
					onClick={handleDeletePost}
					disabled={deletePostMutation.isPending}
				>
					{deletePostMutation.isPending ? (
						<>
							Deleting
							<Loader color="primary" size="small" />
						</>
					) : (
						<>
							Delete
							<Trash />
						</>
					)}
				</Button>
				<Button variant="secondary" onClick={confirmationModal.closeModal}>
					Cancel
				</Button>
			</ConfirmationDialog>
		</Tag>
	)
}
