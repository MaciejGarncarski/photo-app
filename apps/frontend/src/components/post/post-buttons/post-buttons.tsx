'use client'

import { Chat } from '@phosphor-icons/react'
import { useAnimate } from 'framer-motion'

import { useAuth } from '@/hooks/use-auth'
import { useModal } from '@/hooks/use-modal'
import { formatLikes } from '@/utils/format-likes'

import { HeartIcon } from '@/components/heart-icon/heart-icon'
import { usePost } from '@/components/pages/account/use-post'
import { useHandleLike } from '@/components/post/post-buttons/use-handle-like'
import { PostModal } from '@/components/post/post-modal/post-modal'

import styles from './post-buttons.module.css'

type Props = {
	postId: number
	parentModalOpen?: boolean
}

export const PostButtons = ({ postId, parentModalOpen }: Props) => {
	const postModal = useModal()
	const { sessionUser } = useAuth()
	const [scope, animate] = useAnimate()
	const { data: post } = usePost({ postId })
	const { handleLike } = useHandleLike({
		postId,
		isLiked: post?.isLiked || false,
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

	return (
		<ul className={styles.list}>
			<li className={styles.listItem}>
				<button
					ref={scope}
					className={styles.button}
					type="button"
					onClick={onLike}
				>
					<HeartIcon isLiked={post.isLiked} />
					{post.likesCount !== 0 && (
						<span className={styles.buttonsCount}>
							{formatLikes(post.likesCount)}
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

			<PostModal
				isVisible={postModal.isModalOpen}
				postId={postId}
				closeModal={postModal.closeModal}
			/>
		</ul>
	)
}
