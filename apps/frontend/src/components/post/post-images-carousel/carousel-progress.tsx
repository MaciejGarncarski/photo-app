import type { PostImage } from '@/schemas/post.schema'

import styles from './post-images-carousel.module.css'

type Props = {
	currentIndex: number
	images: Array<PostImage>
}

export const PostSliderProgress = ({ currentIndex, images }: Props) => {
	return (
		<span className={styles.progress}>
			{currentIndex + 1}/{images.length}
		</span>
	)
}
