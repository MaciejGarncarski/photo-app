'use client';

import { FetchErrorMessage } from '@/src/components/fetch-error-message/fetch-error-message';

const ErrorPage = () => {
  return <FetchErrorMessage message="Cannot fetch data." />;
};

export default ErrorPage;
