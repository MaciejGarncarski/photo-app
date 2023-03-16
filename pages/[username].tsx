import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { prisma } from '@/lib/prismadb';
import { string } from '@/utils/string';

import { Account } from '@/components/pages/account/Account';

const UserAccount = () => {
  const { query } = useRouter();
  const username = string(query.username);

  return <Account username={username} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const username = string(query.username);

  const userExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!userExists) {
    return {
      props: {},
      redirect: { destination: '/' },
    };
  }

  return {
    props: {},
  };
};

export default UserAccount;
