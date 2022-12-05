import ImageKit from 'imagekit';

import { env } from '@/utils/env';

export const imageKit = new ImageKit({
  publicKey: env.NEXT_PUBLIC_IMG_KIT_PUBLIC,
  privateKey: env.NEXT_PUBLIC_IMG_KIT_PRIVATE,
  urlEndpoint: env.NEXT_PUBLIC_IMG_KIT_ENDPOINT,
});
