import { Metadata } from 'next';

import { Home } from '@/src/components/pages/home/home';

const description =
  'PhotoApp is social media application created in the modern tech stack. In this app, you can chat with friends, create posts, comment on them and follow other users. It was my first attempt to create a backend in Next.js, so I learned a lot of things while creating this app.';

export const metadata: Metadata = {
  title: 'Photo App',
  description,
  icons: {
    icon: '/icons/favicon.ico',
  },
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
