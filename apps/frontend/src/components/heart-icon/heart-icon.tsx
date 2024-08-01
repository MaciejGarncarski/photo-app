import { Heart } from '@phosphor-icons/react'
import clsx from 'clsx'

import styles from './heart-icon.module.css'

type Props = {
	isLiked: boolean
}

export const HeartIcon = ({ isLiked }: Props) => {
	return (
		<Heart
			width={24}
			height={24}
			className={clsx(styles.icon, isLiked && styles.iconLiked)}
			weight={isLiked ? 'fill' : 'bold'}
		/>
	)
}
