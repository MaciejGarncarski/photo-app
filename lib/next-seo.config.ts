import { NextSeoProps } from 'next-seo';

const description =
  'PhotoApp is social media application created in the modern tech stack. In this app, you can chat with friends, create posts, comment on them and follow other users. It was my first attempt to create a backend in Next.js, so I learned a lot of things while creating this app.';

export const APP_NAME = 'PhotoApp';

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s • ${APP_NAME}`,
  defaultTitle: APP_NAME,
  description,
};
