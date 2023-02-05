import { DefaultSeo } from 'next-seo';

import { seoConfig } from '@/lib/next-seo.config';

export const DefaultSeoWrapper = () => {
  return <DefaultSeo {...seoConfig} />;
};
