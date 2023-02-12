import { Fields, Files, IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

import { createPost } from '@/utils/createPost';
import { deletePost } from '@/utils/deletePost';

export type CreatePost = {
  description: string;
  image: Blob;
  author: string;
};

export type FormidableResult = {
  fields: Fields;
  files: Partial<Files>;
};

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = await new Promise<FormidableResult>((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err });
      }
      resolve({ fields, files });
    });
  });

  if (req.method === 'POST') {
    await createPost(req, res, formData);
    return;
  }

  if (req.method === 'DELETE') {
    await deletePost(req, res);
    return;
  }
};

export default handler;
