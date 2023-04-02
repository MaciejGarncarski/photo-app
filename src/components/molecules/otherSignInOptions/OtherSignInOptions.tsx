import { IconBrandGoogle, IconTestPipe } from '@tabler/icons-react';
import { ReactElement, useMemo } from 'react';

import { useSignIn } from '@/src/hooks/useSignIn';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import styles from './otherSignInOptions.module.scss';

type ButtonsData = Array<{ onClick: () => void; text: string; icon: ReactElement }>;

export const OtherSignInOptions = () => {
  const { signInDemo, signInGoogle } = useSignIn();

  const buttonsData: ButtonsData = useMemo(
    () => [
      {
        onClick: signInDemo,
        text: 'Demo account',
        icon: <IconTestPipe />,
      },
      {
        onClick: signInGoogle,
        text: 'Google',
        icon: <IconBrandGoogle />,
      },
    ],
    [signInDemo, signInGoogle],
  );

  return (
    <div className={styles.otherOptions}>
      <div className={styles.separator}>
        <p className={styles.orWith}>or with</p>
      </div>
      <div className={styles.other}>
        {buttonsData.map(({ icon, onClick, text }) => {
          return (
            <div className={styles.button} key={text}>
              <Button type="button" variant="primary" onClick={onClick}>
                {icon}
                {text}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
