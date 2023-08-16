import { Metadata } from 'next';

import { AccessDenied } from '@/src/components/access-denied/access-denied';

export const metadata: Metadata = {
  title: 'Access Denied',
};

const AccessDeniedPage = () => {
  return <AccessDenied />;
};

export default AccessDeniedPage;
