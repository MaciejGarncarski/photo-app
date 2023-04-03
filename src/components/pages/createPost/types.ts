import { z } from 'zod';

import { PostDetailsSchema } from './CreatePost';

export type PostDetails = z.infer<typeof PostDetailsSchema>;

type FinalImage = {
  id: number;
  file: Blob | null;
};
export type FinalImages = Array<FinalImage | undefined>;
