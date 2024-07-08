import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useUser } from '@/hooks/use-user'
import { getDescriptionData } from '@/utils/get-description-data'

import { usePost } from '@/components/pages/account/use-post'

import styles from './post-image.module.css'

const ASPECT_RATIO_LANDSCAPE = 191
const ASPECT_RATIO_PORTRAIT = 80

const getAspectRatio = (width: number, height: number) => {
	const calculatedAspectRatio = Math.round((width / height) * 100)

	if (calculatedAspectRatio === ASPECT_RATIO_LANDSCAPE) {
		return 'landscape'
	}

	if (calculatedAspectRatio === ASPECT_RATIO_PORTRAIT) {
		return 'portrait'
	}

	return 'square'
}

type Props = {
	url: string
	width: number
	height: number
	postId: number
}

export const PostImage = ({ url, height, width, postId }: Props) => {
	const [isVisible, setIsVisible] = useState(false)

	const { data: postData } = usePost({ postId: postId })
	const { data } = useUser({ userId: postData?.authorId || '' })

	const { ref } = useInView({
		threshold: 0,
		rootMargin: '100%',
		onChange: (inView) => {
			if (inView) {
				setIsVisible(true)
			}
		},
	})

	const imageAspectRatio = getAspectRatio(width, height)
	const { shortDescription } = getDescriptionData(postData.description)

	return (
		<div className={styles.postImage} ref={ref}>
			{isVisible && (
				<>
					{(imageAspectRatio === 'landscape' ||
						imageAspectRatio === 'portrait') && (
						<div className={styles.backgroundOuter}>
							<Image
								className={styles.background}
								src={url}
								quality={80}
								width={600}
								height={600}
								alt={`${data?.username} - ${shortDescription}`}
							/>
						</div>
					)}

					<Image
						className={clsx(styles[imageAspectRatio], styles.sliderImage)}
						src={url}
						quality={80}
						width={600}
						height={600}
						alt={`${data?.username} - ${shortDescription}`}
					/>
				</>
			)}
		</div>
	)
}
