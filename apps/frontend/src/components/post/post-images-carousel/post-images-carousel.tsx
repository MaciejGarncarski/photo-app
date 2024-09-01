'use client'

import { CSSProperties } from 'react'

import { HeartAnimation } from '@/components/heart-animation/heart-animation'
import { PostArrows } from '@/components/post/post-arrows/post-arrows'
import { useHandleLike } from '@/components/post/post-buttons/use-handle-like'
import { PostImage } from '@/components/post/post-image/post-image'
import { useCarousel } from '@/components/post/post-images-carousel/use-carousel'
import { useUpdateWidth } from '@/components/post/post-images-carousel/use-update-width'
import { PostImage as PostImageType } from '@/schemas/post.schema'

import styles from './post-images-carousel.module.css'

type Props = {
	postId: number
	isLiked: boolean
	postImages: PostImageType[]
	description: string
	authorId: string
}

export const PostImagesCarousel = ({
	postId,
	postImages,
	isLiked,
	description,
	authorId,
}: Props) => {
	const { width, imageRef } = useUpdateWidth()
	const { currentImage, handleNextImage, handlePrevImage } = useCarousel()

	const { handleLikeWithAnimation, isLikeAnimationShown } = useHandleLike({
		postId,
		isLiked: isLiked,
	})

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
				{postImages.map((image) => {
					return (
						<PostImage
							url={image.url}
							width={image.width}
							key={image.fileId}
							height={image.height}
							authorId={authorId}
							description={description}
						/>
					)
				})}
			</div>
			<PostArrows
				currentIndex={currentImage}
				postImages={postImages}
				handlePrevImage={handlePrevImage}
				handleNextImage={handleNextImage}
			/>
		</div>
	)
}
