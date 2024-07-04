import { ChatCentered, CopySimple, Heart } from '@phosphor-icons/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { usePost } from '@/components/pages/account/use-post'

import styles from './account-post.module.scss'

type Props = {
	postId: number
}

export const AccountPost = ({ postId }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const { data: postData } = usePost({ postId })

	const { commentsCount, images, likesCount } = postData

	const imagesLength = images.length

	if (!images[0]) {
		return null
	}

	return (
		<Link shallow href={`/post/${postId}`} className={styles.link}>
			{imagesLength > 1 && isLoaded ? (
				<span className={styles.manyPhotosIcon}>
					<CopySimple weight="fill" size={40} />
				</span>
			) : null}

			<Image
				className={clsx(
					{
						[styles.imageLoading]: !isLoaded,
					},
					styles.image,
				)}
				src={images[0].url}
				alt="post"
				sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 15vw"
				fill
				quality={100}
				onLoad={() => setIsLoaded(true)}
				priority
			/>
			<span className={styles.overlay}>
				<span className={styles.count}>
					<Heart size={28} weight="fill" />
					{likesCount}
				</span>
				<span className={styles.count}>
					<ChatCentered size={28} weight="fill" />
					{commentsCount}
				</span>
			</span>
		</Link>
	)
}
