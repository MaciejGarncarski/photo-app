import { NextApiRequest, NextApiResponse } from 'next';

import { createPost } from '@/src/utils/apis/createPost';
import { deletePost } from '@/src/utils/apis/deletePost';

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
