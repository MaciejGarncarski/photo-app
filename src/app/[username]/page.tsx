import { Metadata } from 'next';
import { headers } from 'next/headers';

import { ssrApiClient } from '@/src/utils/api-client';

import { Account } from '@/src/components/pages/account/account';
import { userApiResponseSchema } from '@/src/schemas/user.schema';

const getAccountByUsername = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '/';
  const username = pathname.slice(1);
  const data = await ssrApiClient(`users/username/${username}`);
  const response = userApiResponseSchema.safeParse(data);

  if (!response.success) {
    throw new Error(`Invalid data, ${JSON.stringify(response.error)}`);
  }

  return response.data;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getAccountByUsername();
  return {
    title: data.username,
  };
};

const UserAccount = async () => {
  const userData = await getAccountByUsername();

  return <Account userData={userData} />;
};

export default UserAccount;
