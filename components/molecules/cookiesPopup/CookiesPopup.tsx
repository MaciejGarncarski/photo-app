import { motion } from 'framer-motion';

import { Button } from '@/components/atoms/button/Button';

import styles from './cookiesPopup.module.scss';

const COOKIE_CONSTENST =
  'By using this app, you accept saving and reading necessary cookies to run this app by your browser.';

const ACCEPTED = 'accepted' as const;

type PropsTypes = {
  onClose: () => void;
};

export const CookiesPopup = ({ onClose }: PropsTypes) => {
  const setAccpeted = () => {
    localStorage.setItem(ACCEPTED, 'true');
    onClose();
  };

  if (localStorage.getItem(ACCEPTED) === 'true') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: 250, transition: { type: 'tween' } }}
      role="dialog"
      className={styles.cookies}
    >
      <p>{COOKIE_CONSTENST}</p>
      <div className={styles.cookiesButtons}>
        <Button type="button" variant="secondary" onClick={setAccpeted}>
          Don&apos;t show again
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </div>
    </motion.div>
  );
};
