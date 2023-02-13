import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

const CreatePostSchema = z.object({
  description: z.string(),
  authorId: z.string(),
  imageUrls: z.string().array(),
});

export type CreatePostData = z.infer<typeof CreatePostSchema>;

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = CreatePostSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }

  const { authorId, description, imageUrls } = parsed.data;

  try {
    await prisma.post.create({
      data: {
        description: description,
        author_id: authorId,
        image1: imageUrls[0],
        image2: imageUrls[1],
        image3: imageUrls[2],
      },
      select: {
        created_at: true,
        id: true,
      },
    });

    res.status(httpCodes.success).send(responseMessages.success);
  } catch (error) {
    res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};
