'use client'

import dynamic from 'next/dynamic'
import { Ref, Suspense } from 'react'

import { PostFooter } from '@/components/post/post-footer/post-footer'
import { PostHeaderPlaceholder } from '@/components/post/post-header-placeholder/post-header-placeholder'
import { PostImagesCarousel } from '@/components/post/post-images-carousel/post-images-carousel'
import { PostPlaceholder } from '@/components/post/post-placeholder/post-placeholder'

import styles from './home-post.module.scss'

type Props = {
	postId: number
	ref?: Ref<HTMLElement>
}

const PostHeader = dynamic(
	() =>
		import('@/components/post/post-header/post-header').then(
			(m) => m.PostHeader,
		),
	{
		loading: PostHeaderPlaceholder,
		ssr: false,
	},
)

export const HomePost = ({ postId, ref }: Props) => {
	return (
		<Suspense fallback={<PostPlaceholder />}>
			<article className={styles.homePost} ref={ref}>
				<div className={styles.header}>
					<PostHeader postId={postId} />
				</div>
				<div className={styles.carousel}>
					<PostImagesCarousel postId={postId} />
				</div>
				<PostFooter postId={postId} />
			</article>
		</Suspense>
	)
}
