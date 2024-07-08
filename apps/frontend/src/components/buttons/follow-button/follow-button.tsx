import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'

import { Button } from '@/components/buttons/button/button'
import { useFollowMutation } from '@/components/buttons/follow-button/use-follow'

type Props = {
	userId: string
}

const FollowButtonContent = ({ userId }: Props) => {
	const { data } = useUser({ userId })
	const { mutate } = useFollowMutation({ userId })
	const { isSignedIn } = useAuth()

	if (!isSignedIn || !data) {
		return null
	}

	const handleFollow = () => mutate(undefined)

	return (
		<Button
			type="button"
			variant={data.isFollowing ? 'secondary' : 'primary'}
			onClick={handleFollow}
		>
			{data.isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}

export const FollowButton = ({ userId }: Props) => {
	return <FollowButtonContent userId={userId} />
}
