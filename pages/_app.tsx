import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

import { seoConfig } from '@/lib/next-seo.config';
import { useIsLoading } from '@/hooks/useIsLoading';

import { Loader } from '@/components/atoms/loader/Loader';
import { Layout } from '@/components/layout/Layout';

import '/styles/globals.scss';

const customFont = Open_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-customFont',
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { isLoading } = useIsLoading();

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
              <div id="modal"></div>
              {isLoading ? <Loader variant="margin-top" /> : <Component {...pageProps} />}
              <Toaster />
            </Hydrate>
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
