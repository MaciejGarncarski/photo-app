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
  files: Files;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = await new Promise<FormidableResult>((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err });
      }
      resolve({ fields, files });
    });
  });

  console.log(req.query);

  if (req.method === 'PUT') {
    createPost(req, res, formData);
  }

  if (req.method === 'DELETE') {
    deletePost(req, res);
  }
};

export default handler;
