import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

import { seoConfig } from '@/src/utils/next-seo.config';

import { Layout } from '@/src/components/layout/Layout';

import '../styles/globals.scss';

const customFont = Open_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-customFont',
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pageKey = router.asPath;

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...seoConfig} />
      <ReactQueryDevtools />
      <MotionConfig transition={{ duration: 0.25 }}>
        <style jsx global>{`
          html {
            font-family: ${customFont.style.fontFamily};
          }
        `}</style>
        <Layout>
          <AnimatePresence mode="wait" initial={false}>
            <Component key={pageKey} {...pageProps} />
          </AnimatePresence>
          <Toaster />
        </Layout>
      </MotionConfig>
    </QueryClientProvider>
  );
};
export default MyApp;
