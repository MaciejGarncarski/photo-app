import { ReactNode } from 'react';

import styles from './headerButtons.module.scss';

import { HeaderButton } from '@/components/atoms/headerButton/HeaderButton';
import { Icon } from '@/components/atoms/icons/Icons';
import { SignInButton } from '@/components/atoms/SignInButton/SignInButton';
import { AccountIcon } from '@/components/molecules/accountIcon/AccountIcon';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

export type ListData = {
  icon: ReactNode;
  alt: string;
  title: string;
  href?: string;
  onClick?: () => void;
};

const listData: Array<ListData> = [
  {
    icon: <Icon.Home />,
    alt: 'Home',
    title: 'Home',
    href: '/',
  },
  {
    icon: <Icon.Create />,
    alt: 'Create post',
    title: 'Create',
    href: '/create-post',
  },
  {
    icon: <Icon.Bookmark />,
    alt: 'Collection',
    title: 'Collection',
    href: '/collection',
  },
];

export const HeaderButtons = () => {
  const { session, status } = useAuth();
  const { data } = useAccount({ id: session?.user?.id });

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    return <SignInButton />;
  }

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, alt, onClick, href, title }) => {
        return (
          <HeaderButton
            icon={icon}
            alt={alt}
            onClick={onClick}
            href={href}
            title={title}
            key={title}
          />
        );
      })}

      {data?.user.username && <AccountIcon id={session.user?.id ?? ''} />}
    </ul>
  );
};
