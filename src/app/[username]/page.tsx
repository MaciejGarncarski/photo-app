import { Metadata } from 'next';

import { getTitle } from '@/src/utils/get-title';

import { Account } from '@/src/components/pages/account/account';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: getTitle(username),
  };
}

const UserAccount = () => {
  return <Account />;
};

export default UserAccount;
