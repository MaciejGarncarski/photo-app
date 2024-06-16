import clsx from 'clsx'
import Image from 'next/image'

import { useUser } from '@/hooks/use-user'
import { getDescriptionData } from '@/utils/get-description-data'

import { usePost } from '@/components/pages/account/use-post'

import styles from './post-image.module.scss'

type Props = {
	priority: boolean
	url: string
	width: number
	height: number
	postId: number
}

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

export const PostImage = ({ priority, url, height, width, postId }: Props) => {
	const { data: postData } = usePost({ postId: postId })
	const { data } = useUser({ userId: postData?.authorId || '' })

	if (!postData) {
		return null
	}

	const imageAspectRatio = getAspectRatio(width, height)

	const { shortDescription } = getDescriptionData(postData.description)

	return (
		<Image
			className={clsx(styles[imageAspectRatio], styles.sliderImage)}
			src={url}
			priority={priority}
			quality={100}
			width={600}
			height={600}
			alt={`${data?.username} - ${shortDescription}`}
		/>
	)
}
