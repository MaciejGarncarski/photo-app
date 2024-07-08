'use client'

import { Camera } from '@phosphor-icons/react'

import { CropImage } from '@/components/crop-image/crop-image'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { ImagesPreview } from '@/components/images-preview/images-preview'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'
import { Heading } from '@/components/typography/heading/heading'

import styles from './create-post.module.css'

export const CreatePost = () => {
	const { finalImages, previewImages, onRemove } = useFinalImages()

	return (
		<main>
			<div className={styles.heading}>
				<Camera size={44} weight="fill" />
				<Heading tag="h2" size="big">
					Create post
				</Heading>
			</div>
			<div className={styles.createPost}>
				{finalImages.length <= 3 && <CropImage />}
				<ImagesPreview previewImages={previewImages} onRemove={onRemove} />
				<CreatePostForm />
			</div>
		</main>
	)
}
