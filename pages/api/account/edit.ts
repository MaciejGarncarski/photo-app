import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { imageKit } from '@/lib/imagekit';
import { prisma } from '@/lib/prismadb';
import { httpCodes, responseMessages } from '@/utils/apiResponses';

import { SignUpSchema } from '@/components/molecules/completeSignUp/CompleteSignUp';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { FormidableResult } from '@/pages/api/post';

export const config = {
  api: {
    bodyParser: false,
  },
};

const editAccountHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
  }

  const formData = await new Promise<FormidableResult>((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err });
      }
      resolve({ fields, files });
    });
  });

  if (req.method === 'POST') {
    const { fields, files } = formData;

    if (Array.isArray(files.image)) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const fileContents = files.image?.filepath ? await fs.readFile(files.image.filepath) : null;
    const fieldsResponse = SignUpSchema.safeParse(fields);

    if (!fieldsResponse.success) {
      return res.status(httpCodes.badRequest).send(responseMessages.badPayload);
    }

    const { bio, fullName, username, userId } = fieldsResponse.data;

    if (userId !== session.user?.id) {
      return res.status(httpCodes.unauthorized).send(responseMessages.unauthorized);
    }

    try {
      if (fileContents) {
        const { url } = await imageKit.upload({
          file: fileContents,
          fileName: `/1.webp`,
          folder: `${userId}/avatar/custom/`,
        });
        await prisma.user.update({
          data: {
            bio,
            name: fullName,
            username,
            customImage: url,
          },
          where: {
            id: userId,
          },
        });

        return res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
      }

      await prisma.user.updateMany({
        data: {
          bio,
          name: fullName,
          username,
        },
        where: {
          id: userId,
        },
      });

      res.status(httpCodes.resourceSuccess).send(responseMessages.resourceSuccess);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.badRequest).send(responseMessages.badRequest);
    }
  }
};

export default editAccountHandler;
