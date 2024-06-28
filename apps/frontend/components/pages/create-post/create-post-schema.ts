import { z } from 'zod'

import { PostDetailsSchema } from '@/components/forms/create-post-form/create-post-form'

export type PostDetails = z.infer<typeof PostDetailsSchema>

type FinalImage = {
	id: string
	file: Blob | null
}

export type FinalImages = Array<FinalImage | undefined>

export type DropZoneErrors =
	| null
	| 'DIMENSIONS'
	| 'FILE_SIZE'
	| 'INVALID_TYPE'
	| 'NO_IMAGE_DETECTED'
	| 'TOO_MANY_IMAGES'
