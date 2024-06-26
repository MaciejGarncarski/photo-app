import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useModal } from '@/hooks/use-modal'

import { useEditDetails } from '@/components/details-form/use-edit-details'
import {
	type AccountDetails,
	AccountDetailsSchema,
	type User,
} from '@/schemas/user.schema'

type DetailsForm = {
	user: User
}

export const useDetailsForm = ({ user }: DetailsForm) => {
	const cancelModal = useModal()

	const {
		register,
		reset,
		formState: { isDirty, errors },
		handleSubmit,
		watch,
	} = useForm<AccountDetails>({
		defaultValues: {
			username: user.username || '',
			fullName: user.name || '',
			bio: user.bio || '',
		},
		mode: 'all',
		resolver: zodResolver(AccountDetailsSchema),
	})

	const { onReset, editDetails, isPending } = useEditDetails({
		reset,
	})

	const onSubmit = handleSubmit(editDetails)

	const isError = Boolean(errors.bio || errors.fullName || errors.username)

	const bioValue = watch('bio')

	return {
		isError,
		errors,
		isDirty,
		register,
		onSubmit,
		isPending,
		bioValue,
		onReset,
		cancelModal,
	}
}
