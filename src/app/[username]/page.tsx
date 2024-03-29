import { Metadata } from 'next';

import { getPageTitle } from '@/src/utils/get-page-title';

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

  const usernameTitle = getPageTitle(`@${username}`);

  try {
    const {
      data: { data: userData },
    } = await getUserByUsername({ username: username }, { cache: 'no-cache' });

    if (!userData.avatar) {
      return {
        title: usernameTitle,
      };
    }

    return {
      title: usernameTitle,
      metadataBase: new URL('https://ik.imagekit.io'),
      description: userData.bio,
      openGraph: {
        title: usernameTitle,
        description: userData.bio || undefined,
        url: APP_URL,
        siteName: 'Photo App',
        locale: 'en_GB',
        type: 'profile',
        username: username,
        images: [
          {
            url: userData?.avatar,
            width: 720,
            height: 720,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: usernameTitle,
    };
  }
};

const UserAccount = () => {
  return <Account />;
};

export default UserAccount;
