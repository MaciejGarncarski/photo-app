import { DotsThree, Trash } from '@phosphor-icons/react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { useModal } from '@/hooks/use-modal'
import { formatDateFull } from '@/utils/format-date-full'

import { Avatar } from '@/components/avatar/avatar'
import { Button } from '@/components/buttons/button/button'
import { useComment } from '@/components/comment/use-comment'
import { DropdownContent } from '@/components/dropdown/dropdown-content/dropdown-content'
import { DropdownItem } from '@/components/dropdown/dropdown-item/dropdown-item'
import { HeartIcon } from '@/components/heart-icon'
import { Loader } from '@/components/loader/loader'
import { ConfirmationDialog } from '@/components/modals/confirmation-dialog/confirmation-dialog'
import { TooltipContent } from '@/components/tooltip-content/tooltip-content'
import type { Comment as TComment } from '@/schemas/post-comment.schema'

import styles from './comment.module.scss'

type Props = {
	commentData: TComment
}

export const Comment = ({ commentData }: Props) => {
	const { authorId, createdAt, text, isLiked, likesCount } = commentData
	const { openModal, closeModal, isModalOpen } = useModal()
	const [isOpen, setIsOpen] = useState(false)

	const {
		handleDelete,
		handleLike,
		isDeleting,
		isAbleToDelete,
		timeSinceCreated,
		userAccountHref,
		username,
	} = useComment({ commentData })

	return (
		<article className={styles.comment}>
			<Link href={userAccountHref} className={styles.avatarContainer}>
				<span className="visually-hidden">@{username}</span>
				<Avatar userId={authorId} size="small" />
			</Link>
			<div className={styles.commentText}>
				<h3 className={styles.author}>{username}</h3>
				<p className={styles.content}>{text}</p>
			</div>
			<div className={styles.info}>
				<button type="button" onClick={handleLike} className={styles.likeBtn}>
					<HeartIcon isLiked={isLiked} />
					<p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
				</button>

				<Tooltip.Provider>
					<Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
						<Tooltip.Trigger asChild>
							<button type="button" className={styles.createdAt}>
								<time dateTime={createdAt.toString()}>{timeSinceCreated}</time>
							</button>
						</Tooltip.Trigger>
						{isOpen ? (
							<TooltipContent>
								{formatDateFull(createdAt, { fullMonth: true })}
							</TooltipContent>
						) : null}
					</Tooltip.Root>
				</Tooltip.Provider>

				{isAbleToDelete && (
					<div className={styles.buttonLast}>
						<Dropdown.Root>
							<Dropdown.Trigger asChild>
								<button type="button" onClick={openModal}>
									<span className="visually-hidden">options</span>
									<DotsThree />
								</button>
							</Dropdown.Trigger>
							<Dropdown.Portal>
								<DropdownContent side="left">
									<DropdownItem variant="destructive" onSelect={openModal}>
										<Trash />
										<span>Delete</span>
									</DropdownItem>
								</DropdownContent>
							</Dropdown.Portal>
						</Dropdown.Root>
					</div>
				)}
			</div>

			<ConfirmationDialog
				isVisible={isModalOpen}
				closeModal={closeModal}
				text="Do you want to delete comment?"
			>
				<Button variant="destructive" onClick={handleDelete}>
					{isDeleting ? <Loader color="primary" size="small" /> : <Trash />}
					{isDeleting ? 'Deleting...' : 'Delete'}
				</Button>
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
			</ConfirmationDialog>
		</article>
	)
}
