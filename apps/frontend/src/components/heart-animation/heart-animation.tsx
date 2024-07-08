import { Heart } from '@phosphor-icons/react'

import styles from './heart-animation.module.css'

type Props = {
	isVisible: boolean
}

export const HeartAnimation = ({ isVisible }: Props) => {
	return (
		<>
			{isVisible && (
				<div className={styles.heartAnimation}>
					<Heart weight="fill" />
				</div>
			)}
		</>
	)
}
