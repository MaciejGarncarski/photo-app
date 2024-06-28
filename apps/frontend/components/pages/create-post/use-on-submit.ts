import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

import { imageSourcesAtom } from '@/components/crop-image/crop-image'
import { revalidateHomePage } from '@/components/pages/create-post/action'
import { useFinalImages } from '@/components/pages/create-post/use-final-images'
import { useSendNewPost } from '@/components/pages/create-post/use-send-new-post'

import type { PostDetails } from './create-post-schema'

export const useOnSubmit = () => {
	const router = useRouter()
	const sendNewPost = useSendNewPost()
	const { finalImages, setFinalImages } = useFinalImages()
	const [, setImageSources] = useAtom(imageSourcesAtom)

	const onSubmit: SubmitHandler<PostDetails> = async ({ description }) => {
		if (!finalImages[0]?.file) {
			return
		}

		const finalImagesToBlob = finalImages.map((img) => img?.file || null)

		toast.promise(
			sendNewPost.mutateAsync(
				{ description, images: finalImagesToBlob },
				{
					onSuccess: async () => {
						setFinalImages([])
						setImageSources([])
						await revalidateHomePage()
						router.push('/')
					},
				},
			),
			{
				id: 'add-post',
				loading: 'Creating post...',
				success: 'Post created.',
				error: 'Could not add post. Please, try again later.',
			},
		)
	}
	return {
		onSubmit,
		isPending: sendNewPost.isPending,
	}
}
