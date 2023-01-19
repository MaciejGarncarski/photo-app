import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '/styles/globals.scss';

import { Layout } from '@/components/layout/Layout';
import { DefaultSeoWrapper } from '@/components/seo/DefaultSeo';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <MotionConfig transition={{ duration: 0.2 }}>
          <Layout>
            <DefaultSeoWrapper />
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <div id="modal"></div>
            </Hydrate>
          </Layout>
        </MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
