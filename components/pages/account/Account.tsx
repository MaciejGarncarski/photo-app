import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './account.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { ModalOvelay } from '@/components/atoms/modalOverlay/ModalOverlay';
import { AccountPosts } from '@/components/organisms/accountPosts/AccountPosts';
import { useAccount } from '@/components/pages/account/useAccount';

export type AccountID = {
  id: string;
};

type AccountProps = {
  username: string;
};

const listData = ['posts', 'followers', 'following'] as const;

export const Account = ({ username }: AccountProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const { data, isLoading } = useAccount({ username });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  if (!data || isLoading) {
    return <p>loading</p>;
  }

  if (!data.user) {
    return <p>user error</p>;
  }

  const { name } = data.user;

  const isIamOwner = session?.user?.id === data.user.id;

  return (
    <>
      <main className={styles.account}>
        <Avatar className={styles.avatar} userID={data.user.id} alt='' />
        <h2 className={styles.username}>{username}</h2>
        <ul className={styles.list}>
          {listData.map((item) => {
            return (
              <li className={styles.listItem} key={item}>
                <p className={styles.listItemNumber}>{data.count[item]}</p>
                <p>{item}</p>
              </li>
            );
          })}
        </ul>
        <p className={styles.name}>{name}</p>
        <p className={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab provident iusto blanditiis
          similique. Doloremque, veritatis totam magnam magni qui ab consectetur vero, iusto
          dignissimos, nam nostrum explicabo nesciunt tenetur optio.
        </p>
        {!isIamOwner && <Button className={styles.followButton}>follow 💪</Button>}
        <button type='button' onClick={openMenu} className={styles.menuButton}>
          <span className='visually-hidden'>{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <AiOutlineMenu />
        </button>
      </main>
      {isMenuOpen && (
        <ModalOvelay setOpen={setIsMenuOpen}>
          <div role='dialog' className={styles.menu}>
            <ul className={styles.menuList}>
              <li>hej</li>
              <li>hej</li>
              <li>hej</li>
            </ul>
          </div>
        </ModalOvelay>
      )}
      <AccountPosts id={data.user.id} />
    </>
  );
};
