import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

import { useIsLoading } from '@/src/hooks/useIsLoading';
import { seoConfig } from '@/src/utils/next-seo.config';

import { Layout } from '@/src/components/layout/Layout';
import { Loader } from '@/src/components/molecules/loader/Loader';

import '@/styles/globals.scss';

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
        <DefaultSeo {...seoConfig} />
        <ReactQueryDevtools />
        <MotionConfig transition={{ duration: 0.3 }}>
          <style jsx global>{`
            html {
              font-family: ${customFont.style.fontFamily};
            }
          `}</style>
          <Layout>
            <Hydrate state={pageProps.dehydratedState}>
              <div id="modal"></div>
              {isLoading ? <Loader color="blue" size="normal" /> : <Component {...pageProps} />}
              <Toaster />
            </Hydrate>
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
