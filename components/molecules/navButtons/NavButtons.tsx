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

export const NavButtons = () => {
  const { session, status } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id });

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    return <SignInButton />;
  }

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, alt, onClick, href, title }) => {
        return <NavListButton icon={icon} alt={alt} onClick={onClick} href={href} title={title} key={title} />;
      })}

      {data?.user.username && <NavAccountIcon userId={session.user?.id ?? ''} />}
    </ul>
  );
};
