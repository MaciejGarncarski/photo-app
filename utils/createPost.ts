import formidable from 'formidable';
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
  const { author, description } = fields;

  const images = files['images[]'];
  const imagesArray = Array.isArray(images) ? images : [images];

  const uuid = v4();

  const uploadData = async (image: formidable.File, index: number) => {
    const fileContents = image?.filepath ? await fs.readFile(image.filepath) : null;

    if (!fileContents) {
      throw new Error('No file contents.');
    }

    const { url } = await imageKit.upload({
      file: fileContents,
      fileName: `/${index}.webp`,
      folder: `${author}/posts/${uuid}`,
    });

    return url;
  };

  try {
    if (!Array.isArray(imagesArray)) {
      throw new Error('Images have to be an array.');
    }

    const imageUrls = await Promise.all(
      imagesArray?.map((img, idx) => {
        if (img) {
          return uploadData(img, idx);
        }
      }),
    );

    await prisma.post.create({
      data: {
        description: string(description),
        author_id: string(author),
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
