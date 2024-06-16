'use client'

import { ModalCloseButton } from '@/components/buttons/modal-close-button/modal-close-button'
import { CommentForm } from '@/components/forms/comment-form/comment-form'
import { PostComments } from '@/components/post/post-comments/post-comments'
import { PostFooter } from '@/components/post/post-footer/post-footer'
import { PostHeader } from '@/components/post/post-header/post-header'
import { PostImagesCarousel } from '@/components/post/post-images-carousel/post-images-carousel'

import styles from './post-modal.module.scss'

type Props = {
	postId: number
	closeModal: () => void
}

export const PostModalMobile = ({ postId, closeModal }: Props) => {
	return (
		<>
			<div className={styles.closeButton}>
				<ModalCloseButton onClose={closeModal} variant="secondary" />
			</div>
			<div className={styles.header}>
				<PostHeader tag="div" postId={postId} />
			</div>
			<div className={styles.content}>
				<div className={styles.carousel}>
					<PostImagesCarousel postId={postId} priority />
				</div>
				<div className={styles.footer}>
					<PostFooter postId={postId} parentModalOpen />
				</div>
				<section className={styles.commentsContainer}>
					<div className={styles.postComments}>
						<PostComments postId={postId} closeModal={closeModal} />
					</div>
					<div className={styles.form}>
						<CommentForm postId={postId} />
					</div>
				</section>
			</div>
		</>
	)
}
