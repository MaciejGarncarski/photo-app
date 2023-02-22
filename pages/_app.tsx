import { Open_Sans } from '@next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

import { seoConfig } from '@/lib/next-seo.config';

import { Layout } from '@/components/layout/Layout';

import '/styles/globals.scss';

const customFont = Open_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-customFont',
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <DefaultSeo {...seoConfig} />
        <MotionConfig transition={{ duration: 0.35 }}>
          <style jsx global>{`
            html {
              font-family: ${customFont.style.fontFamily};
            }
          `}</style>
          <Layout>
            <Hydrate state={pageProps.dehydratedState}>
              <LazyMotion features={domAnimation}>
                <div id="modal"></div>
                <Component {...pageProps} />
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
