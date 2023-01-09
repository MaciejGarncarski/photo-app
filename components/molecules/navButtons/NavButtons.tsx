import { ReactNode } from 'react';

import styles from './navButtons.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { NavAccountIcon } from '@/components/atoms/navAccountIcon/NavAccountIcon';
import { NavListButton } from '@/components/atoms/navListButton/NavListButton';
import { SignInButton } from '@/components/atoms/SignInButton/SignInButton';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

export type ListData = {
  icon: ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
};

const listData: Array<ListData> = [
  {
    icon: <Icon.Home />,
    title: 'Home',
    href: '/',
  },
  {
    icon: <Icon.Create />,
    title: 'Create post',
    href: '/create-post',
  },
  {
    icon: <Icon.Bookmark />,
    title: 'Collection',
    href: '/collection',
  },
];

export const NavButtons = () => {
  const { session, status } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id });

  if (status === 'loading') {
    return null;
  }

  if (!session?.user?.id) {
    return <SignInButton />;
  }

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, onClick, href, title }) => {
        return <NavListButton icon={icon} onClick={onClick} href={href} title={title} key={title} />;
      })}
      {data?.user.username && <NavAccountIcon userId={session.user.id ?? ''} />}
    </ul>
  );
};
