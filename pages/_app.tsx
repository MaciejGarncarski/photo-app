import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Open_Sans } from 'next/font/google';
import { Router } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import { seoConfig } from '@/lib/next-seo.config';

import { Loader } from '@/components/atoms/loader/Loader';
import { Layout } from '@/components/layout/Layout';

import '/styles/globals.scss';

const customFont = Open_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-customFont',
});

const queryClient = new QueryClient();

const Toaster = dynamic(() => import('react-hot-toast').then((c) => c.Toaster), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
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
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="top-right" />
        <DefaultSeo {...seoConfig} />
        <MotionConfig transition={{ duration: 0.3 }}>
          <style jsx global>{`
            html {
              font-family: ${customFont.style.fontFamily};
            }
          `}</style>
          <Layout>
            <Hydrate state={pageProps.dehydratedState}>
              <LazyMotion features={domAnimation}>
                <div id="modal"></div>
                {isLoading ? <Loader variant="margin-top" /> : <Component {...pageProps} />}
                <Toaster />
              </LazyMotion>
            </Hydrate>
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
