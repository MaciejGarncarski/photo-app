import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { Router, useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { opacityVariants } from '@/src/utils/common.animation';
import { seoConfig } from '@/src/utils/next-seo.config';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { Layout } from '@/src/components/layout/Layout';

import '../styles/globals.scss';

const customFont = Open_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-customFont',
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pageKey = router.asPath;

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
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
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <Loader color="blue" size="normal" marginTop />
            ) : (
              <motion.div key={pageKey} variants={opacityVariants} initial="hidden" animate="visible">
                <Component {...pageProps} />
              </motion.div>
            )}
          </AnimatePresence>
          <Toaster />
        </Layout>
      </MotionConfig>
    </QueryClientProvider>
  );
};
export default MyApp;
