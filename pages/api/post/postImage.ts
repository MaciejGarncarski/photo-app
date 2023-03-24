import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apis/apiResponses';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

const PostImageSchema = z.object({
  fileId: z.string(),
  size: z.number(),
  name: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
  width: z.number(),
  height: z.number(),
});

export type PostImage = z.infer<typeof PostImageSchema>;

const postImageHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(httpCodes.invalidMethod).send(responseMessages.invalidMethod);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  const parsed = PostImageSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
  }

  const { fileId, height, name, thumbnailUrl, url, width, size } = parsed.data;

  try {
    const { id } = await prisma.postImage.create({
      data: {
        fileId,
        url,
        thumbnailUrl,
        name,
        size,
        height,
        width,
      },
      select: {
        id: true,
      },
    });

    return res.status(httpCodes.success).send(id);
  } catch (error) {
    return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
  }
};

export default postImageHandler;
