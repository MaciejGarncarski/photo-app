import { Chat } from '@phosphor-icons/react'
import type { ReactElement } from 'react'

import { useModal } from '@/hooks/use-modal'

import { HeartIcon } from '@/components/heart-icon'
import { usePost } from '@/components/pages/account/use-post'
import { useHandleLike } from '@/components/post/post-buttons/use-handle-like'

type ButtonData = Array<{
	alt: string
	icon: ReactElement
	count?: number
	onClick: () => void
}>

type Arguments = {
	postId: number
	parentModalOpen?: boolean
}

export const usePostButtonsData = ({ postId, parentModalOpen }: Arguments) => {
	const postModal = useModal()
	const { data: post } = usePost({ postId })
	const { handleLike } = useHandleLike({
		postId,
		isLiked: post?.isLiked || false,
	})

	const postModalOpen = () => {
		postModal.openModal()
	}

	const buttonData: ButtonData = [
		{
			alt: 'like',
			icon: <HeartIcon isLiked={post?.isLiked || false} />,
			count: post?.likesCount,
			onClick: handleLike,
		},
		{
			alt: 'comment',
			icon: <Chat />,
			count: post?.commentsCount,
			onClick: parentModalOpen ? () => null : postModalOpen,
		},
	]

	return { postModal, buttonData }
}
