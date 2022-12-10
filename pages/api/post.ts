import { Fields, Files, IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

export type CreatePost = {
  description: string;
  image: Blob;
  author: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormidableResult = {
  fields: Fields;
  files: Files;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { fields, files } = await new Promise<FormidableResult>((resolve, reject) => {
      const form = new IncomingForm({ multiples: false });
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject({ err });
        }
        resolve({ fields, files });
      });
    });

    try {
      if (Array.isArray(files.image)) {
        return;
      }

      const uuid = v4();
      const fileContents = await fs.readFile(files.image.filepath);
      const { author, description } = fields;
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

      res.status(200).send({ status: 200, data: 'success' });
    } catch (error) {
      res.status(400).send({ status: 400, error });
    }
  }
};

export default handler;
