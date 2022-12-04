import { useRouter } from 'next/router';

import { string } from '@/utils/string';

import { Account } from '@/components/pages/account/Account';

const UserAccount = () => {
  const { query, isReady } = useRouter();
  const username = string(query.username);

  if (!isReady) {
    return <p>loading</p>;
  }

  return <Account username={username} />;
};

export default UserAccount;
