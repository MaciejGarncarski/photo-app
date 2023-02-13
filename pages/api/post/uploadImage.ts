import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import { imageKit } from '@/lib/imagekit';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

import { FormidableResult } from '@/pages/api/post';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '20mb',
  },
};

const uploadImageHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const formData = await new Promise<FormidableResult>((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err });
      }
      resolve({ fields, files });
    });
  });

  if (method === 'POST') {
    const { fields, files } = formData;
    const { authorId, uuid } = fields;

    if (Array.isArray(files.image)) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }
    if (!files.image) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    try {
      const fileContents = await fs.readFile(files.image.filepath);

      if (!fileContents) {
        throw new Error('No file contents.');
      }

      const { url } = await imageKit.upload({
        file: fileContents,
        fileName: `/image.webp`,
        folder: `${authorId}/posts/${uuid}`,
      });

      res.status(httpCodes.success).send(url);
    } catch (error) {
      res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }
};

export default uploadImageHandler;
