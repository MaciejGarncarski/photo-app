import { m } from 'framer-motion';

import { Button } from '@/components/atoms/button/Button';

import styles from './cookieAlert.module.scss';

const COOKIE_CONSTENST =
  'By using this app, you accept saving and reading necessary cookies to run this app by your browser.';

type CookieAlertProps = {
  onClose: () => void;
  onPermanentClose: () => void;
};

export const CookieAlert = ({ onClose, onPermanentClose }: CookieAlertProps) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: 250, transition: { type: 'tween' } }}
      role="dialog"
      className={styles.cookies}
    >
      <p>{COOKIE_CONSTENST}</p>
      <div className={styles.cookiesButtons}>
        <Button type="button" variant="secondary" onClick={onPermanentClose}>
          Don&apos;t show again
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </div>
    </m.div>
  );
};
