import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useUser } from '@/hooks/use-user'
import { getDescriptionData } from '@/utils/get-description-data'

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
	authorId: string
	description: string
}

export const PostImage = ({
	url,
	height,
	width,
	authorId,
	description,
}: Props) => {
	const [isVisible, setIsVisible] = useState(false)

	const { data } = useUser({ userId: authorId })

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
	const { shortDescription } = getDescriptionData(description)

	return (
		<div className={styles.postImage} ref={ref}>
			{isVisible && (
				<>
					{(imageAspectRatio === 'landscape' ||
						imageAspectRatio === 'portrait') && (
						<Image
							className={styles.background}
							src={url}
							quality={90}
							width={800}
							height={800}
							alt={`${data?.username} - ${shortDescription}`}
						/>
					)}

					<Image
						className={clsx(styles[imageAspectRatio], styles.sliderImage)}
						src={url}
						quality={90}
						width={800}
						height={800}
						alt={`${data?.username} - ${shortDescription}`}
					/>
				</>
			)}
		</div>
	)
}
