import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/buttons/button/button'
import { getButtonList } from '@/components/forms/create-post-form/create-post-form.data'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'
import { useOnSubmit } from '@/components/pages/create-post/use-on-submit'
import { TextArea } from '@/components/textarea/textarea'

import styles from './create-post-form.module.css'

export const PostDetailsSchema = z.object({
	description: z
		.string()
		.min(1, { message: 'Description cannot be empty.' })
		.max(100, { message: 'Maximum characters exceeded.' }),
})

export const CreatePostForm = () => {
	const router = useRouter()
	const { finalImages } = useFinalImages()
	const { onSubmit, isPending } = useOnSubmit()

	const {
		register,
		handleSubmit,
		watch,
		formState: { dirtyFields, errors },
	} = useForm({
		resolver: zodResolver(PostDetailsSchema),
		defaultValues: {
			description: '',
		},
	})

	const isSubmitDisabled =
		!dirtyFields.description || finalImages.length === 0 || isPending

	const buttonList = getButtonList(router.back, isSubmitDisabled)
	const descriptionValue = watch('description')

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextArea
				label="Description"
				placeholder="Type in post description"
				value={descriptionValue}
				error={errors.description?.message}
				{...register('description')}
			/>
			<div className={styles.actionButtons}>
				{buttonList.map(({ text, disabled, onClick, type, variant }) => (
					<Button
						key={text}
						disabled={disabled}
						onClick={onClick}
						type={type}
						variant={variant}
					>
						{text}
					</Button>
				))}
			</div>
		</form>
	)
}
