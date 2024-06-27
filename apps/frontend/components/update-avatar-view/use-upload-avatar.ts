import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/use-auth'
import { apiClient } from '@/utils/api/api-client'

import { imageSourcesAtom } from '@/components/crop-image/crop-image'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'

type UseUploadAvatarArguments = {
	closeModal: () => void
}

export const useUploadAvatar = ({ closeModal }: UseUploadAvatarArguments) => {
	const { finalImages, setFinalImages } = useFinalImages()
	const [, setImageSources] = useAtom(imageSourcesAtom)

	const resetState = () => {
		setFinalImages([])
		setImageSources([])
	}

	const { sessionUser } = useAuth()
	const queryClient = useQueryClient()

	const uploadNewAvatar = useMutation({
		mutationFn: async ({ image }: { image: Blob }) => {
			const formData = new FormData()
			formData.append('image', image)

			return apiClient({
				url: '/user/avatar',
				method: 'PUT',
				body: formData,
			})
		},
		onError: () => {
			toast.error('Cannot update avatar.')
			closeModal()
		},
		onSuccess: () => {
			toast.success('Avatar updated.')
			closeModal()
		},
	})

	const isFinalImageEmpty = finalImages.filter((image) => !!image).length === 0

	const onSaveImage = async () => {
		if (isFinalImageEmpty) {
			return
		}
		if (!finalImages[0]?.file) {
			return
		}

		uploadNewAvatar.mutate(
			{ image: finalImages[0].file },
			{
				onSuccess: async () => {
					await queryClient.invalidateQueries({ queryKey: ['session'] })
					await queryClient.invalidateQueries({
						queryKey: ['user', sessionUser?.id],
					})
				},
				onSettled: () => {
					resetState()
				},
			},
		)
	}

	return {
		onSaveImage,
		isPending: uploadNewAvatar.isPending,
		isFinalImageEmpty,
	}
}
