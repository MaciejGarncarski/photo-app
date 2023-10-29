import { useSearchParams } from 'next/navigation';

export const useRedirect = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  return { redirectPath };
};
