import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './account.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { ModalOvelay } from '@/components/atoms/modalOverlay/ModalOverlay';
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
  const { data, isLoading } = useAccount({ username });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  if (!data || isLoading) {
    return <p>loading</p>;
  }

  const isUsernameSet = Boolean(data.user.username);

  if (!isUsernameSet) {
    return <p>no username set!! :(</p>;
  }

  const { customImage, image, name } = data.user;

  return (
    <>
      <main className={styles.account}>
        <Avatar className={styles.avatar} src={data.user.customImage ?? data.user.image} alt='' />
        <h2 className={styles.username}>{username}</h2>
        <ul className={styles.list}>
          {listData.map((item) => {
            return (
              <li className={styles.listItem} key={item}>
                <p className={styles.listItemNumber}>0</p>
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
        <Button className={styles.followButton}>follow 💪</Button>
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
    </>
  );
};
