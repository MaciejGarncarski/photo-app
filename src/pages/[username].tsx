import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Account } from '@/src/components/pages/account/Account';

import { prisma } from '../../prisma/prismadb';

const UserAccount = () => {
  const { query } = useRouter();
  const username = query.username as string;

  return <Account username={username} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const username = query.username as string;

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
