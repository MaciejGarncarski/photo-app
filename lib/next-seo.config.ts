import { NextSeoProps } from 'next-seo';

const description =
  'Fullstack Next,js social app. In photo-app you can sign up via google and upload your favourite photos.';

export const APP_NAME = 'PhotoApp';

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s • ${APP_NAME}`,
  defaultTitle: APP_NAME,
  description,
};
