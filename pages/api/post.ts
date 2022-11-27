import { NextApiRequest, NextApiResponse } from 'next';

import { imageKit } from '@/lib/imagekit';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ status: 405, error: 'Only POST requests allowed.' });
    return;
  }

  try {
    await imageKit.upload({
      file: 'https://frontlive.pl/_next/image?url=%2Fimages%2Flogo-big.png&w=256&q=75',
      fileName: 'test.webp',
    });
    res.status(200).send({ status: 200 });
  } catch (error) {
    res.status(400).send({ status: 400, error });
  }
};

export default handler;
