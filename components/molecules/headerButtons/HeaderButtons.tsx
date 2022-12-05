import { ReactNode } from 'react';
import { AiOutlineHome, AiOutlinePlusSquare, AiOutlineSave } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

import styles from './headerButtons.module.scss';

import { HeaderButton } from '@/components/atoms/headerButton/HeaderButton';
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
    icon: <AiOutlineHome />,
    alt: 'Home',
    title: 'Home',
    href: '/',
  },
  {
    icon: <AiOutlinePlusSquare />,
    alt: 'Create post',
    title: 'Create',
    href: '/create-post',
  },
  {
    icon: <AiOutlineSave />,
    alt: 'Saved posts',
    title: 'Saved',
    href: '/posts/saved',
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
    <>
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
      <ReactTooltip effect='solid' />
    </>
  );
};
