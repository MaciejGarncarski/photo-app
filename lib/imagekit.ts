import ImageKit from 'imagekit';

import { clientEnv } from '@/utils/env.mjs';

export const imageKit = new ImageKit({
  publicKey: clientEnv.NEXT_PUBLIC_IMG_KIT_PUBLIC,
  privateKey: clientEnv.NEXT_PUBLIC_IMG_KIT_PRIVATE,
  urlEndpoint: clientEnv.NEXT_PUBLIC_IMG_KIT_ENDPOINT,
});
