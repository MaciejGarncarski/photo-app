import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { Account } from '@/src/components/pages/account/account';
import { APP_URL } from '@/src/constants';
import { getUserByUsername } from '@/src/services/user.service';

type Props = {
  params: { username: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { username } = params;

  const {
    data: { data: userData },
  } = await getUserByUsername({ username: username });

  return {
    title: setTitle(username),
    metadataBase: new URL('https://ik.imagekit.io'),
    description: userData.bio || undefined,
    openGraph: {
      title: setTitle(username),
      description: userData.bio || undefined,
      url: APP_URL,
      images: userData?.avatar
        ? [
            {
              url: userData.avatar,
              width: 720,
              height: 720,
            },
          ]
        : undefined,
      locale: 'en_GB',
      type: 'article',
    },
  };
};

const UserAccount = () => {
  return <Account />;
};

export default UserAccount;
