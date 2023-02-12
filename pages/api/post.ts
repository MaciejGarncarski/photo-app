import { Fields, Files } from 'formidable';
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await createPost(req, res);
    return;
  }

  if (req.method === 'DELETE') {
    await deletePost(req, res);
    return;
  }
};

export default handler;
