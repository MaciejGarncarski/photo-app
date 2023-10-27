import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { Account } from '@/src/components/pages/account/account';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: setTitle(username),
  };
}

const UserAccount = () => {
  return <Account />;
};

export default UserAccount;
