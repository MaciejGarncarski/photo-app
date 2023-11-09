import { useMediaQuery } from 'react-responsive';

export const useIsTabletOrMobile = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' });

  return { isTabletOrMobile };
};
