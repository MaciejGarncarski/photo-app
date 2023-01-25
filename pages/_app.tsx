import { Lato } from '@next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '/styles/globals.scss';

import { Layout } from '@/components/layout/Layout';
import { DefaultSeoWrapper } from '@/components/seo/DefaultSeo';

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
        <MotionConfig transition={{ duration: 0.2 }}>
          <Layout className={lato.className}>
            <DefaultSeoWrapper />
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
