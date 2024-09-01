import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'
import { formatDateRelative } from '@/utils/format-date-relative'

import { useDeletePost } from '@/components/post/post-options/use-delete-post'

type Arguments = {
	authorId?: string
	createdAt?: string
	postId: number
}

export const usePostHeader = ({ authorId, createdAt, postId }: Arguments) => {
	const { data } = useUser({ userId: authorId || '' })
	const menuModal = useModal()
	const confirmationModal = useModal()
	const deletePostMutation = useDeletePost()

	const dateFromNow = createdAt ? formatDateRelative(createdAt) : ''

	const handleDeletePost = () => {
		deletePostMutation.mutate(
			{ postId: postId.toString() },
			{
				onSettled: () => {
					confirmationModal.closeModal()
					menuModal.closeModal()
				},
			},
		)
	}

	return {
		username: data?.username,
		handleDeletePost,
		dateFromNow,
		confirmationModal,
		menuModal,
		deletePostMutation,
	}
}
