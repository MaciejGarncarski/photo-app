import { useAuth } from '@/hooks/use-auth'

import { Button } from '@/components/buttons/button/button'
import { useCommentForm } from '@/components/forms/comment-form/use-comment-form'
import { TextArea } from '@/components/textarea/textarea'

import styles from './comment-form.module.scss'

type Props = {
	postId: number
}

export const CommentForm = ({ postId }: Props) => {
	const { handleSubmit, isDirty, isPending, onSubmit, register, commentValue } =
		useCommentForm({ postId })

	const { isSignedIn } = useAuth()

	if (!isSignedIn) {
		return null
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
			<TextArea
				placeholder="Aa"
				{...register('comment')}
				value={commentValue}
				maxHeight={100}
				secondaryBg
			/>
			<Button type="submit" disabled={!isDirty || isPending} variant="primary">
				{isPending ? 'Uploading...' : 'Comment'}
			</Button>
		</form>
	)
}
