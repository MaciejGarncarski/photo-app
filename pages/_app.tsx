import { Lato } from '@next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

import { seoConfig } from '@/lib/next-seo.config';

import { Layout } from '@/components/layout/Layout';

import '/styles/globals.scss';

const lato = Lato({
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <DefaultSeo {...seoConfig} />
        <MotionConfig transition={{ duration: 0.2 }}>
          <Layout className={lato.className}>
            <Hydrate state={pageProps.dehydratedState}>
              <LazyMotion features={domAnimation}>
                <div id="modal"></div>
                <Component {...pageProps} />
              </LazyMotion>
            </Hydrate>
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
