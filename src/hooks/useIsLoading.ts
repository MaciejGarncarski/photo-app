import { Router } from 'next/router';
import { useEffect, useState } from 'react';

import { useFinalImages } from '@/src/hooks/useFinalImages';

export const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setFinalImages } = useFinalImages();

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
      setFinalImages([]);
    };
    const end = () => {
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [setFinalImages]);

  return { isLoading };
};
