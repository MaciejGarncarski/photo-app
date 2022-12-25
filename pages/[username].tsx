import { useRouter } from 'next/router';

import { string } from '@/utils/string';

import { Account } from '@/components/pages/account/Account';

const UserAccount = () => {
  const { query } = useRouter();
  const username = string(query.username);

  return <Account username={username} />;
};

export default UserAccount;
