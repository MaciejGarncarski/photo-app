import { Heart } from '@phosphor-icons/react'

type Props = {
	isLiked: boolean
}

export const HeartIcon = ({ isLiked }: Props) => {
	return (
		<Heart
			weight={isLiked ? 'fill' : 'bold'}
			style={isLiked ? { color: 'var(--color-accent)' } : undefined}
		/>
	)
}
