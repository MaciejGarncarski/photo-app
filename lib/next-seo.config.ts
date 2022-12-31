import { NextSeoProps } from 'next-seo';

import { APP_NAME } from '@/pages';

const description =
  'Fullstack Next,js social app. In photo-app you can sign up via google and upload your favourite photos.';

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s • ${APP_NAME}`,
  defaultTitle: APP_NAME,
  description,
};
