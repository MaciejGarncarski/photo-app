import Image from 'next/image';

import { useAccount } from '@/components/pages/account/useAccount';

type PostProps = {
  author: string;
  images: string;
};

export const Post = ({ author, images }: PostProps) => {
  const { data } = useAccount({ id: author });
  return (
    <article>
      <Image src={images} alt='Post' width={300} height={500} />
    </article>
  );
};
