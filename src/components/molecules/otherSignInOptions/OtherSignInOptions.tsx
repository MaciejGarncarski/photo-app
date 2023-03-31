import { IconBrandGoogle, IconTestPipe } from '@tabler/icons-react';

import { useSignIn } from '@/hooks/useSignIn';

import { Button } from '@/components/atoms/buttons/button/Button';

import styles from './otherSignInOptions.module.scss';

export const OtherSignInOptions = () => {
  const { signInDemo, signInGoogle } = useSignIn();

  return (
    <div className={styles.otherOptions}>
      <div className={styles.separator}>
        <p className={styles.orWith}>or with</p>
      </div>
      <div className={styles.other}>
        <Button type="button" onClick={signInDemo} variant="primary">
          <IconTestPipe />
          <p className={styles.otherButtonText}>Demo account</p>
        </Button>
        <Button type="button" onClick={signInGoogle} variant="primary">
          <IconBrandGoogle />
          <p className={styles.otherButtonText}>Google</p>
        </Button>
      </div>
    </div>
  );
};
