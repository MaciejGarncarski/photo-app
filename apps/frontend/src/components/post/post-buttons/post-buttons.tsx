'use client'

import { Chat, Download } from '@phosphor-icons/react'
import { useAnimate } from 'framer-motion'

import { useAuth } from '@/hooks/use-auth'
import { useModal } from '@/hooks/use-modal'
import { formatLikes } from '@/utils/format-likes'

import { HeartIcon } from '@/components/heart-icon/heart-icon'
import { usePost } from '@/components/pages/account/use-post'
import { useDownloadPost } from '@/components/post/post-buttons/use-download-post'
import { useHandleLike } from '@/components/post/post-buttons/use-handle-like'
import { PostModal } from '@/components/post/post-modal/post-modal'

import styles from './post-buttons.module.css'

type Props = {
	postId: number
	isLiked: boolean
	parentModalOpen?: boolean
	likesCount: number
}

export const PostButtons = ({
	postId,
	isLiked,
	likesCount,
	parentModalOpen,
}: Props) => {
	const postModal = useModal()
	const { sessionUser } = useAuth()
	const { mutate } = useDownloadPost()
	const { data: postData } = usePost({ postId })
	const [scope, animate] = useAnimate()
	const { handleLike } = useHandleLike({
		postId,
		isLiked: isLiked || false,
	})

	const postModalOpen = () => {
		postModal.openModal()
	}

	const onLike = async () => {
		if (!sessionUser) {
			handleLike()
			return
		}

		await animate(
			scope.current,
			{
				y: 30,
				opacity: 0,
			},
			{
				duration: 0.1,
			},
		)
		handleLike()
		await animate(
			scope.current,
			{
				y: -30,
			},
			{
				duration: 0.01,
			},
		)
		await animate(
			scope.current,
			{
				y: 0,
				opacity: 1,
			},
			{
				duration: 0.1,
			},
		)
	}

	const downloadImages = async () => {
		for (const idx of postData.images.keys()) {
			mutate({
				imageIndex: idx,
				postId: postId,
			})
		}
	}

	return (
		<ul className={styles.list}>
			<li className={styles.listItem}>
				<button
					ref={scope}
					className={styles.button}
					type="button"
					onClick={onLike}
				>
					<HeartIcon isLiked={isLiked} />
					{likesCount !== 0 && (
						<span className={styles.buttonsCount}>
							{formatLikes(likesCount)}
						</span>
					)}
					<span className="visually-hidden">like</span>
				</button>
			</li>
			<li>
				<button
					className={styles.button}
					type="button"
					onClick={parentModalOpen ? () => null : postModalOpen}
				>
					<Chat />
					<span className="visually-hidden">comment</span>
				</button>
			</li>

			<li className={styles.downloadItem}>
				<button
					type="button"
					className={styles.button}
					onClick={downloadImages}
				>
					<Download />
				</button>
			</li>

			<PostModal
				isVisible={postModal.isModalOpen}
				postId={postId}
				closeModal={postModal.closeModal}
			/>
		</ul>
	)
}
