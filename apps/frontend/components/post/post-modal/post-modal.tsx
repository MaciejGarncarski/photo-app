'use client'

import { useRouter } from 'next/navigation'

import { ModalCloseButton } from '@/components/buttons/modal-close-button/modal-close-button'
import { CommentForm } from '@/components/forms/comment-form/comment-form'
import { ModalBackdrop } from '@/components/modals/modal-backdrop/modal-backdrop'
import { PostComments } from '@/components/post/post-comments/post-comments'
import { PostFooter } from '@/components/post/post-footer/post-footer'
import { PostHeader } from '@/components/post/post-header/post-header'
import { PostImagesCarousel } from '@/components/post/post-images-carousel/post-images-carousel'

import styles from './post-modal.module.scss'

type Props = {
	postId: number
	closeModal: () => void
	isVisible: boolean
	isPostPage?: boolean
}

export const PostModal = ({
	closeModal,
	isVisible,
	postId,
	isPostPage,
}: Props) => {
	const router = useRouter()

	const closeModalAndRedirect = () => {
		closeModal()

		if (isPostPage) {
			router.back()
		}
	}

	if (!isVisible) {
		return null
	}

	return (
		<ModalBackdrop closeModal={closeModalAndRedirect}>
			<div role="dialog" className={styles.container}>
				<div className={styles.closeButton}>
					<ModalCloseButton
						onClose={closeModalAndRedirect}
						variant="secondary"
					/>
				</div>
				<div className={styles.contentContainer}>
					<div className={styles.header}>
						<PostHeader tag="div" postId={postId} />
					</div>
					<div className={styles.carousel}>
						<PostImagesCarousel postId={postId} priority />
					</div>
					<div className={styles.footer}>
						<PostFooter postId={postId} parentModalOpen />
					</div>
					<div className={styles.commentsForm}>
						<CommentForm postId={postId} />
					</div>
					<div className={styles.postComments}>
						<PostComments postId={postId} closeModal={closeModalAndRedirect} />
					</div>
				</div>
			</div>
		</ModalBackdrop>
	)
}
