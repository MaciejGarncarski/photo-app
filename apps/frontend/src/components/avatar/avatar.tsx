'use client'

import { User } from '@phosphor-icons/react'
import clsx from 'clsx'
import Image from 'next/image'

import { useUser } from '@/hooks/use-user'

import styles from './avatar.module.css'

type Size = 'small' | 'medium' | 'big'

type Props = {
	userId: string
	size: Size
}

const avatarSizes: Record<Size, number> = {
	big: 140,
	medium: 90,
	small: 30,
}

const AvatarContent = ({ userId, size }: Props) => {
	const { data } = useUser({ userId })
	const avatarSize = avatarSizes[size]

	const avatarClassName = clsx(styles[size], styles.avatar)

	if (!data) {
		return (
			<span className={avatarClassName}>
				<span className={styles.noImage}>
					<User className={styles.imagePlaceholder} />
					<span className="visually-hidden">Loading avatar</span>
				</span>
			</span>
		)
	}

	const { avatar, username } = data

	return (
		<span className={avatarClassName}>
			{avatar ? (
				<Image
					src={avatar}
					alt={`@${username} avatar`}
					width={avatarSize}
					height={avatarSize}
				/>
			) : (
				<span className={styles.noImage}>
					<User className={styles.imagePlaceholder} />
					<span className="visually-hidden">{`@${username}`} avatar</span>
				</span>
			)}
		</span>
	)
}

export const Avatar = ({ userId, size }: Props) => {
	return <AvatarContent userId={userId} size={size} />
}
