import ImageKit from 'imagekit';

export const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMG_KIT_PUBLIC ?? '',
  privateKey: process.env.NEXT_PUBLIC_IMG_KIT_PRIVATE ?? '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMG_KIT_ENDPOINT ?? '',
});
