import { useModal } from '@/hooks/use-modal'
import { useUser } from '@/hooks/use-user'

type Props = {
	userId: string
}

type ListData = Array<{
	title: string
	titleOne: string
	count: number
	onClick: () => void
}>

export const useUserStats = ({ userId }: Props) => {
	const { data } = useUser({ userId })
	const followersModal = useModal()
	const friendsModal = useModal()

	const listData: ListData = [
		{
			title: 'Posts',
			titleOne: 'Post',
			count: data?.postsCount || 0,
			onClick: () => window.scrollBy({ top: 320, behavior: 'smooth' }),
		},
		{
			title: 'Followers',
			titleOne: 'Follower',
			count: data?.followersCount || 0,
			onClick: followersModal.openModal,
		},
		{
			title: 'Following',
			titleOne: 'Following',
			count: data?.friendsCount || 0,
			onClick: friendsModal.openModal,
		},
	]

	return { followersModal, friendsModal, listData }
}
