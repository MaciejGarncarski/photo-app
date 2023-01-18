import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';
import { string } from '@/utils/string';

import { FormidableResult } from '@/pages/api/post';

export const createPost = async (req: NextApiRequest, res: NextApiResponse, formData: FormidableResult) => {
  const { fields, files } = formData;

  try {
    if (Array.isArray(files.image)) {
      return;
    }

    const uuid = v4();
    const fileContents = files.image?.filepath ? await fs.readFile(files.image.filepath) : null;

    const { author, description } = fields;

    if (!fileContents) {
      return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
    const { url } = await imageKit.upload({
      file: fileContents,
      fileName: `/1.webp`,
      folder: `${author}/posts/${uuid}`,
    });

    await prisma.post.create({
      data: {
        description: string(description),
        author_id: string(author),
        images: url,
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
