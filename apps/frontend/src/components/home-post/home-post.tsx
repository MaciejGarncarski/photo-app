'use client'

import { Ref, Suspense } from 'react'

import { PostFooter } from '@/components/post/post-footer/post-footer'
import { PostHeader } from '@/components/post/post-header/post-header'
import { PostImagesCarousel } from '@/components/post/post-images-carousel/post-images-carousel'
import { PostImage } from '@/schemas/post.schema'

import styles from './home-post.module.css'

type Props = {
	postId: number
	isLiked: boolean
	postImages: PostImage[]
	authorId: string
	description: string
	likesCount: number
	createdAt: string
	ref?: Ref<HTMLElement>
}

export const HomePost = ({
	postId,
	isLiked,
	postImages,
	authorId,
	description,
	likesCount,
	createdAt,
	ref,
}: Props) => {
	return (
		<article className={styles.homePost} ref={ref}>
			<div className={styles.header}>
				<Suspense fallback={<p>Loading...</p>}>
					<PostHeader
						postId={postId}
						authorId={authorId}
						createdAt={createdAt}
					/>
				</Suspense>
			</div>
			<div className={styles.carousel}>
				<Suspense fallback={<p>Loading...</p>}>
					<PostImagesCarousel
						isLiked={isLiked}
						postImages={postImages}
						authorId={authorId}
						description={description}
						postId={postId}
					/>
				</Suspense>
			</div>
			<Suspense fallback={<p>Loading...</p>}>
				<PostFooter
					postId={postId}
					authorId={authorId}
					description={description}
					isLiked={isLiked}
					likesCount={likesCount}
				/>
			</Suspense>
		</article>
	)
}
