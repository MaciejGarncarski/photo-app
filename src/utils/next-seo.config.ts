import { NextSeoProps } from 'next-seo';

import { clientEnv } from '@/src/utils/env';

const description =
  'PhotoApp is social media application created in the modern tech stack. In this app, you can chat with friends, create posts, comment on them and follow other users. It was my first attempt to create a backend in Next.js, so I learned a lot of things while creating this app.';

export const APP_NAME = 'PhotoApp';

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s • ${APP_NAME}`,
  defaultTitle: APP_NAME,
  description,
  additionalLinkTags: [
    {
      rel: 'preconnect',
      href: clientEnv.NEXT_PUBLIC_API_ROOT,
    },
    {
      rel: 'dns-prefetch',
      href: 'https://lh3.googleusercontent.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://ik.imagekit.io',
    },
    {
      rel: 'icon',
      href: '/icons/favicon.ico',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      href: '/icons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      href: '/icons/favicon-16x16.png',
    },
    {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
    {
      rel: 'manifest',
      href: '/icons/site.webmanifest',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/icons/apple-touch-icon.png',
    },
  ],
  additionalMetaTags: [
    {
      name: 'application-name',
      content: 'PhotoApp',
    },
    { name: 'apple-mobile-web-app-title', content: 'PhotoApp' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'msapplication-config', content: '/icons/browserconfig.xml' },
    { name: 'theme-color', content: '#000000' },
  ],
};
