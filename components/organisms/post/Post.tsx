import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

type PostProps = {
  author: string;
  images: string;
};

export const Post = ({ author, images }: PostProps) => {
  const { data } = useQuery([author], async () => {
    const { data: responseData } = await axios.get(`/api/user/${author}`);
    return responseData;
  });

  return (
    <article>
      <Image src={images} alt='Post' width={300} height={500} />
    </article>
  );
};
