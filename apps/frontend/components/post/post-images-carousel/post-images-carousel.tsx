'use client'

import { CSSProperties } from 'react'

import { HeartAnimation } from '@/components/heart-animation/heart-animation'
import { usePost } from '@/components/pages/account/use-post'
import { PostArrows } from '@/components/post/post-arrows/post-arrows'
import { useHandleLike } from '@/components/post/post-buttons/use-handle-like'
import { PostImage } from '@/components/post/post-image/post-image'
import { useCarousel } from '@/components/post/post-images-carousel/use-carousel'
import { useUpdateWidth } from '@/components/post/post-images-carousel/use-update-width'

import styles from './post-images-carousel.module.scss'

type Props = {
	postId: number
	priority: boolean
}

export const PostImagesCarousel = ({ postId, priority }: Props) => {
	const { data: post, isPending } = usePost({ postId })
	const { width, imageRef } = useUpdateWidth()
	const { currentImage, handleNextImage, handlePrevImage } = useCarousel()

	const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({
		postId,
		isLiked: Boolean(post?.isLiked),
	})

	if (isPending || !post) {
		return null
	}

	return (
		<div
			onDoubleClick={handleLikeWithAnimation}
			className={styles.slider}
			data-cy="post slider"
		>
			<HeartAnimation isVisible={isLikeAnimationShown} />
			<div
				ref={imageRef}
				className={styles.imagesContainer}
				style={
					{
						'--currentImage': currentImage,
						'--width': `${width}px`,
					} as CSSProperties
				}
			>
				{post.images.map((image, idx) => {
					return (
						<div className={styles.image} key={image.fileId}>
							<PostImage
								priority={priority && idx === 0}
								url={image.url}
								width={image.width}
								height={image.height}
								postId={post.id}
							/>
						</div>
					)
				})}
			</div>
			<PostArrows
				currentIndex={currentImage}
				postImages={post.images}
				handlePrevImage={handlePrevImage}
				handleNextImage={handleNextImage}
			/>
		</div>
	)
}
